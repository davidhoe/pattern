import paper from 'paper'
import BaseNodeView from './BaseNodeView'
import * as model from '../../model/model'
//import {PatternConnectorType as PatternConnectorType} from './PatternNodeView'
import {PatternConnectorType as PatternConnectorType} from '../model/ConnectorTypes'
import {ParamConnectorType as ParamConnectorType} from '../model/ConnectorTypes'
import * as utils from '../../util/utils'

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

		this.setBgColour(new paper.Color(0.85));
		/*
		var bound = new paper.Rectangle(0,0,150,50);
		//add a rect background
		this.rect = this._addBackground(bound, new paper.Color(0.9));
		// add a text label
		this.text = this._addCenteredTextLabel(model.label, bound, 'black');
*/

		var startp = new paper.Point(this.bound.width / 2, this.bound.height);
		this._createOutputConnectors(startp);
	}



	onConnectionLineAdded(line)
	{
		//remove any other lines already connected if this is the Input

		super.onConnectionLineAdded(line);
	}

	getParamName()
	{
		return this.paramName;
	}

}