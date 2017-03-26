/**
 * Created by David on 04/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 *
 */
export class TriangleNode extends Node
{
	constructor()
	{
		super();
		this.anchorRatioY = 0.66;
		this.w = 80;
		this.h = 100;
		this.angle = 0;
	}

	process()
	{
		super._processParams();
		super._saveStatePath();

		var p0 = new paper.Point(0, -this.anchorRatioY*this.h);
		var bottomy = (1- this.anchorRatioY)*this.h;
		var p1 = new paper.Point(-this.w/2, bottomy);
		var p2 = new paper.Point(this.w/2, bottomy);

		p0 = p0.rotate(this.angle);
		p1 = p1.rotate(this.angle);
		p2 = p2.rotate(this.angle);

		PatternState.Instance().path = [p0,p1,p2];
		super.processChildNodes();
		super._restoreStatePath();
	}
}
