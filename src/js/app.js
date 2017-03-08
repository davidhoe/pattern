import paper from 'paper'
import {MathUtils} from './pattern/util/MathUtils';
import {ColourUtils} from './pattern/util/ColourUtils';
import * as nodeui from './pattern/nodeui/nodeui';
import $ from 'jquery'
//import {Circles2} from './pattern/Circles2';
//import {Lines} from './pattern/Lines';
//import {TriGrid2} from './pattern/TriGrid2';
//import {TriGrid1} from './pattern/TriGrid1';
import * as renderers from './pattern/renderer/PatternRenderers'
import * as model from './pattern/model/model'

import {ColourButton} from './pattern/colourui/ColourButton'
//import $ from 'jquery'

///paper.paper.install(window);

// Get a reference to the canvas object
var canvas = document.getElementById('canvas');
// Create an empty project and a view for the canvas:

var mypaper = new paper.PaperScope();
mypaper.setup(canvas);
//mypaper.view.zoom = 2;
mypaper.activate();
//paper.paper.setup(canvas);
//paper.paper = paper;

var currentRender = null;
// model
var selectedColourset = null;


var canvas = new paper.Project('canvas');
var canvasUI = new paper.Project('canvasUI');

var nodeEditorApp = new nodeui.NodeEditorApp(canvasUI);
nodeEditorApp.onModelUpdated = function(startnode)
{

    canvas.activate();
    renderLayer.activate();
    // create new seed
    MathUtils.SetSeed(MathUtils.GetRandomIntBetween(0,100000));
    renderLayer.removeChildren();
    model.PatternState.Instance().reset();
    console.log("startnode" , startnode);
    startnode.process();

    readValuesTest();

    $(paramsContainer).hide();

}

//colourUIproject.activate();
canvas.activate();
var renderLayer = new paper.Layer();
var colourTrayLayer = new paper.Layer();

//canvasUI.activate();

console.log("paper.paper", mypaper);

ColourUtils.Instance().loadColoursets(init);




canvasUI.activate();
//var recttest = new paper.Shape.Rectangle(new paper.Rectangle(0,0,100,100));
//recttest.fillColor = 'blue';

canvas.activate();

canvasUI.view.onFrame = function(event) {
	//recttest.rotate(3);
		// On each frame, rotate the path by 3 degrees:
		//  path.rotate(3);
		//console.log("frame");

}
var paramsContainer;


function readValuesTest()
{
    var testval = $('#val1').val();

    //Set
//    $('#txt_name').val(bla);
}


function init()
{
    renderLayer.activate();
    // create new seed

    MathUtils.SetSeed(MathUtils.GetRandomIntBetween(0,100000));
    /*
    renderLayer.removeChildren();
    var node = new model.FillNode();
    node.process();
*/
    nodeEditorApp.test();



/*
    // choose a random colour to start
    selectedColourset = ColourUtils.GetRandomCombinedColourset();
    console.log("1 selected " + selectedColourset);


    MathUtils.SetSeed(13);
    console.log("ran0 " + MathUtils.GetSeededRandomFloat(0,1));
    console.log("ran1 " + MathUtils.GetSeededRandomFloat(0,1));


    //colours loaded
    //new Circles2().init();
  //  new Lines().init()

    // colour button test
    colourTrayLayer.activate();
    for(var i =0; i< 15;++i) {
        var colourset = ColourUtils.GetRandomCombinedColourset();
        var a = new ColourButton(colourset);
        a.group.position = new paper.Point(100, 200 + i*100);
        a.onClick = function(target)
        {
            // remove previous
            console.log("click handler " + target.colourset);
            //currentRender =  new renderers.TriGrid1();
            selectedColourset = target.colourset;
            //init( target.colourset) ;
            drawRender();
            //exportRenderToFile();
        }
    }

    //var colourset = ColourUtils.GetRandomCombinedColourset();
    // = new renderers.TriGrid1() ;
    //pp.test();
    //pp.testDestroy();
    //pp.init(colourset);
   // pp.globalgroup.position.x  = 100;
   // pp.destroy();
    drawRender();  // draw the intial render
   */
}


// test redraw
function drawRender()
{
    renderLayer.activate();
    // create new seed
    MathUtils.SetSeed(MathUtils.GetRandomIntBetween(0,100000));

    renderLayer.removeChildren();

    // add a clip mask
    var screenRect = new paper.Rectangle(0,0,screen.width,screen.height);
    var mask = new paper.Path.Rectangle(screenRect);
    mask.fillColor = 'black';
    renderLayer.clipped = true;

    // test a render type
    if(currentRender)
    {
       // currentRender.destroy();
    }
    currentRender = new renderers.TriGrid1();
    console.log("selectedColoourset " + selectedColourset);
    currentRender.init(selectedColourset);
   // currentRender.globalgroup.position.x = 200;
}


function exportRenderToFile()
{

    var exportRaster = renderLayer.rasterize();
    paper.view.draw();

    exportRaster.canvas.toBlob(function(blob) {
        saveAs(blob, "wallp.png");
        exportRaster.remove();
        paper.view.draw();

    });
}