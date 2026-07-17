#version 110


void main() 
{
	gl_TexCoord[0] = gl_MultiTexCoord0;
	
	vec3 normal = normalize(gl_NormalMatrix * gl_Normal);
	float nDotL = abs(dot(normal, vec3(gl_LightSource[0].position)));
	
	gl_FrontColor = vec4 ( (gl_Color.rgb * vec3(nDotL, nDotL, nDotL)), 1.0);
	gl_Position = gl_ProjectionMatrix * gl_ModelViewMatrix * gl_Vertex;
	
}
