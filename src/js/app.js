import paper from 'paper'
import {MathUtils} from './pattern/util/MathUtils';
import {ColourUtils} from './pattern/util/ColourUtils';

//import {Circles2} from './pattern/Circles2';
//import {Lines} from './pattern/Lines';
//import {TriGrid2} from './pattern/TriGrid2';
//import {TriGrid1} from './pattern/TriGrid1';
import * as renderers from './pattern/renderer/PatternRenderers'

import {ColourButton} from './pattern/colourui/ColourButton'
//import $ from 'jquery'

///paper.paper.install(window);

// Get a reference to the canvas object
var canvas = document.getElementById('canvas');
// Create an empty project and a view for the canvas:
paper.paper.setup(canvas);

ColourUtils.Instance().loadColoursets(init);

function init()
{
    MathUtils.SetSeed(13);
    console.log("ran0 " + MathUtils.GetSeededRandomFloat(0,1));
    console.log("ran1 " + MathUtils.GetSeededRandomFloat(0,1));


    //colours loaded
    //new Circles2().init();
  //  new Lines().init()

    for(var i =0; i< 15;++i) {
        var colourset = ColourUtils.GetRandomCombinedColourset();
        var a = new ColourButton(colourset);
        a.group.position = new paper.Point(100, 200 + i*100);
        a.onClick = function(target)
        {
            MathUtils.SetSeed(MathUtils.GetRandomIntBetween(0,100000));
            console.log("click handler " + target.colourset);
           new renderers.TriGrid1().init( target.colourset) ;
        }
    }

    var colourset = ColourUtils.GetRandomCombinedColourset();
    var pp = new renderers.TriGrid1() ;
    pp.init(colourset);
    pp.globalgroup.position.x  = 100;

}



paper.view.onFrame = function(event) {
    // On each frame, rotate the path by 3 degrees:
  //  path.rotate(3);
    //console.log("frame");
}