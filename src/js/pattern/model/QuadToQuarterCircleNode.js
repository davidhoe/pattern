/**
 * Created by David on 04/03/2017.
 */

import {QuadToShapeNode} from './QuadToShapeNode'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * quad to a quarter circle
 */
export class QuadToQuarterCircleNode extends QuadToShapeNode
{
	constructor(r = null)
	{
		super();
		this.r = ( r == null) ? 0.55228 : r;
	}

	process()
	{
		super._processParams();
		this.normalisedSegments =  PointUtils.CreateNormalisedQuarterCircle(this.r);
		super.process();
	}
}
