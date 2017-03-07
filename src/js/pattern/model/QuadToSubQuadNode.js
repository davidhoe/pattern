/**
 * Created by David on 04/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * converts a quad to a smaller quad
 */
export class QuadToSubQuadNode extends Node
{
	constructor(normalisedQuadPoints)
	{
		super();
		this.normalisedQuadPoints = normalisedQuadPoints;
	}

	process()
	{
		super._processParams();
		var path = super._getStatePath();
		if(path.length < 4) {
			console.error("state path doesnt have enough points, expecting at least 4, length " , path.length);
			return;
		}
		if(this.normalisedQuadPoints.length < 4) {
			console.error("normalisedQuadPoints doesnt have enough points, expecting at least 4, length " , normalisedQuadPoints.length)
			return;
		}

		super._saveStatePath();

		var newpath = [];
		for(var i =0;i < 4;++i)
		{
			newpath[i] = PointUtils.TransformPointToQuadSpace(path, this.normalisedQuadPoints[i]);
		}
		PatternState.Instance().path = newpath;
	//	console.log("this.normalisedQuadPoints ", this.normalisedQuadPoints );

		super.processChildNodes();
		super._restoreStatePath();
	}
}
