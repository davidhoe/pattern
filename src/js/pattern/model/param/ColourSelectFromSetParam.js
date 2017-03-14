
import paper from 'paper'
import {ColourParam} from './ColourParam'
import * as utils from '../../util/utils'

/**
 * select an colour from an colour set
 */
export class ColourSelectFromSetParam extends ColourParam
{
	constructor(colourset, index)
	{
		super();
		this.colourset = colourset;
		this.index = index;
	}

	getValue(outputName = "")
	{
		super._processParams();
		if(this.index < this.colourset.length)
		{
			return this.colourset[this.index];
		}
		else{
			console.error("index out of bounds " ,this.index, "length",  this.colourset.length);
		}
		return new paper.Color(0,0,0);
		//return this.defaultValue;
	}
}