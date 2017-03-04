

import {IntParam} from './IntParam'
import * as utils from '../../util/utils'

/**
 * select an int from an array
 */
export class IntSelectFromArrayParam extends IntParam
{
	constructor(array, mode)
	{
		super();
		this.array = array;
		this.mode = mode;
	}

	getValue()
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