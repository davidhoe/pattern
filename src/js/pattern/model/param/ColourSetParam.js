/**
 * Created by David on 04/03/2017.
 */
import paper from 'paper'
import {Param} from './Param'

export class ColourSetParam extends Param{
	constructor()
	{
		super();
	    this.colours = [];
	}

	getValue(outputName = "")
	{
		super._processParams();
		return this.colours;
	}
}
