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
		this.scale = 1.0;
		this._shapeAtts = {};
	}

	process()
	{
		this._processParams();

		/// center scale points
		var midp = utils.PointUtils.LerpPoint(this.p0,this.p1, 0.5);
		var scaled_p0 = new paper.Point( this.scale*(this.p0.x - midp.x) + midp.x, this.scale*(this.p0.y - midp.y) + midp.y );
		var scaled_p1 = new paper.Point( this.scale*(this.p1.x - midp.x) + midp.x, this.scale*(this.p1.y - midp.y) + midp.y );

		this._shapeAtts['fillColor'] =  utils.FillUtils.createLineGradient(scaled_p0,scaled_p1,this.col0, this.col1);
		super.process();
	}


}