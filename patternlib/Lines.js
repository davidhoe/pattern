import {ColourUtils} from './ColourUtils.js'
import {MathUtils} from './MathUtils.js'
import {FillUtils} from './FillUtils.js'

import paper from 'paper'

export class Lines
{

    constructor() {
        this.ready = false;
        this.frameIndex = 0;

        this.w = 3440;
        this.h = 1440;
        //this.colset;
    }


    init() {
        var colset = ColourUtils.GetRandomColourset();
        console.log(colset);

        //var mousePoint = view.center;
        var amount = 7000;
        // var colors = ['red', 'white', 'blue', 'white'];

        var w = 3440;
        var h = 1440;

        // random bg
        var bgcol = ColourUtils.GetRandomColourInSet(colset);
        var bgpath = new paper.Path.Rectangle(new paper.Rectangle(0, 0, w, h), 0);
        //bgpath.fillColor = bgcol;
        bgpath.fillColor = 'black';

        var x, y;
        var col;
        for (var i = 0; i < amount; i++) {

            var c0 = ColourUtils.GetRandomColourInSet(colset);
            var c1 = ColourUtils.GetRandomColourInSet(colset);
            var c = ColourUtils.BlendColours(c0, c1, Math.random());

            x = w * Math.random();
            var from = new paper.Point(x, 0);
            x += (0.43 * w) * (2 * Math.random() - 1);
            var to = new paper.Point(x, h);


            var thickness = 1 + Math.random() * 8;


            // shadow
            var shadowalpha = 0.0 + Math.random() * 0.5;
            var spath = new paper.Path.Line(from + new paper.Point(5 + Math.random() * 10, 0), to + new paper.Point(0 + Math.random() * 0, 0));
            /*
             var sfirstSegment = new Segment(from+ Math.random()*10, null, handleOut);
             var ssecondSegment = new Segment(to+ Math.random()*5, handleIn, null);
             var spath = new Path(sfirstSegment, ssecondSegment);
             */
            spath.strokeColor = new paper.Color(0, 0, 0, shadowalpha);
            spath.strokeWidth = thickness;


            // straight line
            var path = new paper.Path.Line(from, to);

            /*
             // curved line
             var handleIn = new paper.Point(0, -h*0.33);
             var handleOut = new paper.Point( (to.x - from.x )*0.1 , h*0.33);
             var firstSegment = new Segment(from, null, handleOut);
             var secondSegment = new Segment(to, handleIn, null);
             var path = new Path(firstSegment, secondSegment);
             */


            // path.strokeColor = c;
            path.strokeColor = FillUtils.createLineGradient(from, to, Math.random() < 0.3 ? new paper.Color(0) : c1, Math.random() < 0.95 ? new paper.Color(0) : c1);

            path.strokeWidth = thickness;

        }
    }


}