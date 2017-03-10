import paper from 'paper'
import ParamNodeView from './ui/ParamNodeView'
import * as util from '../util/utils'
import * as model from '../model/model'
import PatternNodeView from './ui/PatternNodeView'
import NodeEditorCanvas from './ui/NodeEditorCanvas'
import ConnectionLine from './ui/ConnectionLine'

/**
 * main app for the node editor
 */
export default class NodeEditorApp
{
	constructor(project)
	{
		this.onModelUpdated = null;
		this.canvas = new NodeEditorCanvas(project);


		// make a start node
		this.startnode = new PatternNodeView(new model.Node().removeAllParents(), true);
		this.canvas.addPatternNode(this.startnode);
		this.startnode.position.x = 139;
		this.startnode.position.y = 100;

		//this.test();

		// add a button to test refresh
		var _this = this;
		var button = this.makeDebugButton("Refresh", 10, 10);
		button.onClick = function(e) {_this.refreshPattern();}
		var delbutton = this.makeDebugButton("Delete all connections", 70, 10);
		delbutton.onClick = function(e) {_this.canvas.removeAllConnections(); _this.refreshPattern();}
		var delbutton2 = this.makeDebugButton("Delete all nodes", 230, 10);
		delbutton2.onClick = function(e) { _this.canvas.removeAllNodes();}


		console.log("createStartNode", this.startnode);
		this.canvas.onModelUpdated = function(){ _this.refreshPattern()};
	}


	makeDebugButton(label,x = 0,y = 10)
	{
		var group = new paper.Group();
		var text = new paper.PointText(new paper.Point(0, 10));
		group.addChild(text);
		group.position.x = x;
		group.position.y = y;
		this.canvas.nodeLayer.addChild( group);

		text.justification = 'left';
		text.fillColor = 'black';
		text.content =label;
		return group;
	}

	test()
	{
		//make a node
		var param;

		param = new ParamNodeView(new model.FloatParam(2));
		this.canvas.addPatternNode(param);
		param.position.x = 300;
		param.position.y = 350;

		param = new ParamNodeView(new model.IntParam(2));
		this.canvas.addPatternNode(param);
		param.position.x = 350;
		param.position.y = 450;

		param = new ParamNodeView(new model.ColourParam());
		this.canvas.addPatternNode(param);
		param.position.x = 450;
		param.position.y = 550;


		var node2 = new PatternNodeView(new model.QuadNode(50,50,100,100).removeAllParents());
		this.canvas.addPatternNode(node2);
		node2.position.x = 139;
		node2.position.y = 300;

		var node3 = new PatternNodeView(new model.QuadToCircleNode().removeAllParents());
		this.canvas.addPatternNode(node3);
		node3.position.x = 139;
		node3.position.y = 500;

		var node = new PatternNodeView(new model.FillNode().removeAllParents());
		this.canvas.addPatternNode(node);
		node.position.x = 139;
		node.position.y = 650;

		 node = new PatternNodeView(new model.QuadMirrorNode().removeAllParents());
		this.canvas.addPatternNode(node);
		node.position.x = 139;
		node.position.y = 750;


		node = new PatternNodeView(new model.QuadToDiagonalLeafNode().removeAllParents());
		this.canvas.addPatternNode(node);
		node.position.x = 239;
		node.position.y = 750;

		node = new PatternNodeView(new model.RandomColourFromSetNode(util.ColourUtils.GetRandomColourset()).removeAllParents());
		this.canvas.addPatternNode(node);
		node.position.x = 239;
		node.position.y = 950;

		node = new PatternNodeView(new model.QuadSubdivisionNode(2,2).removeAllParents());
		this.canvas.addPatternNode(node);
		node.position.x = 339;
		node.position.y = 950;

		node = new PatternNodeView(new model.ColourNode(new paper.Color(1,0,0)).removeAllParents());
		this.canvas.addPatternNode(node);
		node.position.x = 339;
		node.position.y = 350;

//		var m = new model.QuadNode();
//		m.getEditorDefinition();


	}
	refreshPattern()
	{
		//
		console.log("refresh", this.startnode.nodemodel);
		if(this.onModelUpdated ) this.onModelUpdated(this.startnode.nodemodel);
	}

}