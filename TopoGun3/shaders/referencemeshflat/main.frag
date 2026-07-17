#version 110

uniform sampler2D texture;
uniform int useTexture;
uniform float maskingIntensity;

varying vec3 ecPos;


void main()
{
    vec4 textureColor;
    vec4 pixelColor;
    vec4 fragmentColor;
    
    pixelColor = gl_Color;
    
    vec3 normal = normalize(cross(dFdx(ecPos), dFdy(ecPos)));	
    
    vec3 specular;
	float nDotL, nDotHV, divBy;
	
	float maskVal = mix(1.0, 1.0-gl_Color.a, maskingIntensity);
	
	nDotL = abs(dot(normal, vec3(gl_LightSource[0].position)));
	nDotHV = abs(dot(normal, gl_LightSource[0].halfVector.xyz));
	divBy = gl_FrontMaterial.shininess - gl_FrontMaterial.shininess * nDotHV + nDotHV;
	specular = gl_FrontMaterial.specular.rgb * (nDotHV / divBy);
	
	fragmentColor = vec4 ( (gl_Color.rgb * maskVal * vec3(nDotL, nDotL, nDotL) + specular) , 1.0);
    
    if(useTexture == 1)
    {
        textureColor = texture2D(texture,gl_TexCoord[0].st);
        gl_FragColor = fragmentColor * textureColor;
    }
    else
        gl_FragColor = fragmentColor;
        
}