#version 110

void main() 
{
	gl_FrontColor = vec4 (gl_Color.rgb, 1.0);
	gl_Position = ftransform();
}
