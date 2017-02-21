import {ColourUtils} from '../util/ColourUtils.js'
import {MathUtils} from '../util/MathUtils.js'
import paper from 'paper'

export class Circles2
{

    constructor() {
        this.ready = false;
        this.frameIndex = 0;

        this.w = 3440;
        this.h = 1440;
        this.colset;
    }

    init()
    {
        this.ready = true;

       // console.log("here " + ColourUtils.Instance().coloursets.length);

        this.colset = ColourUtils.GetRandomColourset();
        //  console.log(colset);

        // random bg
        var bgcol = ColourUtils.GetRandomColourInSet(this.colset);
        var bgpath = new paper.Path.Rectangle(new paper.Rectangle(0,0,this.w,this.h), 0);
        bgpath.fillColor = bgcol;
        //  bgpath.fillColor = 'white';


 /*
        this.drawUpdate();
    }


    drawUpdate()
    {
*/

        var amount = 1000;

        var x,y;
        var col;
        var xgap = 100;
        var ygap = 100;
        var ni  = this.w/xgap;
        var nj  = this.h/ygap;

        for (var i = 0; i < ni; i++) {
            x  = (i)*xgap ;


            for (var j = 0; j < nj; j++) {
                y  = j*xgap;
                if(i % 2) y += 0.5*ygap;


                var c0 = ColourUtils.GetRandomColourInSet(this.colset);
                var c1 = ColourUtils.GetRandomColourInSet(this.colset);
                var c = ColourUtils.BlendColours(c0,c1, Math.random());
                var thickness =  MathUtils.GetRandomFloat(0.5,2.5);

                var radius  = MathUtils.GetRandomFloat(10,40);

                var p = new paper.Point(x,y);

                //console.log(radius);
                var circle = new paper.Path.Circle(new paper.Point(0,0), radius-1);// make it a bit smaller to  ensure the mask is filled completed
// circle.strokeColor = c1;
                //c.alpha  = 0.0;
                //circle.strokeColor = createCircleGradient(p, radius, c0, c );

                //circle.fillColor = createCircleGradient(p, radius, c0,c1);
                //circle.strokeWidth = thickness;

                //   circle.rotation = Math.random()*360;

                var rectbg = new paper.Shape.Rectangle(new paper.Rectangle(0,0,radius*2,radius*2));
                rectbg.fillColor = c0;
                rectbg.position = new paper.Point(0,0);

                var rect = new paper.Rectangle(0,0,radius*2*MathUtils.GetRandomFloat(0.2,0.8),radius*2);
                var rectbg2 = new paper.Shape.Rectangle(rect);
                rectbg2.fillColor = c;
                rectbg2.position = new paper.Point(-radius + rect.width*.5,0);

                // raster texture test
                var raster = new paper.Raster('Pattern/texture/wood1.jpg');
                var texscale=  4;
                raster.width = texscale*  radius*2;
                raster.height = texscale* radius*2;

                raster.blendMode = 'multiply';
                raster.opacity = 0.8;

                var group = new paper.Group([circle ,rectbg, raster, rectbg2 ]);
                group.clipped = true;
                group.position = p;
                group.rotation = MathUtils.GetRandomFloat(0,360);
                //group.fillColor = new Color(1,1,0,0.01);

            }


        }

    }


}