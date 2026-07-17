#version 110

uniform sampler2D samples;
uniform sampler2D normals;
uniform sampler2D depth;
uniform mat4 tg_ModelViewMatrix;
uniform mat4 tg_ProjectionMatrix;
uniform vec3 campos;
uniform float texsize;
uniform int cosine;



void main()
{
	//aflam pozitia sample in world space
	vec4 sval = vec4 (texture2D(samples, gl_TexCoord[0].st));//pozitia sample in world
	vec4 sval_trans;//sample in light space
	vec2 coord;//uv-ul din depth caruia ii corespunde sample
	vec3 coord3;
	float val;
	vec4 val4;
		
	if(sval.a>0.0)
	{
		//aflam pozitia sample in  si apoi uv-ul de unde luam dval in space
		sval_trans= tg_ProjectionMatrix * tg_ModelViewMatrix * sval;
		coord3.x=(sval_trans.x+1.0)/2.0;
		coord3.y=(sval_trans.y+1.0)/2.0;
		coord3.z=(sval_trans.z+1.0)/2.0;
		//val=shadow2D(depth, coord3).r;
		val=texture2D(depth, coord3.xy).r;
		if(val>coord3.z)
		{
			val=1.0;
			vec3 nval=vec3 (texture2D(normals, gl_TexCoord[0].st));
			nval.xyz=(nval.xyz-0.5)*2.0;
			vec3 normal=normalize(nval.xyz);
			vec3 eye=normalize(campos);
			float dotval=dot(normal, eye);
			if(dotval>0.0)
			{
				val=clamp(dotval, 0.0, 1.0);
				if(cosine==0)
				{
					val=1.0;
				}
				gl_FragColor=vec4(val, val, val, 1.0);
			}
			else
				gl_FragColor=vec4(0.0, 0.0, 0.0, 1.0);
			
		}
		else
			gl_FragColor=vec4(0.0, 0.0, 0.0, 0.0);
			//gl_FragColor=vec4(0.0, 0.0, 0.0, 0.0);
	}
	else
	gl_FragColor=vec4(0.0, 0.0, 0.0, 0.0);
	
	
	
}
