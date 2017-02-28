import paper from 'paper'

export class PathUtils
{
    static rightAngleTriangle(rect, cornerix )
    {
        if(cornerix == undefined ) cornerix = 0;

        var corners = [rect.topLeft, rect.topRight, rect.bottomRight, rect.bottomLeft];

        var myPath = new paper.Path();

        myPath.add( corners[(0 + cornerix) % 4 ]);
        myPath.add( corners[(1 + cornerix) % 4 ]);
        myPath.add( corners[(3 + cornerix) % 4 ]);

        myPath.closed = true;
        return myPath;
    }


    static TransformPoints(points, mat)
    {
        for(var i = points.length-1 ; i >=0; --i)
        {
            points[i] = mat.transform(points[i]);
        }
        return points;
    }
    /**
     * helper method return true any of the points is within the bound of the rect
     * @param points
     * @param rect
     */
    static IsInBound(points, rect)
    {
        for(var i = points.length-1 ; i >=0; --i)
        {
            if(rect.contains(points[i])) return true;
        }

        // shape may still overlap along the edges so calc bounding box for safety check
        var shapebound = PathUtils.GetBoundingbox(points);
        if(shapebound.intersects(rect)) return true;
     //   console.log(shapebound);
        return false;
    }

    static GetBoundingbox(points)
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
}