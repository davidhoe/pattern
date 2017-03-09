import * as editor from './editor'
/**
 * definition for a base Node view, this covers the common data for Param nodes and Pattern nodes
 */
export class NodeEditorDefinition
{
	constructor(label)
	{
		this.label = label;
		this.inputs = [];
		this.output = null;
	}

	setOutputString()
	{
		this.output = new editor.StringParamDef("");
		return this;
	}

	setOutputBool()
	{
		this.output = new editor.BoolParamDef("");
		return this;
	}

	setOutputFloat()
	{
		this.output = new editor.FloatParamDef("");
		return this;
	}

	setOutputInt()
	{
		this.output = new editor.IntParamDef("");
		return this;
	}

	setOutputColour()
	{
		this.output = new editor.ColourParamDef("");
		return this;
	}



	addInputFloat(name,label = null, rangemin = null, rangemax = null)
	{
		this.addInput( new editor.FloatParamDef(name, label, rangemin , rangemax));
	}

	addInputInt(name,label = null, rangemin = null, rangemax = null)
	{
		this.addInput( new editor.IntParamDef(name, label, rangemin , rangemax));
	}

	addInputColour(name,label = null)
	{
		this.addInput( new editor.ColourParamDef(name, label));
	}

	addInputBool(name,label = null)
	{
		this.addInput( new editor.BoolParamDef(name, label));
	}

	addInputString(name,label = null)
	{
		this.addInput( new editor.StringParamDef(name, label));
	}

	addInput(paramDef)
	{
		// unique names only, override this already eixsts
		this._removeInputByName(paramDef.name);
		this.inputs.push(paramDef);
	}

	_removeInputByName(name)
	{
		var temp = this.inputs;
		this.inputs = [];
		for(var i =0; i< temp.length;++i)
		{
			if(temp[i].name != name)
			{
				this.inputs.push(temp[i]);
			}
		}
	}

}