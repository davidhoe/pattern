import paper from 'paper'
import BaseNodeView from './BaseNodeView'
import * as model from '../../model/model'
import {PatternConnectorType as PatternConnectorType} from './PatternNodeView'

export var ParamConnectorType = {paramOutput:"paramOutput", paramInput:'paramInput'};

/**
 * parameter node view
 */
export default class ParamNodeView extends BaseNodeView
{
	static get NodeType()
	{
		return "param";
	}

	constructor(model)
	{
		super(ParamNodeView.NodeType, model);
		this.paramName = "";

		var bound = new paper.Rectangle(0,0,150,50);
		//add a rect background
		this.rect = this._addBackground(bound, new paper.Color(0.9));
		// add a text label
		this.text = this._addCenteredTextLabel(model.label, bound, 'black');

		/*
		// add a output connection
		this.outputConnector = this._addConnectorPoint(
			new paper.Point(bound.width/2,bound.height),
			'grey',
			ParamConnectorType.paramOutput,
			[ParamConnectorType.paramInput]);

		// add an input connection on the side
		this.inputConnector = this._addConnectorPoint(
			new paper.Point(bound.width*0.75,bound.height*0),
			'grey',
			ParamConnectorType.paramInput,
			[ParamConnectorType.paramOutput]);
*/
	}

	getParamName()
	{
		return this.paramName;
	}

}