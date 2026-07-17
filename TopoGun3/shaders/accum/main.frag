#version 110

uniform sampler2D pass;
uniform sampler2D dest;
uniform float accum;
uniform int load;


void main()
{
	vec4 passv = vec4 (texture2D(pass, gl_TexCoord[0].st));
	if(load==0)
	{
		vec4 destv = vec4 (texture2D(dest, gl_TexCoord[0].st));
		gl_FragColor=vec4(passv.r*accum+destv.r, 1.0, 1.0, 1.0);
	}
	else
		gl_FragColor=vec4(passv.r*accum, 1.0, 1.0, 1.0);
}
