/**
 * Created by davidhoe on 28/02/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * choose 1 of X children to process, this is defined by choiceIndex
 */
export class DecisionNode extends Node
{
    constructor(choiceIndex)
    {
        super();
        // public
        this.choiceIndex = choiceIndex;
    }

    process()
    {
        super._processParams();
        if(this.choiceIndex >= this._childNodes.length) {
            console.error("choice index is out of bounds,choiceIndex: " ,this.choiceIndex );
            return;
        }
        var childnode = this._childNodes[this.choiceIndex];
        childnode.process();
    }
}
