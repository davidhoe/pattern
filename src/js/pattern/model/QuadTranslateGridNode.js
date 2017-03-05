/**
 * Created by David on 05/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * create a repeat grid of matrix translations
 */
export class QuadTranslateGridNode extends Node
{
	constructor(nrows = 1, ncols = 1)
	{
		super();
		this.nrows = nrows;
		this.ncols = ncols;
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
		var points = PointUtils.GetPointGridInQuadSpace(this.nrows,this.ncols, PatternState.Instance().path);
		var mat = new paper.Matrix();
		var statemat = PatternState.Instance().matrix;

		for(var i =0; i < points.length;++i)
		{
			mat.reset();
			mat.translate(points[i]);
			PatternState.Instance().matrix = statemat.appended(mat);
			super.processChildNodes();
		}
		super._restoreStateMatrix();
	}
}
