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
		this._nTimesProcessed = 0;
		this.processOnce = false;
	}

	reset()
	{
		super.reset();
		this._nTimesProcessed = 0;
	}

	getEditorDefinition()
	{
		var def = super.getEditorDefinition(["Param"]);
//		def.setOutputFloat();
		return def;
	}

	// overide this
	getValue(outputName = "")
	{
		this._processParams();
		return 0;// super.getValue(outputName);
	}



}
