/**
 * Created by David on 04/03/2017.
 */
import paper from 'paper'
import {Param} from './Param'

export class ColourHSBParam extends Param{
    constructor(hue = 0, sat = 0, bri = 0)
    {
        super();
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
        var col = new paper.Color();
        col.brightness = this.bri;
        col.saturation = this.sat;
        col.hue = this.hue;
        return col;
    }
}
