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
	constructor(nodemodel, testcolour = new paper.Color(0.7))
	{
		super(PatternNodeView.NodeType, model,testcolour);
		this.canvas = null;

		this.nodemodel = nodemodel;
		this.nodedef = (nodemodel ) ? nodemodel.getEditorDefinition() : new model.NodeEditorDefinition("Node");

		//test rect background
		var bound = new paper.Rectangle(0,0,150,50);
		var cornerSize = new paper.Size(10, 10);
		this.rect = new paper.Shape.Rectangle(bound, cornerSize);
		super.addChild( this.rect);
		this.rect.fillColor = testcolour;
		this.rect.shadowColor = new paper.Color(0, 0, 0,0.2);
		this.rect.shadowBlur =0;
		this.rect.shadowOffset = new paper.Point(2, 3);


		// add a text label
		this.text = new paper.PointText(new paper.Point(bound.width/2, bound.height/2 + 5));
		super.addChild( this.text);

		this.text.justification = 'center';
		this.text.fillColor = 'black';
		this.text.content = this.nodedef.label;
		//
		this.patternParentConnector = new ConnectionPoint(this, null, 'black');
		this.patternParentConnector.connectorType = PatternConnectorType.patternNodeParent;
		this.patternParentConnector.allowedConnectors = [PatternConnectorType.patternNodeChild];
		super.addChild( this.patternParentConnector);
		this.patternParentConnector.position = new paper.Point(bound.width/2,bound.height);
		this.connectors.push(this.patternParentConnector);


		this.patternChildConnector = new ConnectionPoint(this, null, 'black');
		this.patternChildConnector.connectorType = PatternConnectorType.patternNodeChild;
		this.patternChildConnector.allowedConnectors = [PatternConnectorType.patternNodeParent];
		super.addChild( this.patternChildConnector);
		this.patternChildConnector.position = new paper.Point(bound.width/2,0);
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