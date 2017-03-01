import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'

import paper from 'paper'

/**
 * subdivide a triangle path into 4 triangles ?  update this for x triangles
 */
export class TriSubdivisionNode extends Node
{
    /**
     * sudivide into a number of rows
     * @param nrows  2 or more
     */
    constructor(nrows)
    {
        super();
        // public
        this.nrows = nrows;
    }

    process()
    {
        var path = super._getStatePath();
        // todo save state, PatternState.PushPath();
        if(path.length >= 3)
        {
            super._saveStatePath();
            var shapes = TriSubdivisionNode.SubdivideIntoNRows(this.nrows, path);
           // console.log(shapes);
            for (var i = 0; i < shapes.length; i++) {
                //
                PatternState.Instance().path = shapes[i];
                super.processChildNodes();
            }
            super._restoreStatePath();
        }

        // todo pop state, PatternState.PopPath();
    }


    // todo subdivide into X rows
    static SubdivideIntoNRows(nrows, triPoints)
    {
        // create a line of points for each row
        var npoints;
        var rj, r;
        var prows = [];
        for(var j = 0; j<= nrows;++j)
        {
            rj = j/ nrows;
            npoints  = 1 + j;
            var p0 = PointUtils.LerpPoint(triPoints[0],triPoints[2], rj);
            var p1 = PointUtils.LerpPoint(triPoints[0],triPoints[1], rj);
            var prow = [];
            for(var i = 0; i < npoints;++i)
            {
                r = (npoints <= 1) ? 0 : i / (npoints-1);
                var p = PointUtils.LerpPoint(p0,p1, r);
                prow.push(p);
            }
            prows.push(prow);
        }

        var tris = [];
        // for each row, make a row of triangles
        for(var j = 0; j< nrows;++j)
        {
            var p0,p1,p2;
            var prow0 = prows[j];
            var prow1 = prows[j+1];

            // add the first triangle
            p0 = prow0[0];
            p1 = prow1[1];
            p2 = prow1[0];
            tris.push([p0,p1,p2]);
            // add the rest
            for(var i=1; i< prow0.length;++i )
            {
                // add 2 triangles
                p0 = prow1[i];
                p1 = prow0[i-1];
                p2 = prow0[i];
                tris.push([p0,p1,p2]);

                p0 = prow0[i];
                p1 = prow1[i+1];
                p2 = prow1[i];
                tris.push([p0,p1,p2]);
            }
        }
        return tris;
    }


}