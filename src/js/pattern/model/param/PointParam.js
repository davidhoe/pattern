/**
 * Created by David on 03/03/2017.
 */

import paper from 'paper'
import {Param} from './Param'
/*
 * operation for a paper.Point object
 */
export class PointParam extends Param{
    constructor(x = 0, y = 0)
    {
        super();
        this.x = x;
        this.y = y;
    }

    getEditorDefinition()
    {
        return super.getEditorDefinition().setOutputPoint("");
    }
    // process params here like a node

    getValue(outputName = "")
    {
        super._processParams();
        console.log("pointparam - getvalue ", this.x, this.y);
        return new paper.Point(this.x, this.y);
    }
}
