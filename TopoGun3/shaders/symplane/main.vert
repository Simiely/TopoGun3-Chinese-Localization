varying vec3 position;
varying vec3 symposition;

void main() 
{
	position = vec3(gl_Vertex.xyz);
	gl_FrontColor = vec4 ( gl_Color.rgba);
	gl_BackColor = vec4 ( gl_Color.rgba);
	gl_Position = ftransform();
}
	
