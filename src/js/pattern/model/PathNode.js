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
    constructor(path) // todo allow null
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
            PatternState.Instance().path = this.path;
        }
    }
}
