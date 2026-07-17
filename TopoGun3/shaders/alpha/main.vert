#version 110


void main(void)
{
    vec3 ecPosition = vec3 (gl_ModelViewMatrix * gl_Vertex);
    vec3 tnorm = normalize(gl_NormalMatrix * gl_Normal);
    vec3 viewVec = normalize(-ecPosition);
    float topac = dot(tnorm,viewVec);
	float opac=clamp(topac, 0.0, 1.0);
    gl_Position = ftransform();
	gl_FrontColor = vec4(gl_Color.rgb,opac*gl_Color.a);

}
