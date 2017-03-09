/**
 * Created by David on 05/03/2017.
 */

import {QuadToShapeNode} from './QuadToShapeNode'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'
import * as editor from './editor/editor'

/**
 * quad to a circle
 */
export class QuadToCircleNode  extends QuadToShapeNode
{
	constructor(r = null)
	{
		super();
		this.r = ( r == null) ? 0.55228 /2 : r;
	}

	process()
	{
		this._processParams();
		var points =  PointUtils.CreateNormalisedCircle(this.r);
		this.normalisedSegments = points;
		super.process();
	}

	getEditorDefinition()
	{
		var def = new editor.NodeEditorDefinition("Quad To Circle");
		def.addInputFloat('r');
		return def;
	}
}
