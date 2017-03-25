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
		this.lineThickness = 3;
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
		//console.log("!!! basep0 ", basep0);
		//console.log("!!! basep1 ", basep1);
		//console.log("!!! scalePoint ", scalePoint);
		//console.log("!!! p0 ", p0);
		//console.log("!!! p1 ", p1);

		var grad = p1.subtract(p0);
		grad = grad.normalize();
		var tangent = new paper.Point(grad.y,-grad.x);
		//console.log("!!! tangent ", tangent);

		var f = this.lineThickness;
		var q0 = new paper.Point(p0.x + tangent.x*f, p0.y + tangent.y*f);
		var q1 = new paper.Point(p0.x - tangent.x*f, p0.y - tangent.y*f);
		var q2 = new paper.Point(p1.x + tangent.x*f, p1.y + tangent.y*f);
		var q3 = new paper.Point(p1.x - tangent.x*f, p1.y - tangent.y*f);

		var newpath = [q0,q1,q3,q2];
		//console.log("!!! QuadToLineShapeNode ", newpath);

		PatternState.Instance().path = newpath;
		//	console.log("this.normalisedQuadPoints ", this.normalisedQuadPoints );

		super.processChildNodes();
		super._restoreStatePath();
	}
}
