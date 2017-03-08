import paper from 'paper'
import * as model from '../../model/model'
/**
 *
 */
export default class ConnectionPoint extends paper.Group
{
	constructor(node, model, testcolour = 'black')
	{
		super();
		this.node= node;
		this.dragging = false;
		//this.applyMatrix = false;
		//test rect background
		this.rect = new paper.Shape.Rectangle(new paper.Rectangle(-10,-10,20,20));
		this.rect.fillColor = testcolour;
		//this.rect.applyMatrix = false;

		this.addChild(this.rect);
		var _this = this;
		this.onMouseDown = function(evt)
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

	setHighlighted(highlighted)
	{
		if(highlighted)
		{
			this.rect.fillColor = 'green';
		}
		else{
			this.rect.fillColor = 'black';
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
}