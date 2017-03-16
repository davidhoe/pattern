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

		//todo  change this to an array
		this.outputs = [];
	}

	setOutputString(outputName = "")
	{
		this.addOutput(new editor.StringParamDef(outputName));
		return this;
	}

	setOutputBool(outputName = "")
	{
		this.addOutput(new editor.BoolParamDef(outputName));
		return this;
	}

	//todo  add an id to the inputs, null is default
	setOutputFloat(outputName = "")
	{
		console.log("**setOutputFloat");
		this.addOutput( new editor.FloatParamDef(outputName));
		return this;
	}

	setOutputInt(outputName = "")
	{
		this.addOutput( new editor.IntParamDef(outputName));
		return this;
	}

	setOutputColour(outputName = "")
	{
		this.addOutput( new editor.ColourParamDef(outputName));
		return this;
	}

	setOutputPoint(outputName = "")
	{
		this.addOutput( new editor.PointParamDef(outputName));
		return this;
	}

	setOutputColourArray(outputName = "")
	{
		this.addOutput( new editor.ColourArrayParamDef(outputName));
		return this;
	}
	setOutputIntArray(outputName = "")
	{
		this.addOutput( new editor.IntArrayParamDef(outputName));
		return this;
	}

	setOutputFloatArray(outputName = "")
	{
		this.addOutput( new editor.FloatArrayParamDef(outputName));
		return this;
	}

	setOutputPointArray(outputName = "")
	{
		this.addOutput( new editor.PointArrayParamDef(outputName));
		return this;
	}

	addOutput( paramDef)
	{
		this.outputs.push(paramDef);
	}

	/////////////////////////////////////////////////////////////////////////

	addInputFloat(name,label = null, rangemin = null, rangemax = null)
	{
		this.addInput( new editor.FloatParamDef(name, label, rangemin , rangemax));
	}

	addInputIntSelectDropdown(name,label, keyValueDictionary)
	{
		var paramDef = new editor.IntParamDef(name, label);
		paramDef.keyValuePairs = keyValueDictionary;
		this.addInput(paramDef);
	}

	addInputStringSelectDropdown(name,label, keyValueDictionary)
	{
		var paramDef = new editor.StringParamDef(name, label);
		paramDef.keyValuePairs = keyValueDictionary;
		this.addInput(paramDef);
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

	addInputPoint(name,label = null)
	{
		this.addInput( new editor.PointParamDef(name, label));
	}

	addInputString(name,label = null)
	{
		this.addInput( new editor.StringParamDef(name, label));
	}

	addInputColourArray(name,label = null)
	{
		this.addInput( new editor.ColourArrayParamDef(name, label));
	}

	addInputPointArray(name,label = null)
	{
		this.addInput( new editor.PointArrayParamDef(name, label));
	}

	addInputFloatArray(name,label = null)
	{
		this.addInput( new editor.FloatArrayParamDef(name, label));
	}

	addInputIntArray(name,label = null)
	{
		this.addInput( new editor.IntArrayParamDef(name, label));
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