import {Node} from './Node'
import {PatternState} from './PatternState'
import paper from 'paper'

import GridUtils from '../util/RectGridUtils'
//import GridUtils from '../util/DiamondGridUtils'
//import GridUtils from '../util/TriGridUtils'
//import GridUtils from '../util/HexGridUtils'

/**
 * fills a quad area with tiled rects
 */
export class RectGridNode extends Node
{
    constructor(angle,shapeSize)
    {
        super();
        // public
        this.angle = angle;
        this.shapeSize = shapeSize;
    }

    process()
    {
        this._processParams();
        var shapes = GridUtils.CreateGrid(PatternState.Instance().bound, this.angle, this.shapeSize);
        // var shapes = RectGridUtils.CreateGrid(PatternState.Instance().bound, this.angle, this.shapeSize);
        for(var i = 0; i < shapes.length  ;i++) {
            //
            PatternState.Instance().path = shapes[i];
            super.processChildNodes();
        }
    }
}