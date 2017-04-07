import {Preview} from './Preview'
import paper from 'paper'
import * as model from '../model/model'


export class SVGRenderer
{
    constructor(canvas)
    {
       // super();
        this.canvas = canvas;
        canvas.activate();
        this.nodeLayer  = new paper.Layer();
    }

    // todo freeze the random seed - reset it?
    createSVG(node, canvasSize)
    {
        console.log("!!!!! createSVG canvasSize ", canvasSize);
        this.canvas.activate();
        this.nodeLayer.activate();
        this.nodeLayer.removeChildren();
        model.PatternState.Instance().reset();

        // transform the canvas dimension to fit the preview frame bound
        // scale to fit?
        var topleft = new paper.Point(0,0);
        //var scale = new paper.Point(frameRect.width/  ,1);
        var scale = new paper.Point(1,1);
        //var scale = new paper.Point(frameRect.width/canvasSize.width,frameRect.height/canvasSize.height);
        model.PatternState.Instance().setInitialTransform(topleft, scale);
        //console.log("startnode" , startnode);
        node.process();
        //readValuesTest();

        //--------------------------
        this.canvas.width = canvasSize.width;
        this.canvas.height = canvasSize.height;

        // save to file
        console.log("svg save");
        var svg = this.canvas.exportSVG({asString: true});
        var blob = new Blob([svg], {type: "image/svg+xml;charset=utf-8"});
        saveAs(blob, 'image.svg');

    }
}