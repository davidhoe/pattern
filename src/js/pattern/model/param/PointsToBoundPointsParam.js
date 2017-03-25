

import {Param} from './Param'
import * as utils from '../../util/utils'
import paper from 'paper'

/**
 * gets a bound (quad point array) from a set of points
 */
export class PointsToBoundPointsParam extends Param
{
	constructor(array = [new paper.Point()])
	{
		super();
		this.array = array;
	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputPointArray();
	}

	getValue(outputName = "")
	{
		super._processParams();
		//
		var bound = utils.PointUtils.GetBoundForSegments(this.array);
		var boundPoints  = utils.PointUtils.CreateRectPoints(bound);
		return boundPoints;
	}
}