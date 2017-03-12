import paper from 'paper'
import * as model from '../../model/model'
import * as utils from '../../util/utils'


/**
 *
 */
export  class ConnectionPoint extends paper.Group
{
	constructor(nodeview, circleRadius = 10, colour = 'black')
	{
		super();
		this.validRelationships = [];
		this.validTypes = [];
		this.connectedLines = [];
		this.allowMultipleConnections = true;
		this.paramName = null;
		this.paramLabel = null; // todo?
		this.nodeview = nodeview;
		this.dragging = false;
		//this.applyMatrix = false;
		//test rect background

		// bg is used by ConnectionLine for doing global to local
		this.bg = new paper.Shape.Circle(new paper.Point(0,0),circleRadius);// new paper.Shape.Rectangle(new paper.Rectangle(-10,-10,20,20));
		this.bg.fillColor = colour;
		this.baseColour = colour;
		//this.rect.applyMatrix = false;
		this.pivot = new paper.Point(0,0);
		this.position = new paper.Point(0,0);


		this.addChild(this.bg);
		var _this = this;
		this.bg.onMouseDown = function(evt)
		{
			if(_this.nodeview)
			{
				_this.nodeview.canvas.onConnectorDragStart(_this);
			}
			evt.stopPropagation();
		}

		//this.connectorType = "";
		//this.allowedConnectors = [];
		// add the name of the
	}

	setToHighlightColour(colour)
	{
		this.bg.fillColor = colour;
	}

	setToBaseColour()
	{
		this.bg.fillColor = this.baseColour;
	}

	setHighlighted(highlighted)
	{
		if(highlighted)
		{
			this.setToHighlightColour('green');
		}
		else{
			this.setToBaseColour();
		}
	}

	/*
	isConnectionAllowed(type)
	{
		for(var i =0; i< this.allowedConnectors.length;++i)
		{
			if(this.allowedConnectors[i] == type) return true;
		}
		return false;
	}*/

	_createTextLabel(textlabel,pos, colour= 'black')
	{
		var text = new paper.PointText(pos);
		super.addChild( text);
		text.justification = 'center';
		text.fillColor = colour;
		text.content = textlabel;
		return text;
	}

	isValidConnection(otherPoint)
	{
		var validRelationshipFound = this.validRelationships.indexOf(otherPoint.relationship) != -1;
		var validTypeFound = this.validTypes.indexOf(otherPoint.type) != -1;

		return validTypeFound && validRelationshipFound;

		/*
		var validRelationshipFound = false;
		for(var i =0; i< this.validRelationships.length;++i)
		{
			if(this.validRelationships[i] == otherPoint.relationship){
				validRelationshipFound = true;
				break;
			}
		}

		for(var i =0; i< this.validTypes.length;++i)
		{
			if(this.validTypes[i] == otherPoint.type) return true;
		}
		return false;
		*/
	}

	onConnectionAdded(line)
	{
		var otherPoint = line.getOtherPoint(this);
		if(!this.isValidConnection(otherPoint)) return;

		//console.log("onConnectionAdded this.allowMultipleConnections", this.allowMultipleConnections );
		if(!this.allowMultipleConnections) {
		//	console.log("this.connectedLines.length", this.connectedLines.length);
			var lines = this.connectedLines;
			for(var i = 0; i< lines.length;++i)
			{
				lines[i].destroy();
			}
			this.connectedLines = [];
			//if (this.connectedLine) this.connectedLine.destroy();
		}
		this.connectedLines.push(line);
	}

	onConnectionRemoved(line)
	{
	//	console.log("onConnectionREmoved");
		this.connectedLines = utils.ArrayUtils.RemoveObject(this.connectedLines, line);
	}
}


// Parent
export class PatternParentConnectionPoint extends ConnectionPoint {
	constructor(nodeview)
	{
		super(nodeview, 10, 'black');
		this.type = "Node";
		this.validTypes = ["Node"];
		this.relationship = PatternParentConnectionPoint.name;
		this.validRelationships = [PatternChildConnectionPoint.name];
	}

	onConnectionAdded(line)
	{
		var otherPoint = line.getOtherPoint(this);
		if(!this.isValidConnection(otherPoint)) return;
		super.onConnectionAdded(line);

		// delegate the logic to the mode ?
		this.nodeview.nodemodel.addChild(otherPoint.nodeview.nodemodel);
	}

	onConnectionRemoved(line)
	{
		super.onConnectionRemoved(line);
		var otherPoint = line.getOtherPoint(this);
		if(otherPoint) this.nodeview.nodemodel.removeChild(otherPoint.nodeview.nodemodel);
	}
}

