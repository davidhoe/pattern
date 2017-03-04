/**
 * Created by davidhoe on 28/02/2017.
 */

import paper from 'paper'

export class PointUtils
{
    static LerpPoint(p0,p1, r)
    {
        return new paper.Point(p0.x*(1-r) + p1.x*r, p0.y*(1-r) + p1.y*r );
    }

    static CreateRectPoints(rect)
    {
        var p0 = rect.topLeft;
        var p1 = rect.topRight;
        var p2 = rect.bottomRight;
        var p3 = rect.bottomLeft;
        return [p0,p1,p2,p3];
    }

    /**
     * get interpolated point within a quad path
     * @param quadPoints path array, should have 4 points
     * @param p
     * @returns paper.Point
     * @constructor
     */
    static GetInterpolatedPointInQuad(quadPoints, p)
    {
        if(quadPoints.length < 4)
        {
            console.log("not enough points, quadPoints.length", quadPoints.length);
            return new paper.Point();
        }
        return PointUtils.GetInterpolatedPointBetween2Lines(quadPoints[0],quadPoints[3], quadPoints[1],quadPoints[2], p.x,p.y);
    }

    /**
     * get an interpolated point within a tri path
     * @param triPoints
     * @param p
     * @returns paper.Point
     * @constructor
     */

    //get an interpolated point between 2 lines (p0,p1) and (q0,q1)
    static GetInterpolatedPointBetween2Lines(p0,p1,q0,q1, r1, r2)
    {
        var a = PointUtils.LerpPoint(p0,p1, r1);
        var b = PointUtils.LerpPoint(q0,q1, r1);
	    //console.log("here",p0,p1,a,b, r1,r2);

	    return PointUtils.LerpPoint(a,b,r2);
    }

    static GetScaledQuad(points, scale, anchorp)
    {
        if(points.length < 4)
        {
            console.log("not enough points, points.length", points.length);
            return [];
        }
        var normalisedPoints = [];
        normalisedPoints[0] = new paper.Point(0,0);
        normalisedPoints[1] = new paper.Point(1,0);
        normalisedPoints[2] = new paper.Point(1,1);
        normalisedPoints[3] = new paper.Point(0,1);
        for(var i =0; i < 4 ;++i)
        {
            var p = normalisedPoints[i];
            p.x = anchorp.x  + (p.x - anchorp.x)*scale;
            p.y = anchorp.x  + (p.y - anchorp.y)*scale;
	        normalisedPoints[i] = PointUtils.GetInterpolatedPointInQuad(points, p);
        }

        return normalisedPoints;
    }

}