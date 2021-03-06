/**
 * Created by David on 04/03/2017.
 */
import paper from 'paper'
import {Param} from './Param'

export class ColourBlendRGBParam extends Param{
    constructor(col0 = new paper.Color(), col1 = new paper.Color(), rRatio = 0.5,gRatio = 0.5,bRatio = 0.5)
    {
        super();
        this.col0 = col0;
        this.col1 = col1;
        this.rRatio = rRatio;
        this.gRatio = gRatio;
        this.bRatio = bRatio;
    }

    getEditorDefinition()
    {
        return super.getEditorDefinition().setOutputColour();
    }

    getValue(outputName = "")
    {
        super._processParams();

        var rr = this.col0.red *(1- this.rRatio) + this.col1.red *this.rRatio;
        var gg = this.col0.green *(1- this.gRatio) + this.col1.green *this.gRatio;
        var bb = this.col0.blue *(1- this.bRatio) + this.col1.blue *this.bRatio;
        return new paper.Color(rr,gg,bb);
    }
}
