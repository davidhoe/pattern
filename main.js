import paper from 'paper'
import {MathUtils} from './patternlib/MathUtils';
import {ColourUtils} from './patternlib/ColourUtils';

//import {Circles2} from './patternlib/Circles2';
//import {Lines} from './patternlib/Lines';
//import {TriGrid2} from './patternlib/TriGrid2';
//import {TriGrid1} from './patternlib/TriGrid1';
import * as renderers from './patternlib/PatternRenderers'

//import $ from 'jquery'


///paper.paper.install(window);

// Get a reference to the canvas object
var canvas = document.getElementById('canvas');
// Create an empty project and a view for the canvas:
paper.paper.setup(canvas);

ColourUtils.Instance().loadColoursets(init);

function init()
{
    MathUtils.SetSeed(9);
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