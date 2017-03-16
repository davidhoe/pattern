

import {IntParam} from '../model/param/IntParam'
import {IntSelectFromArrayParam} from '../model/param/IntSelectFromArrayParam'
import {ColourParam} from '../model/param/ColourRGBParam'
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

	    //console.log("paper project", paper.paper);

        //this.destroy();

        if(!colourset)
            this.colset = utils.ColourUtils.GetSeededRandomColourset();
        else
            this.colset = colourset;
        //  console.log(colset);

		model.PatternState.Instance().reset();

		//  this.compoundPathTest();
	//    this.groupClipTest();
	 //  this.drawQuadShearTest();
	 // this.drawQuadShapeTest();
	 //  this.drawTrianglesTest();
	   this.drawQuadTest();
    }

    // done
    compoundPathTest()
    {

	    var startnode =new model.Node();
	    // make a douhnut shape from 2 circles
	    /*model.PatternState.Instance().headNode = startnode;*/
		startnode.setHead();
	    new model.RandomColourFromSetNode(this.colset);
	    new model.CompoundPathNode().setOpacity(0.5);
	    new model.QuadNode(100,100,500,500);
	    new model.QuadToCircleNode();
	    new model.FillNode();

	    new model.QuadNode(200,200,300,300);
	    new model.QuadToCircleNode();
	    new model.FillNode();

	    // make anoter circle to test grouping
	    //model.PatternState.Instance().headNode = startnode;
	    startnode.setHead();
		new model.RandomColourFromSetNode(this.colset);
	    new model.QuadNode(150,350,300,300);
	    new model.FillNode().setBlendMode(model.BLEND_MODE.overlay);

	    startnode.process();

    }

	// done
	groupClipTest()
	{
		var startnode = new model.GroupNode();

		// make a douhnut shape from 2 circles - use this as the mask
		//model.PatternState.Instance().headNode = startnode;
		startnode.setHead();
		new model.RandomColourFromSetNode(this.colset);
		new model.CompoundPathNode().setClipMask(true).setOpacity(1.0);
		new model.QuadNode(100,100,500,500);
		new model.QuadToCircleNode();
		new model.FillNode();
		new model.RandomColourFromSetNode(this.colset);
		new model.QuadNode(200,200,200,200);
		new model.QuadToCircleNode();
		new model.FillNode();

		// make an object to mask
		//model.PatternState.Instance().headNode = startnode;
		startnode.setHead();
		new model.RandomColourFromSetNode(this.colset);
		new model.QuadNode(150,350,300,300);
		new model.FillNode();
		// make an object to mask
		new model.RandomColourFromSetNode(this.colset);
		new model.QuadNode(150,150,200,100);
		new model.FillNode();

		startnode.process();
	}

	// done
	drawQuadShearTest()
	{

		//var screenRect = new paper.Rectangle(300,200,700,500);
		//model.PatternState.Instance().bound = screenRect;

		var startnode = new model.QuadNode(200,100,500,500);
		new model.QuadTranslateGridNode(3,3);
		new model.QuadNode(0,0,100,100);
		new model.TransformNode().setRotation(45);
		new model.TransformCenterPathNode();


		//new model.TransformNode().setScale(0.5);
		//new model.TransformNode().setTranslation(300,300);
		var subgrid = new model.QuadSubdivisionNode(1,2);
		var left = new model.Node().removeAllParents();
		subgrid.addChildToIndex(left, 0);
		var right = new model.QuadMirrorNode().removeAllParents();
		subgrid.addChildToIndex(right, 1);


		var temp = new model.QuadShearNode(0.3);
		//model.PatternState.Instance().headNode = temp;
		new model.QuadSubdivisionNode(10,1);
		new model.RandomColourFromSetNode(this.colset);
		new model.FillNode();

		left.addChild(temp);
		//right.addChild(temp);

		startnode.process();

		//debug outline
		var debugoutline = new paper.Path.Rectangle(new paper.Rectangle(200,100,500,500));
		debugoutline.strokeColor = 'black';
	}

	// done
    drawQuadShapeTest()
    {

	    var startnode = new model.QuadNode(200,200,300,300);
			new model.ColourNode(new paper.Color(1));
	    var temp = new model.FillNode();
	    //new model.QuadToQuarterCircleNode();
	    //var n = 1;
	    //for(var i =0; i < n;++i ) {
		   // model.PatternState.Instance().headNode = temp;
		  //  new model.QuadToQuarterCircleNode();
	      // new model.QuadToDiagonalLeafNode(/*0.552* (1 - i/n)*/);
	     //   new model.QuadToCircleNode();
	    new model.QuadToSCurveNode();

	    new model.RandomColourFromSetNode(this.colset);
		    new model.FillNode({"selected": true});
	    //}
	    startnode.process();
    }


	// done
	drawQuadTest()
	{
		var screenRect = new paper.Rectangle(200,200,700,500);
		model.PatternState.Instance().bound = screenRect;

		//model.PatternState.Instance().path = utils.PointUtils.CreateRectPoints(new paper.Rectangle(200,200,300,300));

		var angle = -20;
		var shapeSize = new paper.Size(200,200);

		var colparam1 = new ColourSelectRandomFromSetParam(this.colset );
		var colparam2 = new ColourSelectRandomFromSetParam(this.colset );

		var col1save = new model.ParamSaveNode(colparam1);
		var startnode = col1save;
		var col2save = new model.ParamSaveNode(colparam2);
		var gridnode = new model.RectGridNode(angle,shapeSize);
		var subgrid = new model.QuadSubdivisionNode(2, 2);

		var col1 = new model.ColourNode().removeAllParents();
		col1.setParam("colour", col1save.getSavedParam());

		var col2 = new model.ColourNode().removeAllParents();
		col2.setParam("colour", col2save.getSavedParam());

		subgrid.addChildToIndex(col1,0);
		subgrid.addChildToIndex(col1,3);
		subgrid.addChildToIndex(col2,1);
		subgrid.addChildToIndex(col2,2);

		// create the tile
		var scaleQuad  = new model.QuadScaleNode(0.8).removeAllParents();
		var leftrect = new paper.Rectangle(0,0,0.4,1);
		var leftSubQuad = new model.QuadToSubQuadNode(utils.PointUtils.CreateRectPoints(leftrect));
		new model.FillNode();
		scaleQuad.setHead();
		var rightrect = new paper.Rectangle(0.6,0,0.4,1);
		var rightSubQuad = new model.QuadToSubQuadNode(utils.PointUtils.CreateRectPoints(rightrect));
		new model.FillNode();

		// set the tile
		col1.setHead();
		scaleQuad.push();

		// set the tile but rotate it first
		col2.setHead();
		new model.RotatePathIndexNode(1);
		scaleQuad.push();

		startnode.process();
	}

	// done
    drawTrianglesTest()
    {
        var screenRect = new paper.Rectangle(200,200,700,500);
        model.PatternState.Instance().bound = screenRect;

        var angle = -45;
        var shapeSize = new paper.Size(100,100);

		var startnode = new model.RectGridNode(angle,shapeSize);
		new model.RandomColourFromSetNode(this.colset);
		new model.FillNode();

		startnode.setHead();
		new model.RandomColourFromSetNode(this.colset);
		var rotate = new model.RotatePathIndexNode(2);
		new model.QuadToTriNode();
		new model.FillNode();

        // set a random parm on the rotation
	    rotate.setParam("shift", new IntSelectFromArrayParam([0,1,2,3],1));

		startnode.process();

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