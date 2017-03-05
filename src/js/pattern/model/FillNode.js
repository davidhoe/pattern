/**
 * Created by David on 27/02/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import paper from 'paper'

/**
 *
 */
export class FillNode extends Node
{
    constructor(shapeAtts = null)
    {
        super();
        this.shapeAtts = shapeAtts;
    }

    process()
    {
        var shape = new paper.Path(PatternState.Instance().path);
        shape.closed = true;
        shape.fillColor = PatternState.Instance().colour;
        shape.strokeColor = 'white';
        shape.applyMatrix = true;
        shape.pivot = new paper.Point(0,0);
        shape.matrix = PatternState.Instance().matrix.clone();
        if(this.shapeAtts != null)
        {
            for (var key in this.shapeAtts) {
                if (this.shapeAtts.hasOwnProperty(key)) {
                    console.log("shape att", key , "val", this.shapeAtts[key]);
                    shape[key] = this.shapeAtts[key];
                }
            }

        }
    //    PatternState.Instance().colour = this.colour;
        super.processChildNodes();
    }
}