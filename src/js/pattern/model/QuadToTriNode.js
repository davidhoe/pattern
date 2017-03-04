/**
 * Created by davidhoe on 28/02/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * converts to a triangle
 */
export class QuadToTriNode extends Node
{

	constructor(normalisedTriPoints = null)
    {
        super();
	    var defaultPoints = [new paper.Point(0,0), new paper.Point(1,1), new paper.Point(0,1)];
	    this.normalisedTriPoints = (normalisedTriPoints == null ) ? defaultPoints : normalisedTriPoints;
    }

	process()
	{
		super._processParams();
		var path = super._getStatePath();
		if(path.length < 3)
		{
			console.log("not enough points in state path, length ", path.length);
			return;
		}
		if(this.normalisedTriPoints.length < 3)
		{
			console.log("not enough points in normalisedTriPoints, length ", this.normalisedTriPoints.length);
			return;
		}
		super._saveStatePath();
		var newpath = [];
		for(var i =0 ;i <3; ++i)
		{
			newpath[i] = PointUtils.GetInterpolatedPointInQuad(path, this.normalisedTriPoints[i]);
		}
		PatternState.Instance().path =  newpath; //QuadToTriNode.GetTri(path);
		super.processChildNodes();
		super._restoreStatePath();
	}

	static GetTri(points)
	{
		return [points[0], points[1],points[3]];
	}

}
