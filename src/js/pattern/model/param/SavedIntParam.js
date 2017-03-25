/**
 * Created by David on 04/03/2017.
 */
import paper from 'paper'
import {Param} from './Param'
import {PatternState} from '../PatternState'

// returns a previously saved value
export class SavedIntParam extends Param{
	constructor(valueKey = "i0")
	{
		super();
		this.valueKey = valueKey;
	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputInt("");
	}

	getValue(outputName = "")
	{
		super._processParams();
		return PatternState.Instance().getSavedValue(this.valueKey);
	}
}
