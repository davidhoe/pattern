/**
 * Created by davidhoe on 28/02/2017.
 */

import {IterableNode} from './IterableNode'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * repeat processing the childnodes n times
 */
export class RepeatNode extends IterableNode
{
    constructor(n)
    {
        super();
        // public
        this.n = n;
    }

    process()
    {
        for(var i =0;i < this.n;++i)
        {
            this._ix = i;
            super._processParams();
            super.processChildNodes();
        }
    }
}
