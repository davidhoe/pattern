import {ColourUtils} from '../util/ColourUtils.js'
import {MathUtils} from '../util/MathUtils.js'
import {FillUtils} from '../util/FillUtils.js'
import {PathUtils} from '../util/PathUtils.js'
import {ItemUtils} from '../util/ItemUtils.js'
import {RectGridUtils} from '../util/RectGridUtils.js'
import {TriGridUtils} from '../util/TriGridUtils.js'
import {DiamondGridUtils} from '../util/DiamondGridUtils.js'
import {HexGridUtils} from '../util/HexGridUtils.js'

import paper from 'paper'

export class TriGrid1
{

    constructor() {
        this.globalgroup = null;
        this.ready = false;
        this.frameIndex = 0;

        this.w = 1200;
        this.h = 600;
        this.colset;
    }

    /// test grid helper method get all the rectangles
    getRectGrid(nh, cellRatio, bound)
    {
        var cellw, cellh;
        // calculate the  cellw,cellh
        cellh = bound.height / nh;
        cellw = cellRatio*cellh;

        // calculate the number of cells wide
        var nw  =  Math.ceil( bound.width / cellw );

        // calculate the offset to center it
        var offsetx = ( nw*cellw - bound.width ) / 2;

        // calculate rectangles
        var x,y;
        var rects = [];
        for(var j = 0; j < nh; ++j)
        {
            y = bound.y + j*cellh;
            for(var i = 0; i < nw; ++i) {
                x = -offsetx + bound.x + i*cellw;
                rects.push(new paper.Rectangle(x,y,cellw,cellh));
            }
        }
        return rects;
    }


    test()
    {
        // test create something
       // var bgcol = ColourUtils.GetSeededRandomColourInSet(this.colset);
        this.testITem = new paper.Group();

        var group = new paper.Group();

        var path = paper.Path.Rectangle(new paper.Rectangle(0,0,100,100), 0);
        //bgpath.fillColor = bgcol;
        path.fillColor = 'black';

        group.addChild(path);
        this.testITem.addChild(group);

        this.testITem.remove();

    }

    testDestroy()
    {

    }

    init(colourset)
    {
        //this.destroy();

        if(!colourset)
            this.colset = ColourUtils.GetSeededRandomColourset();
        else
            this.colset = colourset;
        //  console.log(colset);


        // random bg

        this.drawUpdate();

        //bgpath.remove();

    }

    destroy()
    {
        if(this.globalgroup) {
            // todo remove all items
            this.globalgroup.remove();
            //ItemUtils.RemoveChildrenRecursive(this.globalgroup);
           // this.globalgroup = null;
        }
    }
    drawUpdate()
    {

        var x,y;
        var col;
        var xgap = 150;
        var ygap = 150;
        var ni  = this.w/xgap;
        var nj  = this. h/ygap;

        var screenw = screen.width;
        var screenh =  screen.height;
        console.log("Screen Width: " + screenw);
        console.log("Screen Height: " + screenh);

        //var screenRect = new paper.Rectangle(0,0,screenw,screenh);
        var screenRect = new paper.Rectangle(200,200,700,500);

        // make a bg
        var bgcol = ColourUtils.GetSeededRandomColourInSet(this.colset);
        var bgpath = new paper.Path.Rectangle(screenRect);
        bgpath.fillColor = bgcol;
        bgpath.pivot = new paper.Point(0,0);
        bgpath.position = new paper.Point(0,0);


        this.globalgroup  = new paper.Group();
        this.globalgroup.pivot = new paper.Point(0,0);

       // var shapes = this.getRectGrid(10, 1,screenRect );
        var angle = 10;
        var shapeSize = new paper.Size(100,100);
        //var shapes = RectGridUtils.CreateGrid(screenRect, angle, shapeSize);
        //var shapes = TriGridUtils.CreateGrid(screenRect, angle, shapeSize);
        //var shapes = DiamondGridUtils.CreateGrid(screenRect, angle, shapeSize);
        var shapes = HexGridUtils.CreateGrid(screenRect, angle, shapeSize);


        for (var i = 0; i < shapes.length; i++) {
          //  x  = (i)*xgap ;

                var c0 = ColourUtils.GetSeededRandomColourInSet(this.colset);
                var c1 = ColourUtils.GetSeededRandomColourInSet(this.colset);
                var c = ColourUtils.BlendColours(c0,c1, MathUtils.GetSeededRandomFloat());
                var thickness =  MathUtils.GetSeededRandomFloat(0.5,2.5);

                var radius  = MathUtils.GetSeededRandomFloat(10,40);

                //var p = new paper.Point(x,y);

                var rectPoints = shapes[i]; // new paper.Rectangle(0,0,xgap,ygap);

                var rectbg = new paper.Path({
                    strokeColor: 'black',
                    closed: true
                });
                rectbg.addSegments(rectPoints);

                //var baserect = new paper.Rectangle(0,0,rect.width, rect.height);

//                var rectbg = new paper.Path.Rectangle( baserect);
                rectbg.fillColor = c0;

               // var group = new paper.Group(rectbg);
                /*
                var cornerix  = MathUtils.GetSeededRandomIntBetween(0,3);
                if(MathUtils.GetSeededRandomFloat()< 1.0)
                {
                    // create a  triangle facing a random corner
                    var tri = PathUtils.rightAngleTriangle(baserect, cornerix);
                    tri.fillColor = c1;
                    group.addChild(tri);
                    tri.pivot = new paper.Point(0,0); // set pivot first before point, if not pivot is set then its the center of items bounds rect
                    tri.position = new paper.Point(0,0);

                }
                else{
                    // test tri masked image
                    var tri = PathUtils.rightAngleTriangle(baserect, cornerix);
                    tri.fillColor = c1;

                    var raster = new paper.Raster('Patter/texture/wood1.jpg');
                    var texscale=  1;

                    raster.width = texscale* rect.width;
                    raster.height = texscale* rect.height;
                    raster.pivot = new paper.Point(-raster.width/2,-raster.height/2);
                    raster.position = new paper.Point(0,0);

                    var trigroup = new paper.Group(tri,raster);
                    trigroup.clipMask = true;
                    //trigroup.pivot = new Point(0,0);
                    //trigroup.position = new Point(0,0);

                    group.addChild(trigroup);
                }
                */
           // group.pivot = new paper.Point(0,0);
           // group.position = new paper.Point(rect.x, rect.y);





        }
        //globalgroup.rotation = 45;

        this.globalgroup.pivot = new paper.Point(0,0);
        this.globalgroup.position = new paper.Point(0,0);


        // debug draw outline
        var debugoutline = new paper.Path.Rectangle(screenRect);
        debugoutline.strokeColor = 'black';


   //     this.globalgroup.matrix.rotate(45);


        // this.globalgroup.remove();

    }

}