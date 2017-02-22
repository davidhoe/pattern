import {ColourUtils} from "../util/ColourUtils"
import paper from 'paper'

export class ColourButton{
    constructor(colourset) {

        // event
        this.onClick = null;
        this.colourset = null;
        this.group = new paper.Group();
        this.overlay = new paper.Raster("js/pattern/asset/circle_border.png");
        this.overlay.scale(0.65);
        this.group.addChild(this.overlay);

        if(colourset)
        {
            this.setColourset(colourset);
        }

        var scale = 1.1;
        var _this = this;
        this.group.onMouseEnter = function(event) {
            this.scaling =new paper.Point(scale);
        }
        this.group.onMouseLeave = function(event) {
            this.scaling =new paper.Point(1/scale);
        }
        this.group.onMouseDown = function(event) {
            this.opacity = 0.6;
        }
        this.group.onMouseUp = function(event) {
            this.opacity = 1.0;
        }
        this.group.onClick = function(event)
        {
           // console.log("click " + _this.colourset)
            if(_this.onClick)
            {
               _this.onClick(_this);
            }
        }
    }

    setColourset(colourset)
    {
        this.group.removeChildren();
        this.colourset = colourset;
        var n = colourset.length;
        var p0,p1;
        var a;
        var c = new paper.Point(0,0);
        var radius = 40;
        for(var i = 0; i < n; ++i)
        {
            // create triangle slices making a rough circle
            // this will get masked by an image ontop
            a = i / n * Math.PI * 2.0;
            p0 = new paper.Point( -Math.cos(a) * radius, Math.sin(a) * radius);

            a = (i + 1) / n * Math.PI * 2.0;
            p1 = new paper.Point( -Math.cos(a) * radius, Math.sin(a) * radius);

            var path = new paper.Path(c,p0,p1);
            path.fillColor = this.colourset[i];
            this.group.addChild(path);
        }
        this.group.addChild(this.overlay);
    }
    setPosition(p)
    {
        this.group.position = p;
    }
}