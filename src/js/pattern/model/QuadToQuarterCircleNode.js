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
export class QuadToQuarterCircleNode extends Node
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
		if(path.length < 4) {
			console.error("state path doesnt have enough points, expecting at least 4, length " , path.length);
			return;
		}

		super._saveStatePath();

		var p0 = path[0];
		var p1 = path[2];
		var a0 = PointUtils.GetInterpolatedPointInQuad(path, new paper.Point(( this.r),0));
		var a1 = PointUtils.GetInterpolatedPointInQuad(path, new paper.Point(1, 1- this.r));

		var s1 = new paper.Segment(p0, null, a0.subtract(p0));
		var s2 = new paper.Segment(p1, a1.subtract(p1), null);
		PatternState.Instance().path = [s1,s2, path[3]];

		super.processChildNodes();
		super._restoreStatePath();
	}
}
