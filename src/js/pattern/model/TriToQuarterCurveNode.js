/**
 * Created by David on 04/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * quad to a quarter circle
 */
export class TriToQuarterCurveNode extends Node
{
	constructor(r = null)
	{
		super();
		this.r = ( r == null) ? 0.55228 : r;
	}

	process()
	{
		super._processParams();

		var path = super._getStatePath();
		if(path.length < 3)
		{
			console.error("not enough points in state path, length ", path.length);
			return;
		}
		var p0 = path[0];
		var p1 = path[1];
		var p2 = path[2];

		var a0 = PointUtils.LerpPoint(p1,p0, 1-this.r).subtract(p1);
		var a1 = PointUtils.LerpPoint(p2,p0, 1-this.r).subtract(p2);
		var s0 = new paper.Segment(p1, null, a0);
		var s1 = new paper.Segment(p2, a1, null);
		super._saveStatePath();
		PatternState.Instance().path = [s0,s1];
		super.process();
		super._restoreStatePath();

	}

}
