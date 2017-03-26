/**
 * Created by David on 27/02/2017.
 */

import {FillNode} from './FillNode'
import {PatternState} from './PatternState'
import paper from 'paper'
import {BLEND_MODE} from './model'
import {STROKE_CAP} from './model'
import {STROKE_JOIN} from './model'

import * as editor from './editor/editor'

/**
 *
 */
export class StrokeNode extends FillNode
{
	//http://paperjs.org/reference/group/#blendmode

	constructor(shapeAtts = null)
	{
		super(shapeAtts);
		this.thickness = 4;
		this.strokeCap = STROKE_CAP.round;
		this.strokeJoin = STROKE_JOIN.round;
	}

	getEditorDefinition()
	{
		var def =  super.getEditorDefinition();
		def.addInputStringSelectDropdown("strokeCap", null, STROKE_CAP);
		def.addInputStringSelectDropdown("strokeJoin", null, STROKE_JOIN);
		return def;
	}

	setShapeParams(shape)
	{
		shape.strokeColor = PatternState.Instance().colour;
		shape.strokeCap = this.strokeCap;
		shape.strokeJoin = this.strokeJoin;
		shape.strokeWidth = this.thickness;
	}



}