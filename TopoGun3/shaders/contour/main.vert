#version 110

uniform float contourDistance;

void main() 
{
	gl_FrontColor = gl_Color;
	gl_BackColor = gl_Color;
	//gl_Position = ftransform();
	gl_Position =  gl_ProjectionMatrix * gl_ModelViewMatrix * vec4((gl_Vertex.xyz + gl_Normal.xyz*contourDistance), 1.0);	
}
