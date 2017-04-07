

import {IntParam} from './IntParam'
import * as utils from '../../util/utils'

/**
 * select an int from an array
 */
export class IntSelectFromArrayParam extends IntParam
{
	constructor(array = [0], mode=0)
	{
		super();
		this.array = array;
		this.mode = mode;
	}

	getValue(outputName = "")
	{
		super._processParams();
		var random = true;
		if(random)
		{
			var ix = utils.MathUtils.GetSeededRandomIndexForArray(this.array);
			return this.array[ix];
		}
		return 0;
		//return this.defaultValue;
	}
}