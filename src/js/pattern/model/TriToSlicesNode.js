import {IterableNode} from './IterableNode'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import * as editor from './editor/editor'

import paper from 'paper'

/**
 * subdivide a tri into a set of slices
 */
export class TriToSlicesNode extends IterableNode
{
	/**
	 * sudivide into a number of rows

	 */
	constructor(floatArray = [0.0,0.5,1.0], sliceAcross = false)
	{
		super();
		this.floatArray = floatArray;
		this.sliceAcross = sliceAcross;
		this._ix = 0;
	}


	process()
	{
		super._processParams();
		var path  = super._getStatePath();
		if(path.length >= 3)
		{

			super._saveStatePath();
			var shapes = TriToSlicesNode.SubdivideTri(this.sliceAcross, this.floatArray, path);
			for (var i = 0; i < shapes.length; i++) {

				this._ix = i;
				PatternState.Instance().path = shapes[i];
				//	console.log("here", PatternState.Instance().path);
				super.processChildNodes();
			}
			super._restoreStatePath();
		}
	}

	// todo subdivide into X rows
	static SubdivideTri(sliceAcross, floatArray, tripoints)
	{
		var points0,points1;
		if(!sliceAcross) {
			points0 = TriToSlicesNode.GetLerpPoints(floatArray, tripoints[0], tripoints[0]);
			points1 = TriToSlicesNode.GetLerpPoints(floatArray, tripoints[1], tripoints[2]);
		}else{ // slice like a pizza
			points0 = TriToSlicesNode.GetLerpPoints(floatArray, tripoints[0], tripoints[1]);
			points1 = TriToSlicesNode.GetLerpPoints(floatArray, tripoints[0], tripoints[2]);
		}
		var p0,p1,p2,p3;
		var quads = [];
		var n = floatArray.length;
		for(var i = 0; i< n -1;++i)
		{
			p0 = points0[i];
			p1 = points1[i];
			p2 = points1[i+1];
			p3 = points0[i+1];
			quads.push([p0,p1,p2,p3]);
		}
		return quads;
	}

	// generic
	static GetLerpPoints(floatArray, p0,p1)
	{
		var rj;
		var lerpPoints = [];
		var n = floatArray.length;
		//console.log("floatArray",floatArray);
		for(var j = 0; j< n; ++j)
		{
			rj = floatArray[j];
			var p = PointUtils.LerpPoint(p0,p1, rj);
			lerpPoints.push(p);
		}
		return lerpPoints;
	}

}