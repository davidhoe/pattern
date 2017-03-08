/**
 * Created by David on 27/02/2017.
 */
import {Param} from './Param'

//import {PatternState} from './PatternState'
export class IntParam extends Param{
	constructor(defaultValue)
	{
		super();
		this.defaultValue = defaultValue;

	}

	getValue()
	{
		super._processParams();
		return this.defaultValue;
	}


}
