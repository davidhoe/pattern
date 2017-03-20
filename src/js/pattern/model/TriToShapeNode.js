/**
 * Created by davidhoe on 05/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * base class for transforming a normalised set of segments (or points)  to tri space.
 */
export class TriToShapeNode extends Node
{
	constructor(normalisedSegments = null)
	{
		super();
		this._normalisedSegments = normalisedSegments; // these are the points to transform
	}

	setNormalisedSegments(normalisedSegments)
	{
		this._normalisedSegments = normalisedSegments;
	}

	process()
	{
		//super._processParams();
		var path = super._getStatePath();
		if(path.length < 3)
		{
			console.error("not enough points in state path, length ", path.length);
			return;
		}
		if(this._normalisedSegments == null)
		{
			console.error("normalisedSegments is null cannot convert");
			return;
		}
		super._saveStatePath();
		var twolines = [path[0],path[1], path[2], path[0]];
		var transformedSegments = PointUtils.TransformToQuadSpace(this._normalisedSegments , twolines );
		PatternState.Instance().path = transformedSegments;

		super.processChildNodes();
		super._restoreStatePath();
	}

}
