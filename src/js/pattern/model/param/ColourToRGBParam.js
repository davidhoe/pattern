/**
 * Created by David on 04/03/2017.
 */
import paper from 'paper'
import {Param} from './Param'

export class ColourToRGBParam extends Param{
    constructor(colour = new paper.Color())
    {
        super();
        this.colour = colour;
    }

    getEditorDefinition()
    {
        var def =  super.getEditorDefinition();
        def.setOutputFloat("r");
        def.setOutputFloat("g");
        def.setOutputFloat("b");
        return def;
    }

    getValue(outputName = "")
    {
        super._processParams();
        if(outputName == "r")
        {
            return this.colour.red;
        }
        else if(outputName == "g")
        {
            return this.colour.green;
        }
        else { // b
            return this.colour.blue;
        }
    }
}
