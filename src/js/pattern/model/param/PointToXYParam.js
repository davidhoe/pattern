/**
 * Created by David on 03/03/2017.
 */

import paper from 'paper'
import {Param} from './Param'
/*
 * operation for a paper.Point object
 */
export class PointToXYParam extends Param{
    constructor(p = new paper.Point(0,0))
    {
        super();
        this.p = p;
    }

    getEditorDefinition()
    {
        var def = super.getEditorDefinition().setOutputFloat("x");
        def.setOutputFloat("y");
        return def;
    }
    // process params here like a node

    getValue(outputName = "")
    {
        super._processParams();
        if(outputName == "x")
        {
            return this.p.x;
        }
        return this.p.y;
    }
}
