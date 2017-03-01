/**
 * Created by davidhoe on 28/02/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * converts to a triangle
 */
export class QuadToTriNode extends Node
{

	constructor()
    {
        super();
    }

	process()
	{
		var path = super._getStatePath();
		if(path.length >= 3)
		{
			super._saveStatePath();
			PatternState.Instance().path = QuadToTriNode.GetTri(path);
			super.processChildNodes();
			super._restoreStatePath();
		}
	}

	static GetTri(points)
	{
		return [points[0], points[1],points[3]];
	}

}
