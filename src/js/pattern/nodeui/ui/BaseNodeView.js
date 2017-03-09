import paper from 'paper'
import {ArrayUtils} from '../../util/ArrayUtils'
import * as model from '../../model/model'
import {ConnectionPoint as ConnectionPoint} from './ConnectionPoint'
import {PatternConnectionPoint as PatternConnectionPoint} from './ConnectionPoint'
import {ParamInputConnectionPoint as ParamInputConnectionPoint} from './ConnectionPoint'
import {ParamOutputConnectionPoint as ParamOutputConnectionPoint} from './ConnectionPoint'

//import {PatternConnectorType } from './PatternNodeView'
import {PatternConnectorType as PatternConnectorType} from '../model/ConnectorTypes'
import {ParamConnectorType as ParamConnectorType} from '../model/ConnectorTypes'


/**
 * base view of a draggable item. An node is either a pattern node or a parameter (Float,Int...)
 */
export default class BaseNodeView extends paper.Group
{
	constructor(nodetype, nodemodel)
	{
		super();
		this.nodedef = nodemodel.getEditorDefinition();

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
		this.pivot = new paper.Point(0,0);
		this.position = new paper.Point(0,0);

		var inputSpacingY = 15;
		var inputsylen = this.nodedef.inputs.length*inputSpacingY;
		this.bound = new paper.Rectangle(0,0,150,50 + inputsylen);
		//add a rect background
		this.rect = this._addBackground(this.bound, 'grey');
		// add a text label
		this.text = this._addCenteredTextLabel(this.nodedef.label,this.bound, 'black');
		this.text.position.y = 30;
		this.text.fontSize = 14;
		//this.text.fontWeight ='bold';

		// add the name of the
		var startpos = new paper.Point(this.bound.x + this.bound.width, this.bound.y + 35);
		this._addAllInputConnectionPoints(this.nodedef, startpos, inputSpacingY);


	}

	setBgColour(colour)
	{
		this.rect.fillColor = colour;
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
		return rect;
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

	_addAllInputConnectionPoints(modeldef, startp, inputSpacingY)
	{
		var pos = startp ; //

		for(var i =0; i< modeldef.inputs.length;++i)
		{
			var paramDef = modeldef.inputs[i];
			pos.y += inputSpacingY;
			this._addParamInputConnectorPoint(pos.clone(), paramDef);
		}
	}

	_addParamInputConnectorPoint(position, paramDef)
	{
		var cp = new ParamInputConnectionPoint(this, paramDef);
		cp.connectorType = ParamConnectorType.paramInput;
		cp.allowedConnectors = [ParamConnectorType.paramOutput];
		return this._addConnectorPoint(cp, position);
	}

	_addParamOutputConnectorPoint(position, paramDef)
	{
		var cp = new ParamOutputConnectionPoint(this, paramDef);
		cp.connectorType = ParamConnectorType.paramOutput;
		cp.allowedConnectors = [ParamConnectorType.paramInput];
		return this._addConnectorPoint(cp, position);
	}


	_addPatternParentConnectorPoint(position)
	{
		var cp = new PatternConnectionPoint(this);
		cp.connectorType = PatternConnectorType.patternNodeParent;
		cp.allowedConnectors = [PatternConnectorType.patternNodeChild];
		return this._addConnectorPoint(cp, position);
	}

	_addPatternChildConnectorPoint(position)
	{
		var cp = new PatternConnectionPoint(this);
		cp.connectorType = PatternConnectorType.patternNodeChild;
		cp.allowedConnectors = [PatternConnectorType.patternNodeParent];
		return this._addConnectorPoint(cp, position);
	}

	_addConnectorPoint(cp, position)
	{
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