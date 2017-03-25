/**
 * Created by davidhoe on 28/02/2017.
 */

import paper from 'paper'
import {MathUtils} from './MathUtils'

export class PointUtils
{
	static PointFromAngleAndRadius(angleInDegrees, radius = 1)
	{
		var a = MathUtils.DegreeToRadian(angleInDegrees);
		return new paper.Point(Math.sin(a)*radius, Math.cos(a)*radius );
	}

    static LerpPoint(p0,p1, r)
    {
        return new paper.Point(p0.x*(1-r) + p1.x*r, p0.y*(1-r) + p1.y*r );
    }

    static CreateRectPoints(rect)
    {
        var p0 = rect.bottomLeft;
        var p1 = rect.bottomRight;
        var p2 = rect.topRight;
        var p3 = rect.topLeft;
        return [p0,p1,p2,p3];
    }

    /**
     * get interpolated point within a quad path
     * @param quadPoints path array, should have 4 points
     * @param p
     * @returns paper.Point
     * @constructor
     */
    static TransformPointToQuadSpace(quadPoints, p)
    {
        if(quadPoints.length < 4)
        {
            console.error("not enough points, quadPoints.length", quadPoints.length);
            return new paper.Point();
        }
        return PointUtils.GetInterpolatedPointBetween2Lines(quadPoints[0],quadPoints[1], quadPoints[3],quadPoints[2], p.x,p.y);
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

    // todo swap to normalised
    static GetScaledQuad(points, scale, anchorp)
    {
        if(points.length < 4)
        {
            console.error("not enough points, points.length", points.length);
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
	        normalisedPoints[i] = PointUtils.TransformPointToQuadSpace(points, p);
        }

        return normalisedPoints;
    }

    static TransformToQuadSpace(normalisedSegments, quadPoints)
    {
        var transformed = [];

        for(var i =0; i< normalisedSegments.length;++i)
        {
            var s = normalisedSegments[i];
            // s is either a point of a segment

            if(s.constructor.name == paper.Point.name)
            {
                transformed[i] = PointUtils.TransformPointToQuadSpace(quadPoints, s);
            }
            else if(s.constructor.name == paper.Segment.name)
            {
                transformed[i] = PointUtils.TransformSegmentToQuadSpace(quadPoints, s);
            }
        }
        return transformed;
    }

    static TransformSegmentToQuadSpace(quadPoints, s)
    {
        var ts = new paper.Segment();
        if(s.point != null) ts.point = PointUtils.TransformPointToQuadSpace(quadPoints, s.point);
        if(s.handleIn != null) ts.handleIn = PointUtils.TransformPointToQuadSpace(quadPoints, s.handleIn.add(s.point)).subtract(ts.point);
        if(s.handleOut != null) ts.handleOut = PointUtils.TransformPointToQuadSpace(quadPoints, s.handleOut.add(s.point)).subtract(ts.point);
        return ts;
    }

    static CreateNormalisedDiagonalLeaf(r = 0.55228)
    {
        var p0 = new paper.Point(0,0);
        var p1 = new paper.Point(1,1);

        var a0 =  new paper.Point(( r),0);
        var a1 =  new paper.Point(0, - r);

        var a2 =  new paper.Point(0, r);
        var a3 = new paper.Point(- r,0);

        // quarter circle
        var s0 = new paper.Segment(p0, null, a0);
        var s1 = new paper.Segment(p1, a1, null);
        // another quarter circle
        var s2 = new paper.Segment(p1, null, a3);
        var s3 = new paper.Segment(p0, a2, null);

        return [s0,s1,s2,s3];
    }

    static CreateNormalisedRightAngleTri()
    {
        var p0 = new paper.Point(0,0);
        var p1 = new paper.Point(1,0);
        var p3 = new paper.Point(0,1);
        return [p0,p1,p3];
    }

    // shear is such is includes the bounds of the oringal quad, this make is easier for masking
	static CreateNormalisedShearedQuad(shearRatio)
	{
		var p0,p1,p2,p3;
		if(shearRatio > 0) {
			p0 = new paper.Point(0, 0);
			p1 = new paper.Point(1, -shearRatio);
			p2 = new paper.Point(1, 1);
			p3 = new paper.Point(0, 1 + shearRatio);
		}
		else{
			p0 = new paper.Point(0, shearRatio);
			p1 = new paper.Point(1, 0);
			p2 = new paper.Point(1, 1- shearRatio);
			p3 = new paper.Point(0, 1 );
		}
		return [p0, p1, p2, p3];
	}

    static CreateNormalisedQuarterCircle(r = 0.55228)
    {
        var p0 = new paper.Point(0,0);
        var p1 = new paper.Point(1,1);
        var p3 = new paper.Point(0,1);

      //  console.log("r", r);
        var a0 =  new paper.Point(( r),0);
        var a1 =  new paper.Point(0, - r);
        var s1 = new paper.Segment(p0, null, a0);
        var s2 = new paper.Segment(p1, a1, null);
        return [s1,s2, p3];
    }

    static CreateNormalisedCircle(r = 0.55228)
    {
        var p0 = new paper.Point(0.5,0);
        var p1 = new paper.Point(1,0.5);
        var p2 = new paper.Point(0.5,1);
        var p3 = new paper.Point(0,0.5);

        //  console.log("r", r);
        var s0 = new paper.Segment(p0, new paper.Point(-r,0), new paper.Point(r,0));
        var s1 = new paper.Segment(p1, new paper.Point(0,-r), new paper.Point(0,r));
        var s2 = new paper.Segment(p2, new paper.Point(r,0), new paper.Point(-r,0));
        var s3 = new paper.Segment(p3, new paper.Point(0,r), new paper.Point(0,-r));

        return [s0,s1,s2,s3];
    }

    //
	static CreateSCurveShape(r = 0.55228)
	{
		//  console.log("r", r);
		var p0 = new paper.Point(0,0);
		var s0 = new paper.Segment(new paper.Point(1,0), null, new paper.Point(-r,0));
		var s1 = new paper.Segment(new paper.Point(0,1), new paper.Point(r,0), null);
		return [p0,s0,s1];
	}


	static GetControlPointsFromSegments(segments)
	{
		var temp = [];
		for(var i = 0; i< segments.length; ++i)
		{
			var s = segments[i];
			if(s.constructor.name == paper.Point.name)
			{
				temp.push(s);
			}
			else if(s.constructor.name = paper.Segment.name){
				temp.push(s.point);
			}
		}
		return temp;
	}

	static GetBoundForSegments(segments)
	{
		var temp = [];
		for(var i = 0; i< segments.length; ++i)
		{
			var s = segments[i];
			if(s.constructor.name == paper.Point.name)
			{
				temp.push(s);
			}
			else if(s.constructor.name = paper.Segment.name){
				temp.push(s.point);
			}
		}
		return PointUtils.GetBoundForPoints(temp);
	}

	static GetBoundForPoints(points)
	{
		var minx = points[0].x;
		var miny = points[0].y;
		var maxx = points[0].x;
		var maxy = points[0].y;

		for(var i = points.length-1 ; i >=1; --i)
		{
			minx = Math.min(minx, points[i].x);
			maxx = Math.max(maxx, points[i].x);
			miny = Math.min(miny, points[i].y);
			maxy = Math.max(maxy, points[i].y);
		}
		return new paper.Rectangle(minx, miny, maxx- minx, maxy- miny);
	}

	// get divide up a quad into a grid of points
	static GetPointGridInQuadSpace(nrows, ncols, quadPoints)
	{
		var ri,rj,tempp;
		tempp = new paper.Point();
		var points = [];
		for (var j = 0; j < nrows; ++j)
		{
			rj = (nrows == 1) ? 0.5 : j / (nrows - 1);
			tempp.y = rj;
			for (var i = 0; i < ncols; ++i)
			{
				ri = (ncols == 1) ? 0.5 : i / (ncols - 1);
				tempp.x = ri;
				var p = PointUtils.TransformPointToQuadSpace(quadPoints, tempp);
			//	console.log("here" , p);
				points.push(p);
			}
		}
		return points;
	}

	// get divide up a quad into a tri grid of points
	static GetPointTriGridInQuadSpace()
	{

	}
}
