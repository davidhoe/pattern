/**
 * Created by David on 04/03/2017.
 */
import paper from 'paper'
import {Param} from './Param'

export class ColourHSBShiftParam extends Param{
    constructor(colour = new paper.Color(), hue = 0, sat = 0, bri = 0)
    {
        super();
        this.colour = colour;
        this.hue = hue; // hue  range [0,360]
        this.sat = sat; // saturation range [0,1]
        this.bri = bri; // brightness range [0,1]
    }

    getEditorDefinition()
    {
        return super.getEditorDefinition().setOutputColour();
    }

    getValue(outputName = "")
    {
        super._processParams();
        var newcol = this.colour.clone();
        newcol.hue += this.hue;
        newcol.saturation += this.sat;
        newcol.brightness += this.bri;
        return newcol;
    }
}
