import paper from 'paper'
import ParamNodeView from './ui/ParamNodeView'
import * as util from '../util/utils'
import * as model from '../model/model'
import PatternNodeView from './ui/PatternNodeView'
import NodeEditorCanvas from './ui/NodeEditorCanvas'
import ConnectionLine from './ui/ConnectionLine'
import HTMLNodeList from './ui/HTMLNodeList'

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
		var  startnode = new PatternNodeView(new model.QuadNode(0,0,500,500).removeAllParents(), true);
		this.canvas.addNodeView(startnode);
		this.canvas.setStartNodeview(startnode);
		startnode.position.x = 339;
		startnode.position.y = 100;


		// add a fill node
		var node = new PatternNodeView(new model.FillNode().removeAllParents());
		this.canvas.addNodeView(node);
		node.position.x = 339;
		node.position.y = 650;
		//this.test();

		// add some paperjs buttons to test some methods
		var _this = this;
		var button = this.makeDebugButton("Refresh", 10, 10);
		button.onClick = function(e) {_this.refreshPattern();}
		var delbutton = this.makeDebugButton("Delete all connections", 70, 10);
		delbutton.onClick = function(e) {_this.canvas.removeAllConnections(); _this.refreshPattern();}
		var delbutton2 = this.makeDebugButton("Delete all nodes", 230, 10);
		delbutton2.onClick = function(e) { _this.canvas.removeAllNodes();}
		var delbutton2 = this.makeDebugButton("Export", 400, 10);
		delbutton2.onClick = function(e) { _this.canvas.saveToFile();}

		console.log("createStartNode", this.startnode);
		this.canvas.onModelUpdated = function(){ _this.refreshPattern()};

		// add a simple html node list
		this._nodelist = new HTMLNodeList();
		this._nodelist.init("div2");
		this._nodelist.onPatternNodeSelectedCallback = function(nodeclassName){_this.onNewPatternNodeSelected(nodeclassName) } ;
		this._nodelist.onParamNodeSelectedCallback = function(nodeclassName){_this.onParamNodeSelectedCallback(nodeclassName) } ;

		//console.log("variable.constructor ", variable.constructor.name == Array.name);
	}


	onParamNodeSelectedCallback(nodeclassName)
	{
		var nodemodel = HTMLNodeList.CreateNodeInstance(nodeclassName);
		var nodeview = new ParamNodeView(nodemodel);
		this.canvas.addNodeView(nodeview);
		nodeview.position.x = 339 + Math.random()*30;
		nodeview.position.y = 300 + Math.random()*30;
	}

	onNewPatternNodeSelected(nodeclassName)
	{
		var nodemodel = HTMLNodeList.CreateNodeInstance(nodeclassName);
		var nodeview = new PatternNodeView(nodemodel.removeAllParents());
		this.canvas.addNodeView(nodeview);
		nodeview.position.x = 339+ Math.random()*20;
		nodeview.position.y = 300+ Math.random()*20;
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

	maketestNodes()
	{

		//make a node
		var param;

		param = new ParamNodeView(new model.FloatParam(2));
		this.canvas.addNodeView(param);
		param.position.x = 300;
		param.position.y = 350;

		param = new ParamNodeView(new model.IntParam(2));
		this.canvas.addNodeView(param);
		param.position.x = 350;
		param.position.y = 450;

		param = new ParamNodeView(new model.ColourParam());
		this.canvas.addNodeView(param);
		param.position.x = 450;
		param.position.y = 550;

		var node2 = new PatternNodeView(new model.QuadNode(50,50,100,100).removeAllParents());
		this.canvas.addNodeView(node2);
		node2.position.x = 139;
		node2.position.y = 300;

		var node3 = new PatternNodeView(new model.QuadToCircleNode().removeAllParents());
		this.canvas.addNodeView(node3);
		node3.position.x = 139;
		node3.position.y = 500;

		var node = new PatternNodeView(new model.FillNode().removeAllParents());
		this.canvas.addNodeView(node);
		node.position.x = 139;
		node.position.y = 650;

		node = new PatternNodeView(new model.QuadMirrorNode().removeAllParents());
		this.canvas.addNodeView(node);
		node.position.x = 139;
		node.position.y = 750;

		node = new PatternNodeView(new model.QuadToDiagonalLeafNode().removeAllParents());
		this.canvas.addNodeView(node);
		node.position.x = 239;
		node.position.y = 750;

		node = new PatternNodeView(new model.RandomColourFromSetNode(util.ColourUtils.GetRandomColourset()).removeAllParents());
		this.canvas.addNodeView(node);
		node.position.x = 239;
		node.position.y = 950;

		node = new PatternNodeView(new model.QuadSubdivisionNode(2,2).removeAllParents());
		this.canvas.addNodeView(node);
		node.position.x = 339;
		node.position.y = 950;

		node = new PatternNodeView(new model.ColourNode(new paper.Color(1,0,0)).removeAllParents());
		this.canvas.addNodeView(node);
		node.position.x = 339;
		node.position.y = 350;

//		var m = new model.QuadNode();
//		m.getEditorDefinition();


	}
	refreshPattern()
	{
		//
		console.log("refresh", this.canvas.startnode.nodemodel);
		if(this.onModelUpdated ) this.onModelUpdated(this.canvas.startnode.nodemodel);
	}

}