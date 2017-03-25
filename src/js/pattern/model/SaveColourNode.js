/**
 * Created by davidhoe on 04/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * save a param for later use  - useful for save parameters that have used random numbers
 */
export class SaveColourNode extends Node
{
	constructor()
	{
		super();
		// public
		this.value = new paper.Color();
		this.valueKey = "c0";
	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputColour("value");
	}

	getValue(outputName = "")
	{
		if(outputName == "value")
		{
			return this.value;
		}
		return 0;
	}

	process()
	{
		super._processParams();
		// save value to global map
		PatternState.Instance().setSavedValue(this.valueKey, this.value);
		super.processChildNodes();
	}

	getValue()
	{
		return this.value;
	}

}
