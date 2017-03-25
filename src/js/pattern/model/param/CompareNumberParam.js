/**
 * Created by David on 03/03/2017.
 */
import {Param} from './Param'

var OperatorType = {
    "==" : 0,
    "!=" : 1,
    ">" : 2,
    "<" : 3,
    "<=" : 4,
    ">=" : 5
}

export class CompareNumberParam extends Param{
    constructor(x0 = 0, x1 = 0)
    {
        super();
        this.x0 = x0;
        this.x1 = x1;
        this.operator = OperatorType["=="];
    }

    getEditorDefinition()
    {
        var def =  super.getEditorDefinition().setOutputBool("");
        // todo , get the input definition by name and  key value pair.
        def.addInputIntSelectDropdown("operator", null, OperatorType);
        return def;
    }

    getValue(outputName = "")
    {
        super._processParams();
        console.log("operator " , this.operator);

        if(this.operator == OperatorType["=="])
        {
            return this.x0 == this.x1;
        }
        else if(this.operator == OperatorType["!="])
        {
            return this.x0 != this.x1;
        }
        else if(this.operator == OperatorType[">"])
        {
            return this.x0 > this.x1;
        }
        else if(this.operator == OperatorType["<"])
        {
            return this.x0 < this.x1;
        }
        else if(this.operator == OperatorType["<="])
        {
            return this.x0 <= this.x1;
        }
        else if(this.operator == OperatorType[">="])
        {
            return this.x0 >= this.x1;
        }
        return this.x0 == this.x1;
    }
}
