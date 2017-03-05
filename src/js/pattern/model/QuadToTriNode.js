/**
 * Created by davidhoe on 28/02/2017.
 */

import {QuadToShapeNode} from './QuadToShapeNode'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * converts to a triangle, default is a right angled triangle
 */
export class QuadToTriNode extends QuadToShapeNode
{

	constructor(p0 = null,p1 = null,p2 = null)
    {
        super();
	    if (p0 == null) p0 = new paper.Point(0,0);
	    if (p1 == null) p1 = new paper.Point(1,0);
	    if (p2 == null) p2 = new paper.Point(0,1);
		this.p0 = p0;
	    this.p1 = p1;
	    this.p2 = p2;
	    super.normalisedSegments = [this.p0,this.p1,this.p2];
    }

	process()
	{
		super._processParams();
		this.normalisedSegments = [this.p0,this.p1,this.p2];

		var path = super._getStatePath();
		if(path.length < 4)
		{
			console.error("not enough points in state path, length ", path.length);
			return;
		}
		if(this.normalisedSegments == null)
		{
			console.error("normalisedPoints is null cannot convert");
			return;
		}
		super._saveStatePath();
		var transformedSegments = PointUtils.TransformToQuadSpace(this.normalisedSegments , path);
		PatternState.Instance().path = transformedSegments;

		super.processChildNodes();
		super._restoreStatePath();
	}

}
