/**
 * Created by David on 09/03/2017.
 */
import {Param} from './Param'

export class BoolParam extends Param{
	constructor(defaultValue)
	{
		super();
		this.value = defaultValue;
	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputBool();
	}

	getValue()
	{
		super._processParams();
		return this.value;
	}


}
