/**
 * Created by David on 01/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * shifts the points in the path array. eg a shift by 2 will rotate a quad 180 degrees.
 */
export class RotatePathIndexNode extends Node
{
	constructor(shift = 1)
	{
		super();
		this.shift = shift;
	}

	process()
	{
		super._processParams();
		super._saveStatePath();
		PatternState.Instance().path = RotatePathIndexNode.ShiftPointsInArray(super._getStatePath(), this.shift);
		super.processChildNodes();
		super._restoreStatePath();
	}

	static ShiftPointsInArray(points, shift)
	{
		var newpoints = [];
		var n = points.length;
		for(var i =0; i< n; ++i)
		{
			newpoints.push(points[(i + shift + n) % n]);
		}
		return newpoints;
	}

}
