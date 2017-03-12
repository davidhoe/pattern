/**
 * Created by David on 04/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * center scales the quad (scale of 1 returns the same path)
 */
export class QuadScaleNode extends Node
{
	constructor(scale = 1, anchorp = null)
	{
		super();
		this.anchorp = (anchorp == null) ? new paper.Point(0.5,0.5): anchorp;
		this.scale = scale; // float
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
		PatternState.Instance().path = PointUtils.GetScaledQuad(path,this.scale, this.anchorp);
		//console.log("PatternState.Instance().path" , PatternState.Instance().path);

		super.processChildNodes();
		super._restoreStatePath();
	}
}
