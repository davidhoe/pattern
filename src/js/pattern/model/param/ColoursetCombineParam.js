/**
 * Created by David on 04/03/2017.
 */
import paper from 'paper'
import {Param} from './Param'

export class ColoursetCombineParam extends Param{
	constructor(set0 = [new paper.Color()], set1 = [new paper.Color()])
	{
		super();
		this.set0 = set0;
		this.set1 = set1;
	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputColourArray();
	}

	getValue(outputName = "")
	{
		super._processParams();
		return this.set0.concat(this.set1);
	}
}
