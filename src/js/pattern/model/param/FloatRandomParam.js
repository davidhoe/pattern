/**
 * Created by David on 03/03/2017.
 */
import {Param} from './Param'
import * as utils from '../../util/utils'

export class FloatRandomParam extends Param{
    constructor(minRange = 0, maxRange = 1)
    {
        super();
        this.minRange = minRange;
        this.maxRange = maxRange;
        // this._params[""];
    }

    getEditorDefinition()
    {
        return super.getEditorDefinition().setOutputFloat("");
    }

    getValue(outputName = "")
    {
        super._processParams();
        return utils.MathUtils.GetSeededRandomFloat(this.minRange, this.maxRange);
    }
}
