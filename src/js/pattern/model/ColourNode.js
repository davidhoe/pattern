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
    constructor()
    {
        super();
        this.colour = new paper.Color(1);
    }

    process()
    {
        PatternState.Instance().colour = this.colour;
        super.processChildNodes();
    }
}