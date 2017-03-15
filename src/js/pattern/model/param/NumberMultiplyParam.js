/**
 * Created by David on 03/03/2017.
 */
import {Param} from './Param'

var OperatorType = {
    "Add" : 0,
    "Subtract" : 1,
    "Multiply" : 2,
    "Divide" : 3,
    "Mod" : 4
}

export class NumberMultiplyParam extends Param{
    constructor(x0 = 0, x1 = 0)
    {
        super();
        this.x0 = x0;
        this.x1 = x1;
        this.operator = OperatorType.Multiply;
    }

    getEditorDefinition()
    {
        var def =  super.getEditorDefinition().setOutputFloat("");
        // todo , get the input definition by name and  key value pair.
        def.addInputIntSelectDropdown("operator", null, OperatorType);
        return def;
    }

    getValue(outputName = "")
    {
        super._processParams();
        if(this.operator == OperatorType.Multiply)
        {
            console.log("this equals operator multi");
            return this.x0 * this.x1;
        }
        else if(this.operator == OperatorType.Add)
        {
            console.log("this equals operator add");
            return this.x0 + this.x1;
        }
        else if(this.operator == OperatorType.Divide)
        {
            console.log("this equals operator divide");
            return this.x0 / this.x1;
        }
        else if(this.operator == OperatorType.Mod)
        {
            console.log("this equals operator mod");
            return this.x0 % this.x1;
        }
        else if(this.operator == OperatorType.Subtract)
        {
            console.log("this equals operator subtract");
            return this.x0 - this.x1;
        }

        return this.x0 * this.x1;
    }
}
