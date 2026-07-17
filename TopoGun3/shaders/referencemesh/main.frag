#version 110

uniform sampler2D texture;
uniform int useTexture;

void main()
{
	vec4 textureColor;

	gl_FragColor = gl_Color;
	
	if(useTexture == 1)
    {
        textureColor = texture2D(texture, gl_TexCoord[0].st);
        gl_FragColor = gl_Color * textureColor;
    }
    else
        gl_FragColor = gl_Color;
}