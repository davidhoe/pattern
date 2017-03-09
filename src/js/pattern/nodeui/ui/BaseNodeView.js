import paper from 'paper'
import {ArrayUtils} from '../../util/ArrayUtils'
import * as model from '../../model/model'
import {ConnectionPoint as ConnectionPoint} from './ConnectionPoint'
/**
 * base view of a draggable item. An node is either a pattern node or a parameter (Float,Int...)
 */
export default class BaseNodeView extends paper.Group
{
	constructor(nodetype, nodemodel)
	{
		super();
		this.nodemodel = nodemodel;
		this.canvas = null;
		this.deletable = true;
		this.type = nodetype;
		//this.model  = model;
		this.dragging = false;
		this.connectors = [];
		this.connectionLines = [];
		//this.applyMatrix = false;
		//

		// add the name of the
	}

	/////////////////////////////
	// ui

	_addBackground(bound, colour)
	{
		var cornerSize = new paper.Size(10, 10);
		var rect = new paper.Shape.Rectangle(bound, cornerSize);
		super.addChild( rect);
		rect.fillColor = colour;
		rect.shadowColor = new paper.Color(0, 0, 0,0.2);
		rect.shadowBlur =0;
		rect.shadowOffset = new paper.Point(2, 3);
		return this.rect;
	}

	_addCenteredTextLabel(textlabel,bound, colour)
	{
		var text = new paper.PointText(new paper.Point(bound.width/2, bound.height/2 + 5));
		super.addChild( text);
		text.justification = 'center';
		text.fillColor = colour;
		text.content = textlabel;
		return text;
	}

	_addConnectorPoint(position, colour, connectorType, allowedConnectors)
	{
		var cp = new ConnectionPoint(this, 10, colour);
		cp.connectorType = connectorType;
		cp.allowedConnectors = allowedConnectors;
		super.addChild( cp);
		cp.position = position ;
		this.connectors.push(cp);
		return cp;
	}


	/////////////////////////////

	destroy()
	{
		this.remove();
		this.removeAllConnections();
	}



	onPositionUpdate()
	{
		for(var i =0;i < this.connectionLines.length;++i)
		{
			this.connectionLines[i].updateConnectionLine();
		}
	}

	containsExistingConnection(point1, point2)
	{
		for(var i =0; i< this.connectionLines.length;++i)
		{
			if(this.connectionLines[i].hasSameConnections(point1,point2))
			{
				return true;
			}
		}
		return false;
	}

	onConnectionLineRemoved(line)
	{
		console.log("before",this.connectionLines);
		this.connectionLines = ArrayUtils.RemoveObject(this.connectionLines,line);
		console.log("after",this.connectionLines);
	}

	onConnectionLineAdded(line)
	{
		if(!ArrayUtils.ContainsObject(this.connectionLines,line))
		{
			this.connectionLines.push(line);
		}
	}

	removeAllConnections()
	{
		var lines = this.connectionLines;
		for(var i =0; i< lines.length;++i)
		{
			lines[i].destroy();
		}
		this.connectionLines = [];
	}
}