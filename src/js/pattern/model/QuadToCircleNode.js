/**
 * Created by David on 05/03/2017.
 */

import {QuadToShapeNode} from './QuadToShapeNode'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * quad to a circle
 */
export class QuadToCircleNode  extends QuadToShapeNode
{
	constructor(r = null)
	{
		super();
		this.r = ( r == null) ? 0.55228 /2 : r;
	}

	process()
	{
		var points =  PointUtils.CreateNormalisedCircle(this.r);
		this.normalisedSegments = points;
		super.process();
	}
}
