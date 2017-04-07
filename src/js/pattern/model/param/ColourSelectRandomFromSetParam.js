
import paper from 'paper'
import {Param} from './Param'
import * as utils from '../../util/utils'

/**
 * select a random colour from an colour set
 */
export class ColourSelectRandomFromSetParam extends Param
{
	constructor(colourset = [new paper.Color()])
	{
		super();
		this.colourset = colourset;
	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputColour();
	}

	getValue(outputName = "")
	{
		super._processParams();
		if(this.colourset.length > 0)
		{
			var ix = utils.MathUtils.GetSeededRandomIndexForArray(this.colourset);
			return this.colourset[ix];
		}
		else{
			console.error("colourset is empty");
		}
		return new paper.Color(0,0,0);
		//return this.defaultValue;
	}
}