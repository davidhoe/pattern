/**
 * Created by David on 05/03/2017.
 */

import {QuadToShapeNode} from './QuadToShapeNode'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * quad to a quarter circle
 */
export class QuadToSCurveNode extends QuadToShapeNode
{
	constructor(r = null)
	{
		super();
		this.r = ( r == null) ? 0.55228 /1.0 : r;
	}

	process()
	{
		super._processParams();
		this.normalisedSegments =  PointUtils.CreateSCurveShape(this.r);
		super.process();
	}
}
