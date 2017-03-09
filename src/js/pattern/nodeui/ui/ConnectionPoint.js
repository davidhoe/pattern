import paper from 'paper'
import * as model from '../../model/model'


/**
 *
 */
export  class ConnectionPoint extends paper.Group
{
	constructor(nodeview, circleRadius = 10, colour = 'black')
	{
		super();
		this.paramName = null;
		this.paramLabel = null; // todo?
		this.node = nodeview;
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
			if(_this.node)
			{
				_this.node.canvas.onConnectorDragStart(_this);
			}
			evt.stopPropagation();
		}

		this.connectorType = "";
		this.allowedConnectors = [];
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

	isConnectionAllowed(type)
	{
		for(var i =0; i< this.allowedConnectors.length;++i)
		{
			if(this.allowedConnectors[i] == type) return true;
		}
		return false;
	}

	_createTextLabel(textlabel,pos, colour= 'black')
	{
		var text = new paper.PointText(pos);
		super.addChild( text);
		text.justification = 'center';
		text.fillColor = colour;
		text.content = textlabel;
		return text;
	}
}



// child and parent pattern connection point
export class PatternConnectionPoint extends ConnectionPoint {
	constructor(nodeview)
	{
		super(nodeview, 10, 'black');
	}
}

// Param input connection point
export class ParamInputConnectionPoint extends ConnectionPoint {
	constructor(nodeview, paramDef)
	{
		super(nodeview, 7, 'grey');
		this.paramDef = paramDef;
		var textlabel = super._createTextLabel(paramDef.label, new paper.Point(-10,4));
		textlabel.justification = 'right';

		//
		this.connectedLine = null;
	}

}

// Param output connection point
export class ParamOutputConnectionPoint extends ConnectionPoint {
	constructor(nodeview, paramDef)
	{
		super(nodeview, 7, 'grey');
	}
}
