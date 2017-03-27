/**
 * Created by David on 04/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * used for absolute positioning, e.g create a transform that centers on the initial bounding quad
 */
export class QuadToTranslationNode extends Node
{
    constructor()
    {
        super();
        this.ratio = new paper.Point(0.5,0.5);
    }

    process()
    {
        super._processParams();
        super._saveStateMatrix();
        var mat = new paper.Matrix();

        var points = PatternState.Instance().path;
        var tp = PointUtils.TransformPointToQuadSpace(points, this.ratio);
        mat.translate(tp);
        console.log("QuadToTranslationNode , tp", tp);
        PatternState.Instance().matrix =  PatternState.Instance().matrix.appended(mat);
        super.processChildNodes();
        super._restoreStateMatrix();

    }
}
