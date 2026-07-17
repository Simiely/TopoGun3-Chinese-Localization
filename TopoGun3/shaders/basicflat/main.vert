#version 110

varying vec3 ecPos;

void main() 
{
	
	ecPos = (gl_ModelViewMatrix * gl_Vertex).xyz;
	gl_FrontColor = vec4 (gl_Color.rgb, 1.0);
	
	gl_Position = ftransform();
	
}
