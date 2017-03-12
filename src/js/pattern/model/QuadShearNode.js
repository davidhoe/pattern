/**
 * Created by David on 05/03/2017.
 */

import {QuadToShapeNode} from './QuadToShapeNode'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * extend line1 in one direction, line2 in another direction
 */
export class QuadShearNode  extends QuadToShapeNode
{
	constructor(shearRatio = null)
	{
		super();
		this.shearRatio = ( shearRatio == null) ? 0.25 : shearRatio;
	}

	process()
	{
		super._processParams();
		this.normalisedSegments = PointUtils.CreateNormalisedShearedQuad(this.shearRatio);
		super.process();
	}
}
