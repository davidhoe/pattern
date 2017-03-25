/**
 * Created by davidhoe on 04/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * update: try saving param getValue to a map. Then using getSavedParam to retrieve it
 *
 * save a param for later use  - useful for save parameters that have used random numbers
 */
export class ParamSaveNode extends Node
{
	// test for colourset
	constructor(valueName = "val1", valueToSave = [paper.Color()])
	{
		super();
		// public
		this.valueToSave = valueToSave; // open object type?
		//this.savedParamValue = null;
		this.valueKey = valueName;
	}

	getEditorDefinition()
	{
		// standard infer type
		var def = super.getEditorDefinition();
		return def;
	}

	process()
	{
		super._processParams();
		// save value to global map
		PatternState.Instance().setSavedValue(this.valueKey, this.valueToSave);
		super.processChildNodes();
	}

}
