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
    constructor(angle = 0, shapeSize = null)
    {
        super();
        // public
        this.angle = angle;
        this.shapeWidth = (shapeSize == null) ? 100 : shapeSize.width;
        this.shapeHeight = (shapeSize == null) ? 100 : shapeSize.height;
    }

    process()
    {
        this._processParams();
        var shapes = GridUtils.CreateGrid(PatternState.Instance().bound, this.angle, new paper.Size(this.shapeWidth, this.shapeHeight));
        // var shapes = RectGridUtils.CreateGrid(PatternState.Instance().bound, this.angle, this.shapeSize);
        for(var i = 0; i < shapes.length  ;i++) {
            //
            PatternState.Instance().path = shapes[i];
            super.processChildNodes();
        }
    }
}