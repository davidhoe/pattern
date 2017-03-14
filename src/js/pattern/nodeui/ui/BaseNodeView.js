import paper from 'paper'
import * as utils from '../../util/utils'
import * as model from '../../model/model'
import {ConnectionPoint as ConnectionPoint} from './ConnectionPoint'
import {PatternChildConnectionPoint as PatternChildConnectionPoint} from './ConnectionPoint'
import {PatternParentConnectionPoint as PatternParentConnectionPoint} from './ConnectionPoint'
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
		this._inputConnectionPoints= [];
		this.deletable = true;
		this.type = nodetype;
		//this.model  = model;
		this.dragging = false;
		this.connectors = [];
		this.connectionLines = [];
		//this.applyMatrix = false;
		this.outputConnectors = [];
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

		this._id =  utils.MathUtils.GenerateUUID();// generate a random id

	}

	_createOutputConnectors(startp)
	{

		console.log("--_createOutputConnectors", this.nodedef.outputs);
		// create an output connector for each
		for(var i =0; i< this.nodedef.outputs.length;++i) {

			var outputConnector = this._addParamOutputConnectorPoint(
				new paper.Point(startp.x + i*20, startp.y),
				this.nodedef.outputs[i]
			);
			//this.outputConnector = outputConnector;
			this.outputConnectors.push(outputConnector);
		}
	}

	getID()
	{
		return this._id;
	}

	// override, meant for patternnode only
	setAsStartNode()
	{}

	// export to json
	toJsonObject(data = null)
	{
		var data = {};

		data["guid"] = this.getID();
		data["deletable"] = this.deletable;
		data["position"] = {'x':this.position.x, 'y': this.position.y};
		data["classname"] = this.constructor.name;
		data["nodemodel"] =  this.nodemodel.getID();// this.nodemodel.toJsonObject();
		return data;
	}

	fromJsonObject(data, nodeviews, canvas)
	{
		this._id = data["guid"];
		this.deletable = data["deletable"];
		this.position.x =  data["position"].x;
		this.position.y =  data["position"].y;
		console.log("-------------------------", this.nodemodel._params.length);

		// add param connections back
		for(var i =0; i< this.nodemodel._params.length; ++i)
		{
			var paramModel = this.nodemodel._params[i];
			var childView = utils.ArrayUtils.FindObjectByParameter(nodeviews,"nodemodel", paramModel.object);
			// add a parent/child connection
			console.log("paramModel.object", paramModel.object);

			console.log("childView", childView);

			var inputpoint = this._getInputConnectionPointForParam(paramModel.key);
			console.log("inputpoint", inputpoint);

			// todo link up the correct output connector by outputName
			var outputPoint = childView.getOutputConnectorByName(paramModel.name);
			if(outputPoint) {
				canvas.addConnectionViewBetweenPoints(inputpoint, outputPoint);
			}
			else if(childView.getAnyOutputConnector())
			{
				canvas.addConnectionViewBetweenPoints(inputpoint, childView.getAnyOutputConnector());
			}
		}
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

	_getInputConnectionPointForParam(paramName)
	{
		for(var i =0; i< this._inputConnectionPoints.length;++i)
		{
			if(this._inputConnectionPoints[i].paramDef.name == paramName) return this._inputConnectionPoints[i];
		}
		return null;
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

		this._inputConnectionPoints.push(cp);
/*
		cp.connectorType = ParamConnectorType.paramInput + " " + paramDef.type;
		var compatibleTypes = paramDef.getCompatibleTypes();
		cp.allowedConnectors = [];
		for(var i =0; i< compatibleTypes.length;++i) {
			cp.allowedConnectors.push(ParamConnectorType.paramOutput + " " + compatibleTypes[i]);
		}
		*/
		return this._addConnectorPoint(cp, position);
	}

	_addParamOutputConnectorPoint(position, paramDef)
	{
		var cp = new ParamOutputConnectionPoint(this, paramDef);
		/*
		cp.connectorType = ParamConnectorType.paramOutput+ " " + paramDef.type;
		var compatibleTypes = paramDef.getCompatibleTypes();
		cp.allowedConnectors = [];
		for(var i =0; i< compatibleTypes.length;++i) {
			cp.allowedConnectors.push(ParamConnectorType.paramInput + " " + compatibleTypes[i]);
		}
*/
		return this._addConnectorPoint(cp, position);
	}

	_addPatternParentConnectorPoint(position)
	{
		var cp = new PatternParentConnectionPoint(this);
		//cp.connectorType = PatternConnectorType.patternNodeParent;
		//cp.allowedConnectors = [PatternConnectorType.patternNodeChild];
		return this._addConnectorPoint(cp, position);
	}

	_addPatternChildConnectorPoint(position)
	{
		var cp = new PatternChildConnectionPoint(this);
		//cp.connectorType = PatternConnectorType.patternNodeChild;
		//cp.allowedConnectors = [PatternConnectorType.patternNodeParent];
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
		this.connectionLines = utils.ArrayUtils.RemoveObject(this.connectionLines,line);
		console.log("after",this.connectionLines);
	}

	onConnectionLineAdded(line)
	{
		if(!utils.ArrayUtils.ContainsObject(this.connectionLines,line))
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