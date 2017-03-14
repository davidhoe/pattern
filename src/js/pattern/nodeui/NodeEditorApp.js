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

	// call this from init after colours have loaded
	testparse()
	{


		this.canvas.removeAllNodes(true);

		var a = '{"startnode":"23b4364d-057a-4eb8-847b-4ef52a7f0bd7","nodemodels":[{"classname":"QuadNode","guid":"1649b756-3c8c-44ae-a63d-52621afaaf1d","params":[{"key":"x","object":"bb64e3a9-1651-4c46-806b-f446a53d23f5","outputName":null},{"key":"y","object":"bb64e3a9-1651-4c46-806b-f446a53d23f5","outputName":null}],"values":[{"name":"x","value":12},{"name":"y","value":12},{"name":"w","value":500},{"name":"h","value":500}],"childNodes":["9e3ab11d-7b03-4324-9bfe-ab5fcd2365f5","6263c50a-1b6d-4991-9e7d-968a278a754b"]},{"classname":"FillNode","guid":"9e3ab11d-7b03-4324-9bfe-ab5fcd2365f5","params":[],"values":[{"name":"blendMode","value":"normal"},{"name":"opacity","value":1},{"name":"clipMask","value":false}],"childNodes":[]},{"classname":"QuadSubdivisionNode","guid":"6263c50a-1b6d-4991-9e7d-968a278a754b","params":[],"values":[{"name":"nRows","value":5},{"name":"nCols","value":5}],"childNodes":["84e78284-4326-4f3c-9510-e9b2d793d7fe"]},{"classname":"RandomColourFromSetNode","guid":"84e78284-4326-4f3c-9510-e9b2d793d7fe","params":[],"values":[],"childNodes":["7da9cfa1-1ada-4a75-88f1-66c5bad5aafd"]},{"classname":"FloatParam","guid":"bb64e3a9-1651-4c46-806b-f446a53d23f5","params":[],"values":[{"name":"value","value":12}]},{"classname":"QuadToSCurveNode","guid":"7da9cfa1-1ada-4a75-88f1-66c5bad5aafd","params":[],"values":[{"name":"r","value":0.55228}],"childNodes":["9e3ab11d-7b03-4324-9bfe-ab5fcd2365f5"]}],"nodeviews":[{"guid":"23b4364d-057a-4eb8-847b-4ef52a7f0bd7","deletable":false,"position":{"x":339,"y":100},"classname":"PatternNodeView","nodemodel":"1649b756-3c8c-44ae-a63d-52621afaaf1d"},{"guid":"7555c6dc-7069-4de7-a079-de0705b22c7c","deletable":true,"position":{"x":459,"y":621},"classname":"PatternNodeView","nodemodel":"9e3ab11d-7b03-4324-9bfe-ab5fcd2365f5"},{"guid":"e6b374e9-5d80-48b9-93e1-e922ee23c667","deletable":true,"position":{"x":555.2182723924677,"y":252.55862010943105},"classname":"PatternNodeView","nodemodel":"6263c50a-1b6d-4991-9e7d-968a278a754b"},{"guid":"1b854c18-dafd-4be3-b2b7-9a10b8b7c9e6","deletable":true,"position":{"x":533.549033695283,"y":399.41145007758956},"classname":"PatternNodeView","nodemodel":"84e78284-4326-4f3c-9510-e9b2d793d7fe"},{"guid":"7188dd42-f1ba-4c88-95ed-4dcecfa05ae1","deletable":true,"position":{"x":627.7981808565462,"y":47.83134528652448},"classname":"ParamNodeView","nodemodel":"bb64e3a9-1651-4c46-806b-f446a53d23f5"},{"guid":"6d7a926f-1a0c-4e48-b148-39f644307ece","deletable":true,"position":{"x":560.8330192564923,"y":491.0818097023635},"classname":"PatternNodeView","nodemodel":"7da9cfa1-1ada-4a75-88f1-66c5bad5aafd"}]}';
		var data = JSON.parse(a);
		this.canvas.fromJsonObject(data);
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