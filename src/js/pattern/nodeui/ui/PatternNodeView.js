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
	constructor(nodemodel, testcolour = 'red')
	{
		super(PatternNodeView.NodeType, model,testcolour);
		this.canvas = null;

		this.nodemodel = nodemodel;
		this.nodedef = (nodemodel ) ? nodemodel.getEditorDefinition() : new model.NodeEditorDefinition("Node");

		//test rect background
		this.rect = new paper.Shape.Rectangle(new paper.Rectangle(0,0,100,100));
		super.addChild( this.rect);
		this.rect.fillColor = testcolour;

		// add a text label
		this.text = new paper.PointText(new paper.Point(50, 50));
		super.addChild( this.text);

		this.text.justification = 'center';
		this.text.fillColor = 'black';
		this.text.content = this.nodedef.label;
		//
		this.patternParentConnector = new ConnectionPoint(this, null, 'black');
		this.patternParentConnector.connectorType = PatternConnectorType.patternNodeParent;
		this.patternParentConnector.allowedConnectors = [PatternConnectorType.patternNodeChild];
		super.addChild( this.patternParentConnector);
		this.patternParentConnector.position = new paper.Point(50,100);
		this.connectors.push(this.patternParentConnector);


		this.patternChildConnector = new ConnectionPoint(this, null, 'grey');
		this.patternChildConnector.connectorType = PatternConnectorType.patternNodeChild;
		this.patternChildConnector.allowedConnectors = [PatternConnectorType.patternNodeParent];
		super.addChild( this.patternChildConnector);
		this.patternChildConnector.position = new paper.Point(50,0);
		this.connectors.push(this.patternChildConnector);

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