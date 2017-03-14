/**
 * Created by David on 04/03/2017.
 */
import paper from 'paper'
import {Param} from './Param'

export class ColourParam extends Param{
	constructor()
	{
		super();
		this.r = 0; // range [0,1]
		this.g = 0;
		this.b = 0;
	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputColour();
	}

	getValue(outputName = "")
	{
		super._processParams();
		return new paper.Color(this.r,this.g,this.b);
	}
}
