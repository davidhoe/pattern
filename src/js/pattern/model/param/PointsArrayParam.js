

import {Param} from './Param'
import * as utils from '../../util/utils'
import paper from 'paper'

/**
 * create a radial set of points
 */
export class PointsArrayParam extends Param
{
	constructor()
	{
		super();
		this.p0 = new paper.Point(0,0);
		this.p1 = new paper.Point(100,0);
		this.p2 = new paper.Point(100,100);
	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputPointArray();
	}

	getValue(outputName = "")
	{
		super._processParams();
		return [this.p0,this.p1,this.p2];
	}
}