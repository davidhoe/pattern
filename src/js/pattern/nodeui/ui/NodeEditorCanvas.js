import paper from 'paper'
import * as utils from '../../util/utils'
import BaseNodeView from './BaseNodeView'
import ParamNodeView from './ParamNodeView'
import PatternNodeView from './PatternNodeView'
import NodeDragTool from '../tool/NodeDragTool'
import ConnectorDragTool from '../tool/ConnectorDragTool'
import ConnectionLine from './ConnectionLine'

/**
 * Canvas is the main surface to add Nodes to.
 * Nodes can be moved around within this canvas and have connections between them
 * This wraps a paper.Project which has its own view (html canvas)
 */
export default class NodeEditorCanvas
{
	constructor(project)
	{
		this.project = project;
		this.project.activate();
		this.connectionLayer = new paper.Layer();
		this.nodeLayer = new paper.Layer();
		this.connections = [];
		this.patternNodes = [];
		this.paramNodes = [];
		this.connectionLines = [];

		// tools
		var _this = this;
		this.defaultTool = new paper.Tool();
		this.connectorDragTool = new ConnectorDragTool(this);
		this.activeTool = null;

		this.defaultTool.onMouseDown = function(evt)
		{
			if(_this.activeTool)_this.activeTool.onMouseDown(evt);
		}
		this.defaultTool.onMouseDrag = function(evt)
		{
			if(_this.activeTool)_this.activeTool.onMouseDrag(evt);
		}
		this.defaultTool.onMouseUp = function(evt)
		{
			if(_this.activeTool)_this.activeTool.onMouseUp(evt);
		}
		this.nodeDragTool = new NodeDragTool(this);
		this.defaultTool.activate();

	//	this.nodeDragTool.activate();
		this.draggingNode = null;
	}

	// called when a tool finishes like dragging
	onToolComplete(tool)
	{
		this.activeTool = null;
	}

	onConnectorDragStart(connectionPoint)
	{
		var connectionline = new ConnectionLine();
		this.connectionLayer.addChild(connectionline);
		connectionline.setStartConnectionPoint( connectionPoint);
		this.connectionLines.push(connectionline);

		console.log("dragstart connector", connectionPoint.constructor.name );
		// check type
		this.activeTool = this.connectorDragTool;
		this.connectorDragTool.startDrag(connectionPoint, connectionline);


	}

	removeConnectionLine(connectionLine)
	{
		this.connectionLines = utils.ArrayUtils.RemoveObject(this.connectionLines, connectionLine);
		connectionLine.destroy();
	}

	onNodeEnter(evt)
	{
		console.log("node enter");
	}

	// add node to the canvas
	addPatternNode(node)
	{
		if(utils.ArrayUtils.ContainsObject(this.patternNodes, node))
		{
			return;
		}
		this.patternNodes.push(node);
		this._addNode(node);
		node.canvas = this;
	}

	// common
	_addNode(node)
	{
		this.nodeLayer.addChild(node);
		var _this=  this;

		node.onMouseEnter = function(evt) {
		//		console.log("node mouse enter ", this);
		}

		node.onMouseDown = function(evt)
		{
			_this.activeTool = _this.nodeDragTool;
			//console.log("node mouse down");
			//_this.nodeDragTool.emit('mousedown', evt);
			_this.nodeDragTool.startDrag(node);
		}
	}


	// remove node from the canvas
	removeNode(node)
	{
		this.nodes = utils.ArrayUtils.RemoveObject(this.nodes, node);
		this.nodeLayer.removeChild(node);
	}

	// add a connection line that links 2 nodes
	addConnection()
	{
		//var connector = new Connection
	}

	removeConnection()
	{

	}
}