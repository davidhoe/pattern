import {ColourUtils} from './ColourUtils.js'
import {MathUtils} from './MathUtils.js'
import {FillUtils} from './FillUtils.js'
import {PathUtils} from './PathUtils.js'

import paper from 'paper'

export class TriGrid2
{

    constructor() {
        this.ready = false;
        this.frameIndex = 0;

        this.w = 600;
        this.h = 600;
        this.colset;
    }


    init()
    {
        this.colset = ColourUtils.GetRandomColourset();
        //  console.log(colset);

        // random bg
        var bgcol = ColourUtils.GetRandomColourInSet(this.colset);
        var bgpath = new paper.Path.Rectangle(new paper.Rectangle(0,0,this.w,this.h), 0);
        bgpath.fillColor = bgcol;
        bgpath.fillColor = 'white';

        this.drawUpdate();
    }

    drawUpdate()
    {

        var x,y;
        var col;
        var xgap = 150;
        var ygap = 150;
        var ni  = this.w/xgap;
        var nj  = this. h/ygap;


        var globalgroup  = new paper.Group();

        for (var i = 0; i < ni; i++) {
            x  = (i)*xgap ;


            for (var j = 0; j < nj; j++) {
                y  = j*ygap;
                //if(i % 2) y += 0.5*ygap;


                var c0 = ColourUtils.GetRandomColourInSet(this.colset);
                var c1 = ColourUtils.GetRandomColourInSet(this.colset);
                var c = ColourUtils.BlendColours(c0,c1, Math.random());
                var thickness = MathUtils.GetRandomFloat(0.5,2.5);

                var radius  = MathUtils.GetRandomFloat(10,40);

                var p = new paper.Point(x,y);

                var rect = new paper.Rectangle(0,0,xgap,ygap);

                var rectbg = new paper.Shape.Rectangle(rect);
                rectbg.fillColor = c0;
                rectbg.strokeColor = c0;
                rectbg.strokeWidth = 0.5;
                var group = new paper.Group(rectbg);

                var cornerix  = MathUtils.GetRandomIntBetween(0,1)*2;
                if(Math.random()< 0.4)
                {
                    var tri =  PathUtils.rightAngleTriangle(rect, cornerix);
                    tri.fillColor = c1;
                    tri.strokeColor = c1;
                    tri.strokeWidth = 0.5;
                    group.addChild(tri);
                    tri.pivot = new paper.Point(0,0); // set pivot first before paper.Point, if not pivot is set then its the center of items bounds rect
                    tri.position = new paper.Point(0,0);
                    group.pivot = new paper.Point(0,0);
                    group.position = p;

                }
                else{
                    // test tri masked image
                    var tri = PathUtils.rightAngleTriangle(rect, cornerix);
                    tri.fillColor = c1;
                    tri.strokeColor = c1;
                    tri.strokeWidth = 1;
                    var raster = new paper.Raster('Pattern/texture/wood1.jpg');
                    var texscale=  1;

                    raster.width = texscale* rect.width + 1;
                    raster.height = texscale* rect.height + 0.5;
                    raster.pivot = new paper.Point(-raster.width/2,-raster.height/2);
                    raster.position = new paper.Point(0,0);

                    var trigroup = new paper.Group(tri,raster);
                    trigroup.clipMask = true;
                    //trigroup.pivot = new paper.Point(0,0);
                    //trigroup.position = new paper.Point(0,0);

                    group.addChild(trigroup);


                    group.pivot = new paper.Point(0,0);
                    group.position = p;


                }


                globalgroup.addChild(group);


            }

        }
        globalgroup.matrix.rotate(45);
        globalgroup.matrix.scale(1,1.3);
        globalgroup.position = new paper.Point(600,600);

    }

}