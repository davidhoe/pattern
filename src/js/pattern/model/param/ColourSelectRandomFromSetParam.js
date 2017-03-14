
import paper from 'paper'
import {ColourParam} from './ColourParam'
import * as utils from '../../util/utils'

/**
 * select a random colour from an colour set
 */
export class ColourSelectRandomFromSetParam extends ColourParam
{
	constructor(colourset)
	{
		super();
		this.colourset = colourset;
	}

	getValue(outputName = "")
	{
		super._processParams();
		if(this.colourset.length > 0)
		{
			var ix = utils.MathUtils.GetRandomIndexForArray(this.colourset);
			return this.colourset[ix];
		}
		else{
			console.error("colourset is empty");
		}
		return new paper.Color(0,0,0);
		//return this.defaultValue;
	}
}