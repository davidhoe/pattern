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
export class LineNode extends Node
{
	constructor()
	{
		super();
		this.anchorRatio = 0.5;
		this.length = 100;
		this.angle = 0;
	}

	process()
	{
		super._processParams();
		super._saveStatePath();
		var p0 = new paper.Point(-this.anchorRatio*this.length,0 );
		var p1 = new paper.Point((1-this.anchorRatio)*this.length,0 );
		p0 = p0.rotate(this.angle);
		p1 = p1.rotate(this.angle);

		PatternState.Instance().path = [p0,p1];
		super.processChildNodes();
		super._restoreStatePath();
	}
}
