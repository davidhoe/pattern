/**
 * Created by David on 27/02/2017.
 */
import {Param} from './Param'

//import {PatternState} from './PatternState'
export class IntParam extends Param{
	constructor(defaultValue = 0)
	{
		super();
		this.value = defaultValue;

	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputInt();
	}

	getValue()
	{
		super._processParams();
		return this.value;
	}


}
