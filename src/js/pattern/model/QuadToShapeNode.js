/**
 * Created by davidhoe on 05/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * base class for transforming a normalised set of segments (or points)  to quad space.
 */
export class QuadToShapeNode extends Node
{
	constructor(normalisedSegments = null)
	{
		super();
		this.normalisedSegments = normalisedSegments; // these are the points to transform
	}

	setNormalisedSegments(normalisedSegments)
	{
		this.normalisedSegments = normalisedSegments;
	}

	process()
	{
		//super._processParams();
		var path = super._getStatePath();
		if(path.length < 4)
		{
			console.error("not enough points in state path, length ", path.length);
			return;
		}
		if(this.normalisedSegments == null)
		{
			console.error("normalisedSegments is null cannot convert");
			return;
		}
		super._saveStatePath();
		var transformedSegments = PointUtils.TransformToQuadSpace(this.normalisedSegments , path);
		PatternState.Instance().path = transformedSegments;

		super.processChildNodes();
		super._restoreStatePath();
	}

}
