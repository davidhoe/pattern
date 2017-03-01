import {ColourUtils} from '../util/ColourUtils.js'
import {MathUtils} from '../util/MathUtils.js'
import {FillUtils} from '../util/FillUtils.js'
import {PathUtils} from '../util/PathUtils.js'
import {ItemUtils} from '../util/ItemUtils.js'
import {RectGridUtils} from '../util/RectGridUtils.js'
import {TriGridUtils} from '../util/TriGridUtils.js'
import {DiamondGridUtils} from '../util/DiamondGridUtils.js'
import {HexGridUtils} from '../util/HexGridUtils.js'
import {RandomColourFromSetNode} from '../model/RandomColourFromSetNode.js'
import {RectGridNode} from '../model/RectGridNode.js'
import {FillNode} from '../model/FillNode.js'
import {PatternState} from '../model/PatternState.js'
import {TriSubdivisionNode} from '../model/TriSubdivisionNode'
import {TriSliceNode} from '../model/TriSliceNode'
import {QuadToTriNode} from '../model/QuadToTriNode'
import {RotatePathIndexNode} from '../model/RotatePathIndexNode'
import {IntParam} from '../model/int/IntParam'
import {IntArrayParam} from '../model/int/IntArrayParam'


import * as utils from '../util/utils'

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


    init(colourset)
    {
        //this.destroy();

        if(!colourset)
            this.colset = ColourUtils.GetSeededRandomColourset();
        else
            this.colset = colourset;
        //  console.log(colset);

        this.drawUpdate2();
    }

    drawUpdate2()
    {
        var screenRect = new paper.Rectangle(200,200,700,500);

        PatternState.Instance().bound = screenRect;

        var angle = -45;
        var shapeSize = new paper.Size(100,100);
        var gridnode = new RectGridNode(angle,shapeSize);
        var subdivide = new TriSubdivisionNode(3);
        var colournode = new RandomColourFromSetNode(this.colset);
        var fillnode = new FillNode();
        var trislice = new TriSliceNode(0.1,0.5,5);
        var quadToTri = new QuadToTriNode();
	    var quadToTri2 = new QuadToTriNode();
	    var rotate = new RotatePathIndexNode(2);
	    rotate.addParam("shift", new IntArrayParam([0,1,2,3],1));

	    var colournode2 = new RandomColourFromSetNode(this.colset);
	    var fillnode2 = new FillNode();


	    gridnode.push();

	    PatternState.Instance().headNode = gridnode;
	    colournode2.push();
	    fillnode2.push();

	    PatternState.Instance().headNode = gridnode;
	    colournode.push();
	    rotate.push();
	    quadToTri.push();
	    fillnode.push();


	    /*
			PatternState.Instance().headNode = colournode;

			quadToTri2.push();
			fillnode.push();
	*/
	    //trislice.addChild(fillnode);

        gridnode.process();

        //debug outline
        var debugoutline = new paper.Path.Rectangle(screenRect);
        debugoutline.strokeColor = 'black';

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

}