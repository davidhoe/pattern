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
}