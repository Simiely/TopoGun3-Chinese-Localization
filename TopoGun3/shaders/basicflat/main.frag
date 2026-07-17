#version 110

varying vec3 ecPos;

void main()
{

	vec3 normal = normalize(cross(dFdx(ecPos), dFdy(ecPos)));
	
	float nDotL = abs(dot(normal, vec3(gl_LightSource[0].position)));
	
	gl_FragColor = vec4(gl_Color.rgb * nDotL, 1.0);
	
}
