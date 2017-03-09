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
		return def;
	}

	// overide this
	getValue()
	{
		this._processParams();
		return 0;
	}
}
