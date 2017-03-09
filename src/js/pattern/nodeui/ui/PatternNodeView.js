import paper from 'paper'
import BaseNodeView from './BaseNodeView'
import * as model from '../../model/model'
import ConnectionPoint from './ConnectionPoint'
import {ParamConnectorType} from './ParamNodeView'

export var PatternConnectorType = {patternNodeParent:"patternNodeParent", patternNodeChild:'patternNodeChild'};

/**
 * pattern node view
 */
export default class PatternNodeView extends BaseNodeView
{
	constructor(nodemodel, isRoot = false)
	{
		super(PatternNodeView.NodeType);
		this.nodemodel = nodemodel;
		this.nodedef = nodemodel.getEditorDefinition();

		var colour = (isRoot) ? 'green' : new paper.Color(0.7);

		var bound = new paper.Rectangle(0,0,150,50);
		//add a rect background
		this.rect = this._addBackground(bound, colour);
		// add a text label
		this.text = this._addCenteredTextLabel(this.nodedef.label, bound, 'black');

		// add a parent connection point
		this.patternParentConnector = this._addConnectorPoint(
			new paper.Point(bound.width/2,bound.height),
			'black',
			PatternConnectorType.patternNodeParent,
			[PatternConnectorType.patternNodeChild]);

		// add a child connection point
		this.patternChildConnector = this._addConnectorPoint(
			new paper.Point(bound.width/2,0),
			'black',
			PatternConnectorType.patternNodeChild,
			[PatternConnectorType.patternNodeParent]);

		// add an input connection on the side
		this.inputConnector = this._addConnectorPoint(
			new paper.Point(bound.width*0.75,bound.height*0),
			'grey',
			ParamConnectorType.paramInput,
			[ParamConnectorType.paramOutput]);

		if(isRoot)
		{
			this.setChildConnectorEnabled(false);
			this.deletable = false;
		}
	}



	setParentConnectorEnabled(enabled)
	{
		this.patternParentConnector.visible = enabled;
	}

	setChildConnectorEnabled(enabled)
	{
		this.patternChildConnector.visible = enabled;
	}

	removeConnectionLine(line)
	{
		// find the other connection
		super.removeConnectionLine(line);
	}

	isConnectionAllowed(connectorType)
	{
		return connectorType == PatternConnectorType.patternNodeChild ||
			connectorType == ParamConnectorType.paramOutput ;
	}

	static get NodeType()
	{
		return "pattern";
	}


}