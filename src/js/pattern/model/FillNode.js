/**
 * Created by David on 27/02/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import paper from 'paper'

/**
 *
 */
export class FillNode extends Node
{
    constructor()
    {
        super();
    }

    process()
    {
        var shape = new paper.Path(PatternState.Instance().path);
        shape.closed = true;
        shape.fillColor = PatternState.Instance().colour;
    //    PatternState.Instance().colour = this.colour;
        super.processChildNodes();
    }
}