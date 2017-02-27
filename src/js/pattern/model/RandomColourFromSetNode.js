/**
 * Created by David on 27/02/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import paper from 'paper'
import {ColourUtils} from '../util/ColourUtils'

/**
 *
 */
export class RandomColourFromSetNode extends Node
{
    constructor(colourset)
    {
        super();
        this.colourset = colourset;
    }

    process()
    {
        PatternState.Instance().colour = ColourUtils.GetRandomColourInSet(this.colourset);
        super.processChildNodes();
    }
}