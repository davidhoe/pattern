import paper from 'paper'
import NodeEditorCanvas from '../ui/NodeEditorCanvas'
import PatternNodeView from '../ui/PatternNodeView'
import ParamNodeView from '../ui/ParamNodeView'

export default class ConnectorDragTool
{
	constructor(canvas)
	{
		var _this = this;
		this.draggingNode = null;
		this.canvas = canvas;
		this.foundConnnectionPoint = null;

		//this.previousObj = null
		this._hitOptions = {
			segments: false,
			stroke: false,
			fill: true,
			tolerance: 5
		};


		this._startConnector = null;
		this._checkNodes = null;
		this._connectionLine = null;
	}

	startDrag(startConnector, connectionLine)
	{
		this._connectionLine = connectionLine;
		this._startConnector = startConnector;
		this.draggingNode = startConnector.node;
		this._checkNodes = [];
		var pnodes = this.canvas.nodeViews;
		//console.log("pnodes", pnodes);

		for(var i =0; i< pnodes.length;++i)
		{
			if(this.draggingNode != pnodes[i]) this._checkNodes.push( pnodes[i] );
		}
		pnodes = this.canvas.paramNodes;
		for(var i =0; i< pnodes.length;++i)
		{
			if(this.draggingNode != pnodes[i]) this._checkNodes.push( pnodes[i] );
		}
		//this.activate();

		//console.log("startDrag", this.draggingNode.constructor.name);
		//if(draggingNode.constructor.name  )

	}

	onMouseDown (event) {

	}

	onMouseDrag (event) {

		if(this._connectionLine)
		{
			this._connectionLine.p1 = event.point;
			this._connectionLine.updateConnectionLine();
		}

		this.doHitTest(event.point);

	}

	doHitTest(point)
	{
		var testnode;
		var hitconnector = null;
		//	console.log(this._checkNodes.length);
		for(var i =0; i< this._checkNodes.length;++i ){
			testnode = this._checkNodes[i];
		//	console.log("hit test ", testnode.constructor.name);

		//	console.log(point);
			if(testnode.hitTest((point)))
			{
			//	console.log("hit node ", testnode.constructor.name);

				 hitconnector = this.hitTestConnectors(testnode, point);
				if(hitconnector)
				{
					if(hitconnector != this.foundConnnectionPoint)
					{

			//			console.log("hit connector ", hitconnector.allowedConnectors);
						if(  hitconnector.isConnectionAllowed(this._startConnector.connectorType))
						{
			//				console.log("connection allowed, true");
							//

							hitconnector.setHighlighted(true);
							if(this.foundConnnectionPoint) this.foundConnnectionPoint.setHighlighted(false);
							this.foundConnnectionPoint = hitconnector;
						}
						//this.previousObj = hitconnector;
					}
					break;
				}
				else{

				}


				/*
				if(testnode != this.previousObj)
				{

				}*/
			}
		}
		if(hitconnector == null)
		{
			if(this.foundConnnectionPoint) {
				this.foundConnnectionPoint.setHighlighted(false);
				this.foundConnnectionPoint = null;
			}
		}
	}

	hitTestConnectors(node, point)
	{
		//console.log(point);

		for(var i =0; i < node.connectors.length; ++i)
		{
			//console.log("test",node.connectors[i]);

			if(node.connectors[i].hitTest(point))
			{
				return node.connectors[i];
			}
		}
		return null;
	}

	onMouseUp (event)
	{
		// do additional checks
		// including a cyclic check
		var newConnectionMade = false;
		var removeconnection = true;
		if(this.foundConnnectionPoint   )
		{
			var alreadyContainsConnection = this.foundConnnectionPoint.node.containsExistingConnection(this.foundConnnectionPoint, this._startConnector );


			if(!alreadyContainsConnection ) {
				removeconnection = false;
				this._connectionLine.setEndConnectionPoint(this.foundConnnectionPoint);
				this._connectionLine.updateConnectionLine();
				newConnectionMade = true;
				// update model
				//this.canvas.setPatternNodeChild(this._connectionLine);

			}
			this.foundConnnectionPoint.setHighlighted(false);

		}

		if(removeconnection)
		{
			// remove lnie from the paper.js parent, but no need to fire event as state has not changed/
			this.canvas.removeConnectionLine(this._connectionLine, false);
		}

		if(newConnectionMade)
		{
			this.canvas.addConnectionLine(this._connectionLine);
		}

		// reset
		this._connectionLine = null;
		this.foundConnnectionPoint = null;
		this.draggingNode = null;
		// do callback
		this.canvas.onToolComplete(this);

	}

	onEnter(evt)
	{
		console.log("enter");
	}

}