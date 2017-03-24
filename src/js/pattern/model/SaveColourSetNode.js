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
export class SaveColourSetNode extends Node
{
	constructor()
	{
		super();
		// public
		this.value = [new paper.Color()];
	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputColourArray("value");
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
		//console.log(" ParamSaveNode " );
		super._processParams();
		super.processChildNodes();
	}

	getValue()
	{
		return this.value;
	}

}
