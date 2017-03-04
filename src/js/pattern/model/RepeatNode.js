/**
 * Created by davidhoe on 28/02/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * repeat processing the childnodes n times
 */
export class RepeatNode extends Node
{
    constructor(n)
    {
        super();
        // public
        this.n = n;
    }

    process()
    {
        super._processParams();
        for(var i =0;i < this.n;++i)
        {
            super.processChildNodes();
        }
    }
}
