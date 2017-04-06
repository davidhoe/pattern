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
import {Frame18x24Preview} from './pattern/preview/Frame18x24Preview'


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


var offscreenCanvas = document.createElement("canvas");
offscreenCanvas.id = "offscreenCanvas";
offscreenCanvas.width = 500;
offscreenCanvas.height=800;
var offscreenProject = new paper.Project(offscreenCanvas);

var canvas = new paper.Project('canvas');
var canvasUI = new paper.Project('canvasUI');

var nodeEditorApp = new nodeui.NodeEditorApp(canvasUI);
nodeEditorApp.onModelUpdated = function(startnode, canvasSize)
{



    //renderLayer.activate();

    // create new seed
    MathUtils.SetSeed(MathUtils.GetRandomIntBetween(0,100000));
    /*
     canvas.activate();
     renderLayer.removeChildren();
    model.PatternState.Instance().reset();
    console.log("startnode" , startnode);
    startnode.process();
*/
    frame18x24Preview.setNodeTree(startnode, canvasSize);

    readValuesTest();

    $(paramsContainer).hide();

}


// todo move this to the editor
// test save as svg, should be relative to 0,0 with dimension set as to the canvss size
$( "#svgbutton" ).click(function() {

    // todo generate a separate node tree

    // use the generated nodes from the preview?
    offscreenProject.addLayer(frame18x24Preview.nodeLayer);
    // todo reference the canvas editor size
    offscreenCanvas.width = model.PatternState.Instance().canvasSize.width;
    offscreenCanvas.height = model.PatternState.Instance().canvasSize.height;

    console.log("svg save");
    var svg = offscreenProject.exportSVG({asString: true});
    var blob = new Blob([svg], {type: "image/svg+xml;charset=utf-8"});
    saveAs(blob, 'image.svg');



  //  alert( "Handler for .click() called." );
});

$( "#imagebutton" ).click(function() {
    console.log("image save");
    //  alert( "Handler for .click() called." );
});


//colourUIproject.activate();
canvas.activate();
var renderLayer = new paper.Layer();
var colourTrayLayer = new paper.Layer();

var frame18x24Preview = new Frame18x24Preview(canvas);

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

    //nodeEditorApp.maketestNodes();
    //nodeEditorApp.testparse();
    nodeEditorApp.canvas.loadFromFile("assets/nodetree02.json");

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