/**
 * Created by David on 04/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * create a line shape from 2 poitns
 */
export class LineFromPointsNode extends Node
{
	constructor()
	{
		super();
		this.p0 = new paper.Point(-50,-50);
		this.p1 = new paper.Point(50,50);
	}

	process()
	{
		super._processParams();
		super._saveStatePath();
		PatternState.Instance().path = [this.p0,this.p1];
		super.processChildNodes();
		super._restoreStatePath();
	}
}
