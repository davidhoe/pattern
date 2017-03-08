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
		this.startnode = new PatternNodeView(new model.Node().removeAllParents(), 'green');
		this.canvas.addPatternNode(this.startnode);
		this.startnode.position.x = 139;
		this.startnode.position.y = 100;

		//this.test();

		// add a button to test refresh
		var button = this.makeDebugButton("refresh", 10, 10);
		var _this = this;
		button.onClick = function(e)
		{
			_this.refreshPattern();
		}

		console.log("createStartNode", this.startnode);
		this.canvas.onModelUpdated = function(){ _this.refreshPattern()};
		this.canvas._nodemenu.onValueChangedCallback = function(){ _this.refreshPattern()};
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

		var node2 = new PatternNodeView(new model.QuadNode(50,50,100,100).removeAllParents());
		this.canvas.addPatternNode(node2);
		node2.position.x = 139;
		node2.position.y = 300;

		var node3 = new PatternNodeView(new model.QuadToCircleNode().removeAllParents());
		this.canvas.addPatternNode(node3);
		node3.position.x = 139;
		node3.position.y = 500;

		var node = new PatternNodeView(new model.FillNode().removeAllParents(), 'blue');
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