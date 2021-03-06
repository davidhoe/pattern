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
	constructor()
	{
		super();
		this.np0 = new paper.Point(0,0);
		this.np1 = new paper.Point(0.5,0);
		this.np2 = new paper.Point(0.5,1);
		this.np3 = new paper.Point(0,1);
		this._normalisedSegments = [];
	}



	process()
	{
		super._processParams();
		var path = super._getStatePath();
		if(path.length < 4) {
			console.error("state path doesnt have enough points, expecting at least 4, length " , path.length);
			return;
		}
		/*
		if(this._normalisedSegments.length < 4) {
			console.error("normalisedQuadPoints doesnt have enough points, expecting at least 4, length " , _normalisedSegments.length)
			return;
		}*/

		super._saveStatePath();
		var newpath = [];
		var normalisedSegments = [this.np0,this.np1, this.np2, this.np3];
		for(var i =0;i < 4;++i)
		{
			newpath[i] = PointUtils.TransformPointToQuadSpace(path, normalisedSegments[i]);
		}
		PatternState.Instance().path = newpath;
	//	console.log("this.normalisedQuadPoints ", this.normalisedQuadPoints );

		super.processChildNodes();
		super._restoreStatePath();
	}
}
