#version 110


void main() 
{
	vec3 normal = normalize(gl_NormalMatrix * gl_Normal);		
		
	float nDotL = abs(dot(normal, vec3(gl_LightSource[0].position)));
	
	gl_FrontColor = vec4(gl_Color.rgb * nDotL, 1.0);
	
	gl_Position = ftransform();
	
}
