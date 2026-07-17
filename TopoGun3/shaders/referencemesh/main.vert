#version 110

attribute float mask;
uniform float maskingIntensity;

void main() 
{
	gl_TexCoord[0] = gl_MultiTexCoord0;

	vec3 normal = normalize(gl_NormalMatrix * gl_Normal);		
	vec3 color = gl_FrontMaterial.diffuse.rgb * gl_Color.rgb;
		
	vec3 specular;
	float nDotL, nDotHV, divBy;
	
	float maskVal = mix(1.0, 1.0 - mask, maskingIntensity);
	
	nDotL = abs(dot(normal, vec3(gl_LightSource[0].position)));
	nDotHV = abs(dot(normal, gl_LightSource[0].halfVector.xyz));
	divBy = gl_FrontMaterial.shininess - gl_FrontMaterial.shininess * nDotHV + nDotHV;
	specular = gl_FrontMaterial.specular.rgb * (nDotHV / divBy);
	
	gl_FrontColor = vec4 ( (color * maskVal * vec3(nDotL, nDotL, nDotL) + specular), 1.0);
	
	gl_Position = gl_ProjectionMatrix * gl_ModelViewMatrix * gl_Vertex;
	
}
