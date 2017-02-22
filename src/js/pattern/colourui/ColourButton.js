import {ColourUtils} from "../util/ColourUtils"
import paper from 'paper'

class ColourButton{
    constructor(colourset)
    {
        this.colourset = colourset;
        this.group = new Group();

        var n = colourset.length;
        var p0,p1;
        var a;
        var c = new Point(0,0);
        var radius = 40;
        for(var i = 0; i < n; ++i)
        {
            // create triangle slices making a rough circle
            // this will get masked by an image ontop
            a = i / n * Math.PI * 2.0;
            p0 = new Point( -Math.cos(a) * radius, Math.sin(a) * radius);

            a = (i + 1) / n * Math.PI * 2.0;
            p1 = new Point( -Math.cos(a) * radius, Math.sin(a) * radius);

            var path = new Path(c,p0,p1);
            path.fillColor = this.colourset[i];
            this.group.addChild(path);
        }

        var raster = new Raster("assets/circle_border.png");
        raster.scale(0.75);
        this.group.addChild(raster);
        //return group;
    }



}