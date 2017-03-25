

import {Param} from './Param'
import * as utils from '../../util/utils'
import paper from 'paper'

/**
 * select an int from an array
 */
export class PointFromArrayParam extends Param
{
	constructor(array = [new paper.Point()])
	{
		super();
		this.array = array;
		this.ix = 0;
	}

	getEditorDefinition() {
		return super.getEditorDefinition().setOutputPoint("");
	}

	getValue(outputName = "")
	{
		super._processParams();

		return this.array[this.ix];

		//return this.defaultValue;
	}
}