/**
 * Created by davidhoe on 28/02/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * applies a given path to the PatternState
 */
export class PathNode extends Node
{
    constructor(path = [new paper.Point(0,0), new paper.Point(0,1), new paper.Point(1,1)]) // todo allow null
    {
        super();
        // public
        this.path = path;
    }

    process()
    {
        super._processParams();
        if(this.path)
        {
            super._saveStatePath();
            PatternState.Instance().path = this.path;
         //   console.log("^^^ PathNode. path", this.path);
            super.processChildNodes();
            super._restoreStatePath();
        }
    }
}
