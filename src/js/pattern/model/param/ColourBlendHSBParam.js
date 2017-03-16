/**
 * Created by David on 04/03/2017.
 */
import paper from 'paper'
import {Param} from './Param'

export class ColourBlendHSBParam extends Param{
    constructor(col0 = new paper.Color(), col1 = new paper.Color(), hRatio = 0.5,sRatio = 0.5,bRatio = 0.5)
    {
        super();
        this.col0 = col0;
        this.col1 = col1;
        this.hRatio = hRatio;
        this.sRatio = sRatio;
        this.bRatio = bRatio;
    }

    getEditorDefinition()
    {
        return super.getEditorDefinition().setOutputColour();
    }

    getValue(outputName = "")
    {
        super._processParams();

        var h = this.col0.hue *(1- this.hRatio) + this.col1.hue *this.hRatio;
        var b = this.col0.brightness *(1- this.bRatio) + this.col1.brightness *this.bRatio;
        var s = this.col0.saturation *(1- this.sRatio) + this.col1.saturation *this.sRatio;
        var col =  new paper.Color();
        col.hue = h;
        col.saturation = s;
        col.brightness = b;
        return col;
    }
}
