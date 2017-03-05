/**
 * Created by David on 27/02/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import paper from 'paper'
import {BLEND_MODE} from './model'

/**
 *
 */
export class FillNode extends Node
{
	//http://paperjs.org/reference/group/#blendmode


    constructor(shapeAtts = null)
    {
        super();
	    this.blendMode = BLEND_MODE.normal;
	    this.opacity = 1;
	    this.clipMask = false;
        this.shapeAtts = shapeAtts; // all other
    }

    // only works if shape is in a group
    setClipMask(isMask)
    {
	    this.clipMask = isMask;
	    return this;
    }

    setBlendMode(blendMode)
    {
	    this.blendMode = blendMode;
	    return this;
    }

	setOpacity(opacity)
	{
		this.opacity = opacity;
		return this;
	}

    process()
    {
	    console.log(PatternState.Instance().path);
        var shape = new paper.Path(PatternState.Instance().path);
        var parentGroup = PatternState.Instance().group;
        if(parentGroup != null)
        {
            parentGroup.addChild(shape);
        }
        shape.clipMask = this.clipMask;
        shape.opacity = this.opacity;
        shape.blendMode = this.blendMode;
        shape.closed = true;
        shape.fillColor = PatternState.Instance().colour;
        shape.strokeColor = 'grey';
        shape.applyMatrix = true;
        shape.pivot = new paper.Point(0,0);
        shape.matrix = PatternState.Instance().matrix.clone();


        if(this.shapeAtts != null)
        {
            for (var key in this.shapeAtts) {
                if (this.shapeAtts.hasOwnProperty(key)) {
                    console.log("shape att", key , "val", this.shapeAtts[key]);
                    shape[key] = this.shapeAtts[key];
                }
            }

        }
    //    PatternState.Instance().colour = this.colour;
        super.processChildNodes();
    }
}