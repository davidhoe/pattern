/**
 * Created by David on 04/03/2017.
 */
import paper from 'paper'
import {Param} from './Param'
import {PatternState} from '../PatternState'

// returns a previously saved colour set
export class SavedPointArrayParam extends Param{
	constructor(valueKey = "pset0")
	{
		super();
		this.valueKey = valueKey;
	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputPointArray("");
	}

	getValue(outputName = "")
	{
		super._processParams();
		return PatternState.Instance().getSavedValue(this.valueKey);
	}
}
