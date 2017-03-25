/**
 * Created by David on 27/02/2017.
 */

import {FillNode} from './FillNode'
import {PatternState} from './PatternState'
import paper from 'paper'
import {BLEND_MODE} from './model'
import * as editor from './editor/editor'
import * as utils from '../util/utils'

/**
 *
 */
export class FillGradientNode extends FillNode
{
	//http://paperjs.org/reference/group/#blendmode

	constructor(col0= new paper.Color(),col1= new paper.Color(1), shapeAtts = null)
	{
		super(shapeAtts);
		this.col0 = col0;
		this.col1 = col1;
		this.p0 = new paper.Point(0,0);
		this.p1 = new paper.Point(500,500);
		this._shapeAtts = {};
	}

	process()
	{
		this._processParams();
		this._shapeAtts['fillColor'] =  utils.FillUtils.createLineGradient(this.p0,this.p1,this.col0, this.col1);
		super.process();
	}


}