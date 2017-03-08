/**
 * Created by davidhoe on 05/03/2017.
 */


import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import * as editor from './editor/editor'

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
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		//this._quadPoints = ;
		//this.quadPoints = (quadPoints == null ) ? PointUtils.CreateRectPoints(new paper.Rectangle(0,0,1,1)) : quadPoints;
	}

	/*
	getEditorDefinition()
	{
		var def = new editor.NodeEditorDefinition("Quad");
		def.addInputFloat('x');
		def.addInputFloat('y');
		def.addInputFloat('w');
		def.addInputFloat('h');
		return def;
	}*/

	/*
	setQuadPoints(quadPoints)
	{
		this._quadPoints = quadPoints;
		return this;
	}*/

	process()
	{
		super._processParams();
		super._saveStatePath();
		PatternState.Instance().path = PointUtils.CreateRectPoints(new paper.Rectangle(this.x,this.y,this.w,this.h));
		super.processChildNodes();
		super._restoreStatePath();
	}


}
