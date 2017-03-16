/**
 * Created by David on 27/02/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import paper from 'paper'
import {BLEND_MODE} from './model'
import * as editor from './editor/editor'
import * as utils from '../util/utils'

/**
 *
 */
export class TextureDrawNode extends Node
{
    //http://paperjs.org/reference/group/#blendmode

    constructor(shapeAtts = null)
    {
        super();
        this.textureix = 0;
        this.blendMode = BLEND_MODE.normal;
        this.opacity = 1;
       // this.clipMask = false;
        this._shapeAtts = shapeAtts; // all other
    }

    getEditorDefinition()
    {
        var def =  super.getEditorDefinition();
        def.addInputStringSelectDropdown("blendMode", null, BLEND_MODE);
      //  console.log("---fillnode getEditorDefinition ", def);
        return def;
    }
/*
    // only works if shape is in a group
    setClipMask(isMask)
    {
        this.clipMask = isMask;
        return this;
    }*/

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
        var url = "js/pattern/asset/texture/wood1.jpg";
        var raster = new paper.Raster(url);
        //console.log(PatternState.Instance().path);
      //  var shape = new paper.Path(PatternState.Instance().path);
        var parentGroup = PatternState.Instance().group;
        if(parentGroup != null)
        {
            parentGroup.addChild(raster);
        }
       // raster.clipMask = this.clipMask;
        raster.opacity = this.opacity;
        raster.blendMode = this.blendMode;

       // shape.fillColor = PatternState.Instance().colour;
       // shape.strokeColor = 'grey';
        raster.applyMatrix = true;
        raster.pivot = new paper.Point(0,0);
        var _this= this;

//        console.log("outside boundPoints ", PatternState.Instance().path);

        // save state outside of the load function
        var boundPoints = PatternState.Instance().path;
        var bound = utils.PointUtils.GetBoundForPoints( boundPoints);

        raster.onLoad = function() {
            // get the shape
            raster.translate(bound.x,bound.y);
           // console.log("boundPoints", boundPoints);

            //console.log("bound", bound);
            var neww  = bound.width;
            var newh = bound.height;
            var mat = PatternState.Instance().matrix.clone();
            //raster.position = new paper.Point(w, h/2);
            mat.translate( neww/2,newh/2);
            mat.translate( bound.x, bound.y);

            raster.width = neww;
            raster.height = newh;
            raster.matrix = mat;
            //raster.matrix = mat;




        }
        /*
        if(this._shapeAtts != null)
        {
            for (var key in this._shapeAtts) {
                if (this._shapeAtts.hasOwnProperty(key)) {
                    //console.log("shape att", key , "val", this.shapeAtts[key]);
                    shape[key] = this._shapeAtts[key];
                }
            }
        }*/

        //    PatternState.Instance().colour = this.colour;
        super.processChildNodes();
    }

}