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
export class QuadToLineShapeNode extends Node
{
	constructor()
	{
		super();
		this.scale = 1;
		this.scaleOriginRatio = 0.5;
		this.np0 = new paper.Point(0.5,0);
		this.np1 = new paper.Point(0.5,1);
		//this._normalisedSegments = [];
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

		var basep0 = PointUtils.TransformPointToQuadSpace(path, this.np0);
		var basep1 = PointUtils.TransformPointToQuadSpace(path, this.np1);


		var scalePoint = PointUtils.LerpPoint(basep0,basep1, this.scaleOriginRatio);
		var p0 = PointUtils.LerpPoint(scalePoint,basep0, this.scale);
		var p1 = PointUtils.LerpPoint(scalePoint,basep1, this.scale);

		var newpath = [p0,p1];
		//console.log("!!! QuadToLineShapeNode ", newpath);

		PatternState.Instance().path = newpath;
		//	console.log("this.normalisedQuadPoints ", this.normalisedQuadPoints );

		super.processChildNodes();
		super._restoreStatePath();
	}
}
