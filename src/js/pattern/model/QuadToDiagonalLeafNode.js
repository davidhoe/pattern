/**
 * Created by David on 04/03/2017.
 */

import {QuadToShapeNode} from './QuadToShapeNode'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'
import * as editor from './editor/editor'

/**
 * quad to a diagonal leaf
 */
export class QuadToDiagonalLeafNode extends QuadToShapeNode
{
	constructor(r = null)
	{
		super();
		this.r = ( r == null) ? 0.55228 : r;
	}

	process()
	{
		super._processParams();
		this._normalisedSegments = ( PointUtils.CreateNormalisedDiagonalLeaf(this.r));
		super.process();
	}


}
