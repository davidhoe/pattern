

import {IntParam} from '../model/param/IntParam'
import {IntSelectFromArrayParam} from '../model/param/IntSelectFromArrayParam'
import {ColourParam} from '../model/param/ColourParam'
import {ColourSelectFromSetParam} from '../model/param/ColourSelectFromSetParam'
import {ColourSelectRandomFromSetParam} from '../model/param/ColourSelectRandomFromSetParam'
import * as model from '../model/model'
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
            this.colset =utils.ColourUtils.GetSeededRandomColourset();
        else
            this.colset = colourset;
        //  console.log(colset);

	  this.drawQuadShapeTest();
	  // this.drawTrianglesTest();
	   //this.drawQuadTest();
    }


    drawQuadShapeTest()
    {
	    var screenRect = new paper.Rectangle(200,200,700,500);
	    model.PatternState.Instance().bound = screenRect;

	    model.PatternState.Instance().path = utils.PointUtils.CreateRectPoints(new paper.Rectangle(200,200,300,300));

	    var startnode =  new model.ColourNode(new paper.Color(1)).push();
	    var temp = new model.FillNode().push();
	    //new model.QuadToQuarterCircleNode().push();
	    //var n = 1;
	    //for(var i =0; i < n;++i ) {
		   // model.PatternState.Instance().headNode = temp;
		  //  new model.QuadToQuarterCircleNode().push();
	      // new model.QuadToDiagonalLeafNode(/*0.552* (1 - i/n)*/).push();
	     //   new model.QuadToCircleNode().push();
	    new model.QuadToSCurveNode().push();

	    new model.RandomColourFromSetNode(this.colset).push();
		    new model.FillNode({"selected": true}).push();
	    //}
	    startnode.process();
    }

	drawQuadTest()
	{
		var screenRect = new paper.Rectangle(200,200,700,500);
		model.PatternState.Instance().bound = screenRect;

		//model.PatternState.Instance().path = utils.PointUtils.CreateRectPoints(new paper.Rectangle(200,200,300,300));

		var angle = -20;
		var shapeSize = new paper.Size(200,200);
		var gridnode = new model.RectGridNode(angle,shapeSize);

		var colparam1 = new ColourSelectRandomFromSetParam(this.colset );
		var colparam2 = new ColourSelectRandomFromSetParam(this.colset );

		var col1save = new model.ParamSaveNode(colparam1);
		var col2save = new model.ParamSaveNode(colparam2);

		var col1 = new model.ColourNode();
	//	col1.setParam("colour", colparam1);
		col1.setParam("colour", col1save.getSavedParam());
		var col2 = new model.ColourNode();
	//	col2.setParam("colour", colparam2);
		col2.setParam("colour", col2save.getSavedParam());

		var subgrid = new model.QuadSubdivisionNode(2, 2);
		var subgrid2 = new model.QuadSubdivisionNode(1, 2);
		var colournode = new model.RandomColourFromSetNode(this.colset);
		var fillnode = new model.FillNode();
		var rotate = new model.RotatePathIndexNode(1);
		var scaleQuad = new model.QuadScaleNode(0.8);
		var leftrect = new paper.Rectangle(0,0,0.4,1);
		var leftSubQuad = new model.QuadToSubQuadNode(utils.PointUtils.CreateRectPoints(leftrect));
		var rightrect = new paper.Rectangle(0.6,0,0.4,1);
		var rightSubQuad = new model.QuadToSubQuadNode(utils.PointUtils.CreateRectPoints(rightrect));

		var startnode  =col1save.push();
		col2save.push();
		gridnode.push();
		subgrid.push();
		subgrid.addChildToIndex(col1,0);
		subgrid.addChildToIndex(col1,3);
		subgrid.addChildToIndex(col2,1);
		subgrid.addChildToIndex(col2,2);

		model.PatternState.Instance().headNode = col1;
		var copynode = scaleQuad.push();
		leftSubQuad.push();
		fillnode.push();
		scaleQuad.addChild(rightSubQuad);
		rightSubQuad.addChild(fillnode);

		model.PatternState.Instance().headNode = col2;
		rotate.push();
		copynode.push();

		startnode.process();
	}

    drawTrianglesTest()
    {
        var screenRect = new paper.Rectangle(200,200,700,500);

        model.PatternState.Instance().bound = screenRect;

        var angle = -45;
        var shapeSize = new paper.Size(100,100);
        var gridnode = new model.RectGridNode(angle,shapeSize);
        var subdivide = new model.TriSubdivisionNode(3);
        var colournode = new model.RandomColourFromSetNode(this.colset);
        var fillnode = new model.FillNode();
        var trislice = new model.TriSliceNode(0.1,0.5,5);
        var quadToTri = new model.QuadToTriNode();
	    var quadToTri2 = new model.QuadToTriNode();
	    var rotate = new model.RotatePathIndexNode(2);
	    rotate.setParam("shift", new IntSelectFromArrayParam([0,1,2,3],1));

	    var colournode2 = new model.RandomColourFromSetNode(this.colset);
	    var fillnode2 = new model.FillNode();

	    gridnode.push();

	    model.PatternState.Instance().headNode = gridnode;
	    colournode2.push();
	    fillnode2.push();

	    model.PatternState.Instance().headNode = gridnode;
	    colournode.push();
	    rotate.push();
	    quadToTri.push();
	    fillnode.push();

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