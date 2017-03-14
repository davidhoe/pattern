/**
 * Created by David on 24/03/2017.
 */
import {Parameterizable} from './Parameterizable'
/**
 * base class for a parameter,, should it have a return type?
 */
export class Param extends Parameterizable
{
	constructor()
	{
		super();
	}

	getEditorDefinition()
	{
		var def = super.getEditorDefinition(["Param"]);
		def.setOutputFloat();
		return def;
	}

	// overide this
	getValue(outputName = "")
	{
		this._processParams();
		return super.getOutputValue(outputName);
	}



}
