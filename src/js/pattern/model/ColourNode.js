/**
 * Created by David on 27/02/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import paper from 'paper'

/**
 * grid node that uses the bound state
 */
export class ColourNode extends Node
{
    constructor(colour = null)
    {
        super();
        this.colour = (colour  == null) ? new paper.Color(0) : colour ;
    }

    process()
    {
        super._processParams();
        PatternState.Instance().colour = this.colour;
        super.processChildNodes();
    }
}