#version 110


void getSpecularColor(in vec3 normal, in vec3 specularColor, in float shininess, out vec3 returnColor)
{
	vec3 specular;
	float nDotL, nDotHV, divBy;
	
	nDotL = abs(dot(normal, vec3(gl_LightSource[0].position)));
	nDotHV = abs(dot(normal, gl_LightSource[0].halfVector.xyz));
	divBy = shininess - shininess * nDotHV + nDotHV;
	returnColor = gl_FrontMaterial.specular.rgb * (nDotHV / divBy);
}

void main() 
{
	vec3 normal = normalize(gl_NormalMatrix * gl_Normal);		
		
	float nDotL = abs(dot(normal, vec3(gl_LightSource[0].position)));
	
	vec3 specularColor;
	getSpecularColor(normal, gl_FrontMaterial.specular.rgb, gl_FrontMaterial.shininess, specularColor);
	
	gl_FrontColor = vec4(gl_Color.rgb * nDotL + specularColor, 1.0);
	
	gl_Position = ftransform();
	
}
