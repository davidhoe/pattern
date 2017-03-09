/**
 * Created by David on 03/03/2017.
 */
import {Param} from './Param'

export class FloatParam extends Param{
    constructor(defaultValue)
    {
        super();
        this.value = defaultValue;
    }

    getEditorDefinition()
    {
        return super.getEditorDefinition().setOutputFloat();
    }

    getValue()
    {
        super._processParams();
        return this.value;
    }
}
