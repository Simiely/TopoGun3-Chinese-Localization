#version 110

varying vec3 ecPos;
attribute float mask;

void main() 
{
	gl_TexCoord[0] = gl_MultiTexCoord0;
	
	ecPos = (gl_ModelViewMatrix * gl_Vertex).xyz;
	gl_FrontColor = vec4 (gl_FrontMaterial.diffuse.rgb * gl_Color.rgb, mask);
				
	gl_Position = gl_ProjectionMatrix * gl_ModelViewMatrix * gl_Vertex;
	
}
