/**
 * Created by David on 04/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * helper method for creating a absolute circle.  Same as creating a Quad node and applying a QuadToCricle node.
 */
export class CircleNode extends Node
{
	constructor()
	{
		super();
		this.r = 50;
	}

	process()
	{
		super._processParams();
		super._saveStatePath();

		var path = PointUtils.CreateRectPoints(new paper.Rectangle(-this.r ,-this.r ,this.r*2,this.r*2));
		var normalisedSegments = PointUtils.CreateNormalisedCircle();
		var transformedSegments = PointUtils.TransformToQuadSpace(normalisedSegments , path);
		PatternState.Instance().path = transformedSegments;

		//PatternState.Instance().path = [p0,p1,p2];
		super.processChildNodes();
		super._restoreStatePath();
	}
}
