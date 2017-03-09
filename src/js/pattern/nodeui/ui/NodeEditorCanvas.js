import paper from 'paper'
import * as utils from '../../util/utils'
import * as model from '../../model/model'
import BaseNodeView from './BaseNodeView'
import ParamNodeView from './ParamNodeView'
import PatternNodeView from './PatternNodeView'
import NodeDragTool from '../tool/NodeDragTool'
import ConnectorDragTool from '../tool/ConnectorDragTool'
import ConnectionLine from './ConnectionLine'
import HTMLParamMenu from './HTMLParamMenu'

/**
 * Canvas is the main surface to add Nodes to.
 * Nodes can be moved around within this canvas and have connections between them
 * This wraps a paper.Project which has its own view (html canvas)
 */
export default class NodeEditorCanvas
{
	constructor(project)
	{
		var _this = this;

		this.onModelUpdatedCallback = null;
		this.project = project;
		this.project.activate();
		this.connectionLayer = new paper.Layer();
		this.nodeLayer = new paper.Layer();
		this.connections = [];
		this.nodeViews = [];
		this.paramNodes = [];
		this.connectionLines = [];
		//node param menu
		this._nodemenu = new HTMLParamMenu();
		this._nodemenu.onValueChangedCallback = function(){ _this.onModelUpdated()};
		this._nodemenu.onDeleteClickedCallback = function(nodeView)
		{
			//console.log("onDeleteClickedCallback nodeView" , nodeView);
			_this.removeNode(nodeView);
			_this._nodemenu.hide();
		}

		// tools
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


	onModelUpdated()
	{
		if(this.onModelUpdatedCallback)
		{
			this.onModelUpdatedCallback();
		}
	}


	// called when a tool finishes like dragging
	onToolComplete(tool)
	{
		this.activeTool = null;
	}

	onConnectorDragStart(connectionPoint)
	{
		var connectionline = new ConnectionLine();
		connectionline.setStartConnectionPoint( connectionPoint);
		this.connectionLayer.addChild(connectionline);

		//this.connectionLines.push(connectionline);
		console.log("dragstart connector", connectionPoint.constructor.name );
		// check type
		this.activeTool = this.connectorDragTool;
		this.connectorDragTool.startDrag(connectionPoint, connectionline);
		this._nodemenu.hide();
	}

	// add a successful connection line
	addConnectionLine(connectionline, fireEvent = true)
	{
		if(!utils.ArrayUtils.ContainsObject(this.connectionLines,connectionline))
		{
			this.connectionLines.push(connectionline);
		}
		this.connectionLayer.addChild(connectionline);

		if(fireEvent)
		{
			this._emitModelUpdateEvent();
		}
	}

	removeAllConnections(fireEvent = true)
	{
		var lines = this.connectionLines;
		console.log("removeallconnecions", lines);
		for(var i =0; i< lines.length;++i)
		{
			lines[i].destroy();
		}
		this.connectionLines = [];
		if(fireEvent)
		{
			this._emitModelUpdateEvent();
		}
	}

	removeConnectionLine(connectionLine, fireEvent = true)
	{
		this.connectionLines = utils.ArrayUtils.RemoveObject(this.connectionLines, connectionLine);
		connectionLine.destroy();

		if(fireEvent)
		{
			this._emitModelUpdateEvent();
		}
	}

	onNodeEnter(evt)
	{
		console.log("node enter");
	}

	// add node to the canvas
	addPatternNode(node)
	{
		if(utils.ArrayUtils.ContainsObject(this.nodeViews, node))
		{
			return;
		}
		this.nodeViews.push(node);
		this._addNode(node);
		node.canvas = this;

		var _this = this;
		node.on('click', function(){_this.nodeClicked(this)})
	}

	removeNode(node, fireEvent = true)
	{
		node.destroy(); // this removes all of its connections
		//console.log("removeNode ", this.nodeViews);
		this.nodeViews = utils.ArrayUtils.RemoveObject(this.nodeViews, node);

		if(this._nodemenu._nodeViewRef == node)
		{
			this._nodemenu.hide();
		}
		if(fireEvent)
		{
			this._emitModelUpdateEvent();
		}
	}

	removeAllNodes(includeNonDeletables = false, fireEvent = true)
	{
		var temp = this.nodeViews;
		for(var i =0; i< temp.length;++i)
		{
			if( (includeNonDeletables && !temp[i].deletable) || temp[i].deletable ) {
				this.removeNode(temp[i], false);
			}
		}
		this.nodeViews = [];
		if(fireEvent)
		{
			this._emitModelUpdateEvent();
		}
	}

	nodeClicked(node)
	{
		if(this.nodeDragTool.isDragging())
		{
			return;
		}
		var currentNode= this._nodemenu._nodeViewRef;
		if(this._nodemenu.isShowing())
		{
			if(currentNode == node)
			{
				//hide it
				this._nodemenu.hide();
			}
			else{
				// show it
				this.showMenuForNode(node);
			}
		}
		else{
			this.showMenuForNode(node);
		}
	}

	showMenuForNode(node)
	{
		console.log("node clicked" , node);
		this._nodemenu.init(node);
		//console.log();
		this._nodemenu.show(node.position.x + 50, node.position.y - 50);
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
			_this.nodeDragTool.startDragDetect(node);
			//_this._nodemenu.hide();

		}
	}

	onDragDetected()
	{
		this._nodemenu.hide();
	}

	_emitModelUpdateEvent()
	{
		if(this.onModelUpdated)
		{
			this.onModelUpdated();
		}
	}
}