// child
export class PatternChildConnectionPoint extends ConnectionPoint {
	constructor(nodeview)
	{
		super(nodeview, 10, 'black');
		this.type = "Node";
		this.validTypes = ["Node"];
		this.relationship = PatternChildConnectionPoint.name;
		this.validRelationships = [PatternParentConnectionPoint.name];
	}

	// otherpoint is the parent node
	onConnectionAdded(line)
	{
		var otherPoint = line.getOtherPoint(this);
		if(!this.isValidConnection(otherPoint)) return;
		super.onConnectionAdded(line);

		otherPoint.nodeview.nodemodel.addChild(this.nodeview.nodemodel);
	}

	onConnectionRemoved(line)
	{
		super.onConnectionRemoved(line);
		var otherPoint = line.getOtherPoint(this);
		if(otherPoint) otherPoint.nodeview.nodemodel.removeChild(this.nodeview.nodemodel);
	}
}

// Param input connection point - single point
export class ParamInputConnectionPoint extends ConnectionPoint {
	constructor(nodeview, paramDef)
	{
		super(nodeview, 7, 'grey');
		this.paramDef = paramDef;
		var textlabel = super._createTextLabel(paramDef.label, new paper.Point(-10,4));
		textlabel.justification = 'right';
		//
		//this.connectedLine = null;

		this.allowMultipleConnections = false;
		this.type = paramDef.type;
		this.validTypes = paramDef.getCompatibleTypes();
		this.relationship = ParamInputConnectionPoint.name;
		this.validRelationships = [ParamOutputConnectionPoint.name];
	}

	onConnectionAdded(line)
	{
		var otherPoint = line.getOtherPoint(this);
		if(!this.isValidConnection(otherPoint)) return;
		super.onConnectionAdded(line);
		this.nodeview.nodemodel.setParam(this.paramDef.name, otherPoint.nodeview.nodemodel);
	}

	onConnectionRemoved(line)
	{
		super.onConnectionRemoved(line);
		var otherPoint = line.getOtherPoint(this);
		if(otherPoint) this.nodeview.nodemodel.removeParam(otherPoint.nodeview.nodemodel, this.paramDef.name);
	}
}

// Param input connection point - allows multiple points of the same type to connect - todo
export class ParamInputArrayConnectionPoint extends ConnectionPoint {
	constructor(nodeview, paramDef)
	{
		super(nodeview, 7, 'grey');
		this.paramDef = paramDef;
		var textlabel = super._createTextLabel(paramDef.label, new paper.Point(-10,4));
		textlabel.justification = 'right';
		//
		//this.connectedLine = null;

		this.allowMultipleConnections = true;
		this.type = paramDef.type;
		this.validTypes = paramDef.getCompatibleTypes();
		this.relationship = ParamInputConnectionPoint.name;
		this.validRelationships = [ParamOutputConnectionPoint.name];
	}

	onConnectionAdded(line)
	{
		var otherPoint = line.getOtherPoint(this);
		if(!this.isValidConnection(otherPoint)) return;
		super.onConnectionAdded(line);
		this.nodeview.nodemodel.setParam(this.paramDef.name, otherPoint.nodeview.nodemodel);
	}

	onConnectionRemoved(line)
	{
		super.onConnectionRemoved(line);
		var otherPoint = line.getOtherPoint(this);
		if(otherPoint) this.nodeview.nodemodel.removeParam(otherPoint.nodeview.nodemodel, this.paramDef.name);
	}
}


// Param output connection point
export class ParamOutputConnectionPoint extends ConnectionPoint {
	constructor(nodeview, paramDef)
	{
		super(nodeview, 7, 'grey');

		this.type = paramDef.type;
		this.validTypes = paramDef.getCompatibleTypes();
		this.relationship = ParamOutputConnectionPoint.name;
		this.validRelationships = [ParamInputConnectionPoint.name];
	}

	onConnectionAdded(line)
	{
		var otherPoint = line.getOtherPoint(this);
		if(!this.isValidConnection(otherPoint)) return;
		super.onConnectionAdded(line);
	//	console.log(line);
		otherPoint.nodeview.nodemodel.setParam(otherPoint.paramDef.name, this.nodeview.nodemodel);

	}

	onConnectionRemoved(line)
	{
		super.onConnectionRemoved(line);
		var otherPoint = line.getOtherPoint(this);
		if(otherPoint) otherPoint.nodeview.nodemodel.removeParam(this.nodeview.nodemodel, otherPoint.paramDef.name);
	}
}
