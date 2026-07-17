uniform vec3 planeNormal;
uniform vec3 planePos;
uniform float lineWidth;

varying vec3 position;

uniform vec3 symPos;
uniform float symTolerance;


float intersectRaySphere(vec3 rayo, vec3 rayd,  vec3 sphereo, float spherer)
{
	vec3 dst = rayo - sphereo;
	float ret;
	float B = dot(dst, rayd);
	float C = dot(dst, dst) - spherer*spherer;
	float D = B*B - C;
	if(D>0.0)
		ret=-B - sqrt(D);
	else
		ret=0.0;
	
	return ret;
}


float intersectRayPlane(vec3 rOrigin, vec3 rVector)
{

	float d = - (dot(planeNormal,planePos));

	float numer = dot(planeNormal,rOrigin) + d;
	float denom = dot(planeNormal,rVector);

	if (denom == 0.0)
		return -1.0;

	return -(numer / denom);
}



float distancePointPlane(vec3 point)
{
    return dot(point, planeNormal) - dot(planePos, planeNormal);
}

bool sameSide(vec3 pos1, vec3 pos2)
{
	float dist1=distancePointPlane(pos1);
	float dist2=distancePointPlane(pos2);
	if(dist1*dist2<0.0) return false;
	return true;
}

void main()
	{
		vec4 whiteval=vec4(1.0, 1.0, 1.0, 0.0);
		float distval;
		
		
		gl_FragColor = whiteval;
		
		distval = distancePointPlane(position);
		
		gl_FragColor = mix(gl_Color, whiteval, clamp(distval, 0.0, 1.0));
		
		float absDistVal = abs(distval);
		
		if(absDistVal < lineWidth)
			gl_FragColor = gl_Color;
		else
		if(absDistVal < lineWidth * 1.5)
		{
			float mixval = (absDistVal - lineWidth) / (lineWidth * 0.5);
			gl_FragColor = mix(gl_Color, whiteval, mixval);
		}
		else
			gl_FragColor = whiteval;
			
		if(length(position - symPos) < symTolerance)
			gl_FragColor = gl_Color;
		
		

	}
	
