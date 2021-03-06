/**
 * Created by David on 27/02/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import paper from 'paper'
import {BLEND_MODE} from './model'
import * as editor from './editor/editor'

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
        this._shapeAtts = shapeAtts; // all other
    }

	getEditorDefinition()
	{
		var def =  super.getEditorDefinition();
		def.addInputStringSelectDropdown("blendMode", null, BLEND_MODE);
		console.log("---fillnode getEditorDefinition ", def);
		return def;
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

	// override this for the stroke node
	setShapeParams(shape)
	{
		shape.fillColor = PatternState.Instance().colour;
	}

    process()
    {
	    //console.log(PatternState.Instance().path);
        var shape = new paper.Path(PatternState.Instance().path);
        var parentGroup = PatternState.Instance().group;
        if(parentGroup != null)
        {
            parentGroup.addChild(shape);
        }
        shape.clipMask = this.clipMask;
        shape.opacity = this.opacity;
        shape.blendMode = this.blendMode;
	    if(PatternState.Instance().path.length > 2) {
		    shape.closed = true;
	    }
	    this.setShapeParams(shape);

        shape.applyMatrix = true;
        shape.pivot = new paper.Point(0,0);

        shape.matrix = PatternState.Instance().matrix.clone();

        if(this._shapeAtts != null)
        {
            for (var key in this._shapeAtts) {
                if (this._shapeAtts.hasOwnProperty(key)) {
                    //console.log("shape att", key , "val", this.shapeAtts[key]);
                    shape[key] = this._shapeAtts[key];
                }
            }
        }
    //    PatternState.Instance().colour = this.colour;
        super.processChildNodes();
    }

}