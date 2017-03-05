/**
 * Created by David on 05/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * applies a translation that centers the path around the center of its bounding box
 */
export class TransformCenterPathNode  extends Node
{
	constructor()
	{
		super();
	}

	process()
	{
		if(PatternState.Instance().path == null)
		{
			console.error("path is null, cannot process");
			return;
		}
		super._processParams();
		super._saveStateMatrix();
		var mat = new paper.Matrix();
		var bound = PointUtils.GetBoundForSegments(PatternState.Instance().path);
		mat.translate(-bound.width*0.5, -bound.height*0.5);
		PatternState.Instance().matrix =  PatternState.Instance().matrix.prepended(mat);
		super.processChildNodes();
		super._restoreStateMatrix();
	}
}
