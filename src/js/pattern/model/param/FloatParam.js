/**
 * Created by David on 03/03/2017.
 */
import {Param} from './Param'

export class FloatParam extends Param{
    constructor(defaultValue)
    {
        super();
        this.defaultValue = defaultValue;
    }

    getValue()
    {
        super._processParams();
        return this.defaultValue;
    }
}
