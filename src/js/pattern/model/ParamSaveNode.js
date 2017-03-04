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
export class ParamSaveNode extends Node
{
	constructor(param)
	{
		super();
		// public
		this.param = param;
		this.savedParamValue = null;
	}

	getSavedParam()
	{
		return this;
	}

	process()
	{
		console.log(" ParamSaveNode " );

		super._processParams();
		this.savedParamValue = this.param.getValue();
		super.processChildNodes();
	}

	getValue()
	{
		return this.savedParamValue;
	}

}
