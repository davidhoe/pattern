/**
 * Created by davidhoe on 28/02/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * get a slice
 */
export class TriSliceNode extends Node
{
	constructor(r0,r1, nSlices)
	{
		super();
		// public
		this.nSlices =(nSlices != null) ? Math.max( nSlices , 1) : 1;
		this.r0 = r0;
		this.r1 = r1;
	}

	process()
	{
		var path = super._getStatePath();
		if(path.length >= 3)
		{
			super._saveStatePath();
			var ratio0, ratio1;
			for(var i =0 ;i < this.nSlices; ++i)
			{
				ratio0 = MathUtils.Lerp(this.r0, this.r1, i/this.nSlices);
				ratio1 = MathUtils.Lerp(this.r0, this.r1, (i+1)/this.nSlices);
				PatternState.Instance().path = TriSliceNode.GetTriSlice(ratio0, ratio1, path);
				super.processChildNodes();
			}
			super._restoreStatePath();
		}
	}

	static GetTriSlice(r0,r1, triPoints)
	{
		var p0 = PointUtils.LerpPoint(triPoints[2],triPoints[1], r0);
		var p1 = PointUtils.LerpPoint(triPoints[2],triPoints[1], r1);
		return [triPoints[0], p1,p0];
	}
}
