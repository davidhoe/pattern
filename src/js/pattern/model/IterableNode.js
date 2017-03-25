/**
 * Created by davidhoe on 28/02/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * abstract class
 */
export class IterableNode extends Node
{
	constructor()
	{
		super();
		// private
		this._ix = 0;
	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputInt("ix");
	}
	// p

	getValue(outputName = "")
	{
		if(outputName == "ix")
		{
			return this._ix ;
		}
		return null;// super.getValue(outputName);
	}
}
