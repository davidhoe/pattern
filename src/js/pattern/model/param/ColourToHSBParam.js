/**
 * Created by David on 04/03/2017.
 */
import paper from 'paper'
import {Param} from './Param'

export class ColourHSBParam extends Param{
    constructor(colour = new paper.Color())
    {
        super();
        this.colour = colour;
    }

    getEditorDefinition()
    {
        var def =  super.getEditorDefinition();
        def.setOutputFloat("h");
        def.setOutputFloat("s");
        def.setOutputFloat("b");
        return def;
    }

    getValue(outputName = "")
    {
        super._processParams();
        if(outputName == "h")
        {
            return this.colour.hue;
        }
        else if(outputName == "s")
        {
            return this.colour.hue;
        }
        else { // b
            return this.colour.brightness;
        }
    }
}
