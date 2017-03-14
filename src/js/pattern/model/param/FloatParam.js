/**
 * Created by David on 03/03/2017.
 */
import {Param} from './Param'

export class FloatParam extends Param{
    constructor(defaultValue = 0)
    {
        super();
        this.value = defaultValue;

        // this._params[""];
    }

    getEditorDefinition()
    {
        return super.getEditorDefinition().setOutputFloat("");
    }

    getValue(outputName = "")
    {
        super._processParams();
        return this.value;
    }
}
