/**
 * Created by David on 09/03/2017.
 */
import {Param} from './Param'

export class StringParam extends Param{
	constructor(defaultValue)
	{
		super();
		this.defaultValue = defaultValue;
	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputString();
	}

	getValue()
	{
		super._processParams();
		return this.defaultValue;
	}
}
