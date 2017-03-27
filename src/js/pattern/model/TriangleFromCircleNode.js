/**
 * Created by David on 04/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * create a triangle whose points lie on the circumfrance of the circle
 */
export class TriangleFromCircleNode extends Node
{
    constructor()
    {
        super();
        this.a0 = 0; // angle in degrees
        this.a1 = 135; // angle in degrees
        this.a2 = 270; // angle in degrees
        this.r = 100; // radius
    }

    process()
    {
        super._processParams();
        super._saveStatePath();

        var p0 = new paper.Point(0,this.r);
        var p1 = new paper.Point(0,this.r);
        var p2 = new paper.Point(0,this.r);
        p0 = p0.rotate(this.a0);
        p1 = p1.rotate(this.a1);
        p2 = p2.rotate(this.a2);

        PatternState.Instance().path = [p0,p1,p2];
        super.processChildNodes();
        super._restoreStatePath();
    }
}
