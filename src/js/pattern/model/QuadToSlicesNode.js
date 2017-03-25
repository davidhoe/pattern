import {IterableNode} from './IterableNode'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import * as editor from './editor/editor'

import paper from 'paper'

/**
 * subdivide a quad into a set of slices
 */
export class QuadToSlicesNode extends IterableNode
{
	/**
	 * sudivide into a number of rows

	 */
	constructor(floatArray = [0.0,0.5,1.0])
	{
		super();
		this.floatArray = floatArray;
		this._ix = 0;
	}


	process()
	{
		super._processParams();
		var path  = super._getStatePath();
		if(path.length >= 4)
		{

			super._saveStatePath();
			var shapes = QuadToSlicesNode.SubdivideQuad(this.floatArray, path);
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
	static SubdivideQuad(floatArray, quadpoints)
	{
		var points0 = QuadToSlicesNode.GetLerpPoints(floatArray, quadpoints[0],quadpoints[1]);
		var points1 = QuadToSlicesNode.GetLerpPoints(floatArray, quadpoints[3],quadpoints[2]);

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