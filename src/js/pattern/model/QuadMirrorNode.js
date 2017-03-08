/**
 * Created by David on 05/03/2017.
 */
import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'
import * as editor from './editor/editor'

export class QuadMirrorNode extends Node
{
	constructor()
	{
		super();
	}

	process()
	{
		super._processParams();
		super._saveStatePath();
		PatternState.Instance().path = QuadMirrorNode.CreateMirroredQuadPoints(super._getStatePath());
		super.processChildNodes();
		super._restoreStatePath();
	}

	static CreateMirroredQuadPoints(quadPoints)
	{
		return [quadPoints[1],quadPoints[0],quadPoints[3],quadPoints[2]];
	}

}