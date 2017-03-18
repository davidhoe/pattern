/**
 * Created by David on 04/03/2017.
 */
import paper from 'paper'
import {Param} from './Param'

export class ColourHSBShiftParam extends Param{
    constructor(colour = new paper.Color(), r = 0, g = 0, b = 0)
    {
        super();
        this.colour = colour;
        this.r = r; //
        this.g = g; //
        this.b = b; //
    }

    getEditorDefinition()
    {
        return super.getEditorDefinition().setOutputColour();
    }

    getValue(outputName = "")
    {
        super._processParams();
        var newcol= this.colour.clone();
        newcol.red += this.r;
        newcol.green += this.g;
        newcol.blue += this.b;
        return newcol;
    }
}
