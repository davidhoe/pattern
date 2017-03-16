/**
 * Created by davidhoe on 16/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 *  if bool is true, then process IfNode else process Then
 */
export class IfThenNode extends Node
{
    constructor(n)
    {
        super();
        // public
        this.bool = true;

    }

    process()
    {
        super._processParams();
        if(this.bool)
        {
            if(this.childNodes.length > 0)
            {
                this.childNodes[0].process();
            }
        }
        else{
            if(this.childNodes.length > 1)
            {
                this.childNodes[1].process();
            }
        }
    }
}
