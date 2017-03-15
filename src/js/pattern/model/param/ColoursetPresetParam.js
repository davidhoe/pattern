/**
 * Created by David on 03/03/2017.
 */
import {Param} from './Param'
import * as utils from '../../util/utils'

/**
 * select a colourset from the preset
 */
export class ColoursetPresetParam extends Param{
	constructor(defaultValue = 0)
	{
		super();
		this.ix = defaultValue;
		// this._params[""];
	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputColourArray("");
	}

	getValue(outputName = "")
	{
		super._processParams();
		return utils.ColourUtils.GetColourset(this.ix);
	}
}
