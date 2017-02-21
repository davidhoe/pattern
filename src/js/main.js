import paper from 'paper'
import {MathUtils} from './pattern/util/MathUtils';
import {ColourUtils} from './pattern/util/ColourUtils';

//import {Circles2} from './pattern/Circles2';
//import {Lines} from './pattern/Lines';
//import {TriGrid2} from './pattern/TriGrid2';
//import {TriGrid1} from './pattern/TriGrid1';
import * as renderers from './pattern/renderer/PatternRenderers'

//import $ from 'jquery'


///paper.paper.install(window);

// Get a reference to the canvas object
var canvas = document.getElementById('canvas');
// Create an empty project and a view for the canvas:
paper.paper.setup(canvas);

ColourUtils.Instance().loadColoursets(init);

function init()
{
    MathUtils.SetSeed(12);
    console.log("ran0 " + MathUtils.GetSeededRandomFloat(0,1));
    console.log("ran1 " + MathUtils.GetSeededRandomFloat(0,1));


    //colours loaded
    //new Circles2().init();
  //  new Lines().init()
    new renderers.TriGrid1().init() ;
}


paper.view.onFrame = function(event) {
    // On each frame, rotate the path by 3 degrees:
  //  path.rotate(3);
    //console.log("frame");
}