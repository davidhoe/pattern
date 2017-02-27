/**
 * Created by David on 26/02/2017.
 */
import paper from 'paper'

export class DiamondGridUtils
{

    /**
     * create a grid of quads that covers the bounding box area, this will usually be the canvas dimension.
     * @param bound     bounding area to cover
     * @param angle     angle is in degrees
     * @param shapeSize    paper.Size in pixels of each box
     * return a array of quads (each quad is a array of 4 points)
     */
    static CreateGrid(bound, angle, shapeSize)
    {
        // find a point in the center of the bound
        var cp = bound.center;
        var mat = new paper.Matrix();
        mat.translate(cp);
        mat.rotate(angle, 0, 0);

        var ix = 0;
        var iy = 0;
        var shapes = [];
        var rowresult;

        // create the first row in the middle
        var centerrow = DiamondGridUtils._StepCreateShapesRow(ix,iy,shapeSize, mat, bound);
        rowresult = centerrow;
        shapes = shapes.concat(rowresult.shapes);

        // step along each row in the negtive direction
        while(true)
        {
            iy = iy - 1;
            rowresult = DiamondGridUtils._StepCreateShapesRow(rowresult.startix,iy,shapeSize, mat, bound);
            //    shapes = shapes.concat(rowresult2.shapes);
            if(rowresult.shapes.length == 0)
            {
                break;
            }
            else{
                shapes = shapes.concat(rowresult.shapes);
            }
        }
        // step along each row in the postiive direction
        iy = 0;
        rowresult = centerrow;
        while(true)
        {
            iy = iy + 1;
            rowresult = DiamondGridUtils._StepCreateShapesRow(rowresult.startix,iy,shapeSize, mat, bound);
            //    shapes = shapes.concat(rowresult2.shapes);
            if(rowresult.shapes.length == 0)
            {
                break;
            }
            else{
                shapes = shapes.concat(rowresult.shapes);
            }
        }

        return shapes;
    }

    // do one row. do steps forward until out of bound, then repeat in the reverse direction
    static _StepCreateShapesRow(ix,iy, shapeSize, mat, bound)
    {
        // search for a shape in bound ste pforward X times
        ix = DiamondGridUtils._FindShapeInRowInBound(ix,iy, shapeSize, mat, bound);
        var shapesForward = DiamondGridUtils._StepCreateShapes(ix,iy, 1, shapeSize, mat, bound);
        var shapesReverse = DiamondGridUtils._StepCreateShapes(ix-1,iy, -1, shapeSize, mat, bound);
        //return shapesReverse.concat(shapesForward);
        return {
            "shapes" : shapesReverse.shapes.concat(shapesForward.shapes),
            "startix" : shapesReverse.startix,
            "endix" : shapesReverse.endix
        };
    }

    // step forward to find a the first shape in bound
    static _FindShapeInRowInBound(ix,iy, shapeSize, mat, bound)
    {
        var maxCount = 30;
        while(maxCount-- > 0)
        {
            // construct shape
            var shape = DiamondGridUtils.CreateShapePoints(ix,iy, shapeSize, mat);
            // console.log("shape " + shape);
            if(DiamondGridUtils.IsInBound(shape, bound))
            {
                return ix;
            }
            else{
                ix++;
            }
        }
        return ix;
    }

    static _StepCreateShapes(ix,iy, stepix, shapeSize, mat, bound)
    {
        var startix = ix;
        var shapes = [];
        while(true)
        {
            // construct shape
            var shape = DiamondGridUtils.CreateShapePoints(ix,iy, shapeSize, mat);
            // console.log("shape " + shape);
            if(DiamondGridUtils.IsInBound(shape, bound))
            {
                shapes.push(shape);
                ix += stepix;
            }
            else{
                break;
            }
        }
        return {"shapes":  (stepix == -1) ? shapes.reverse() : shapes,
            "startix": (stepix == -1) ? ix : startix ,
            "endix": (stepix == -1) ? startix : ix };
    }

    // specific
    static CreateShapePoints(ix,iy, size, mat)
    {
        var p0,p1,p2,p3;
        var offset = (iy % 2 == 0) ? 0 : 0.5;
        var s = 0.5;
        p0 = new paper.Point((offset + ix + 0.5) * size.width, (iy*s + 0) * size.height);
        p1 = new paper.Point((offset + ix + 1) * size.width, (iy*s + 0.5) * size.height);
        p2 = new paper.Point((offset + ix + 0.5) * size.width, (iy*s + 1.0) * size.height);
        p3 = new paper.Point((offset + ix + 0) * size.width, (iy*s + 0.5) * size.height);

        return DiamondGridUtils.TransformPoints([p0,p1,p2,p3], mat);
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
        return false;
    }


}