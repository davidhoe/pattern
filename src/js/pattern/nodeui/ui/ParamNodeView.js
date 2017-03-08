import paper from 'paper'
import BaseNodeView from './BaseNodeView'
import * as model from '../../model/model'

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

		// add a type
	}

}