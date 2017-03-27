/**
 * Created by David on 04/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * create a line whose points lie on the circumfrance of the circle
 */
export class LineFromCircleNode extends Node
{
    constructor()
    {
        super();
        this.a0 = 0; // angle in degrees
        this.a1 = 90; // angle in degrees
        this.r = 100; // radius
    }

    process()
    {
        super._processParams();
        super._saveStatePath();

        var p0 = new paper.Point(0,this.r);
        var p1 = new paper.Point(0,this.r);
        p0 = p0.rotate(this.a0);
        p1 = p1.rotate(this.a1);

        PatternState.Instance().path = [p0,p1];
        super.processChildNodes();
        super._restoreStatePath();
    }
}
