#version 110

varying vec3 ecPos;

void main()
{

	vec3 normal = normalize(cross(dFdx(ecPos), dFdy(ecPos)));
	vec3 color = gl_FrontMaterial.diffuse.rgb * gl_Color.rgb;
	
	float nDotL = abs(dot(normal, vec3(gl_LightSource[0].position)));
	
	float nDotHV, divBy;
	nDotHV = abs(dot(normal, gl_LightSource[0].halfVector.xyz));
	divBy = gl_FrontMaterial.shininess - gl_FrontMaterial.shininess * nDotHV + nDotHV;
	vec3 specular = gl_FrontMaterial.specular.rgb * (nDotHV / divBy);
	
	gl_FragColor = vec4(color * nDotL + specular, 1.0);
	
}

