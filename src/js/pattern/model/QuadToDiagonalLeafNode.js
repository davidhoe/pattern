/**
 * Created by David on 04/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * quad to a diagonal leaf
 */
export class QuadToDiagonalLeafNode extends Node
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

		var a2 = PointUtils.GetInterpolatedPointInQuad(path, new paper.Point(0, this.r));
		var a3 = PointUtils.GetInterpolatedPointInQuad(path, new paper.Point(1- this.r,1));

		// quarter circle
		var s0 = new paper.Segment(p0, null, a0.subtract(p0));
		var s1 = new paper.Segment(p1, a1.subtract(p1), null);
		// another quarter circle
		var s2 = new paper.Segment(p1, null, a3.subtract(p1));
		var s3 = new paper.Segment(p0, a2.subtract(p0), null);

		PatternState.Instance().path = [s0,s1,s2,s3];

		super.processChildNodes();
		super._restoreStatePath();
	}
}
