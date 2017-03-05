/**
 * Created by davidhoe on 05/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * set a quad path
 */
export class QuadNode extends Node
{
	constructor(x = 0, y = 0, w = 100, h = 100)
	{
		super();
		// public
		this.quadPoints = PointUtils.CreateRectPoints(new paper.Rectangle(x,y,w,h));
		//this.quadPoints = (quadPoints == null ) ? PointUtils.CreateRectPoints(new paper.Rectangle(0,0,1,1)) : quadPoints;
	}

	setQuadPoints(quadPoints)
	{
		this.quadPoints = quadPoints;
		return this;
	}

	process()
	{
		super._processParams();
		super._saveStatePath();
		PatternState.Instance().path = this.quadPoints;
		super.processChildNodes();
		super._restoreStatePath();
	}
}
