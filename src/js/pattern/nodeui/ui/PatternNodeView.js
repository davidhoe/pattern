import paper from 'paper'
import BaseNodeView from './BaseNodeView'
import * as model from '../../model/model'
import ConnectionPoint from './ConnectionPoint'
import {PatternConnectorType as PatternConnectorType} from '../model/ConnectorTypes'
import {ParamConnectorType as ParamConnectorType} from '../model/ConnectorTypes'

//export var PatternConnectorType = {patternNodeParent:"patternNodeParent", patternNodeChild:'patternNodeChild'};

/**
 * pattern node view
 */
export default class PatternNodeView extends BaseNodeView
{
	constructor(nodemodel, isRoot = false)
	{
		super(PatternNodeView.NodeType, nodemodel);

		this.setBgColour( (isRoot) ? 'green' : new paper.Color(0.7) );


		// add a parent connection point
		this.patternParentConnector = this._addPatternParentConnectorPoint(
			new paper.Point(this.bound.width/2,this.bound.height),
			);

		// add a child connection point
		this.patternChildConnector = this._addPatternChildConnectorPoint(
			new paper.Point(this.bound.width/2,0),
			);



		//
		/*
		// add an input connection on the side
		this.inputConnector = this._addConnectorPoint(
			new paper.Point(bound.width*0.75,bound.height*0),
			'grey',
			ParamConnectorType.paramInput,
			[ParamConnectorType.paramOutput]);
*/
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