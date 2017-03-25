/**
 * Created by David on 05/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'
import * as editor from './editor/editor'

/**
 * gets the points from state node for further  param processing
 */
export class GetPointsFromStateNode  extends Node
{
	constructor()
	{
		super();
	}

	getValue(outputName = "")
	{
		return  PointUtils.GetControlPointsFromSegments(PatternState.Instance().path);
	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputPointArray("points");
	}
}
