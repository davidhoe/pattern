

import {IntParam} from './IntParam'
import * as utils from '../../util/utils'

/**
 * select an int from an array
 */
export class RandomIntInRangeParam extends IntParam
{
	constructor(startIndex = 0, endIndex = 3)
	{
		super();
		this.startIndex = startIndex;
		this.endIndex = endIndex;
	}

	getValue()
	{
		super._processParams();
		var ix = utils.MathUtils.GetRandomIntBetween(this.startIndex, this.endIndex);
		return ix;
		//return this.defaultValue;
	}
}