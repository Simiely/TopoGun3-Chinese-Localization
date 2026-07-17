#version 110


void main() 
{
	vec3 normal = normalize(gl_NormalMatrix * gl_Normal);		
	vec3 color = gl_FrontMaterial.diffuse.rgb * gl_Color.rgb;
		
	float nDotL = abs(dot(normal, vec3(gl_LightSource[0].position)));
	
	float nDotHV, divBy;
	nDotHV = abs(dot(normal, gl_LightSource[0].halfVector.xyz));
	divBy = gl_FrontMaterial.shininess - gl_FrontMaterial.shininess * nDotHV + nDotHV;
	vec3 specular = gl_FrontMaterial.specular.rgb * (nDotHV / divBy);
	
	gl_FrontColor = vec4(color * nDotL + specular, 1.0);
	
	gl_Position = ftransform();
	
}
