
import paper from 'paper'
import {Param} from './Param'
import * as utils from '../../util/utils'

/**
 * select an colour from an colour set
 */
export class ColourSelectFromSetParam extends Param
{
	constructor(colourset =  [new paper.Color()], index = 0)
	{
		super();
		this.colourset = colourset;
		this.index = index;
	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputColour();
	}

	getValue(outputName = "")
	{
		super._processParams();
		var ix = this.index % this.colourset.length;
		if(ix < this.colourset.length)
		{
			return this.colourset[ix];
		}
		else{
			console.error("index out of bounds " ,this.index, "length",  this.colourset.length);
		}
		return new paper.Color(0,0,0);
		//return this.defaultValue;
	}
}