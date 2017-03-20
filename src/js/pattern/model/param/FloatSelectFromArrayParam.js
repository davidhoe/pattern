

import {Param} from './Param'
import * as utils from '../../util/utils'

/**
 * select an int from an array
 */
export class FloatSelectFromArrayParam extends Param
{
	constructor(array = [0])
	{
		super();
		this.array = array;
	}

	getEditorDefinition() {
		return super.getEditorDefinition().setOutputFloat("");
	}

	getValue(outputName = "")
	{
		super._processParams();
		var random = true;
		if(random)
		{
			var ix = utils.MathUtils.GetRandomIndexForArray(this.array);
			return this.array[ix];
		}
		return 0;
		//return this.defaultValue;
	}
}