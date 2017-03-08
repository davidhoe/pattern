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

	setOutputFloat()
	{
		this.output = new editor.FloatParamDef("");
	}

	setOutputInt()
	{
		this.output = new editor.FloatParamDef("");
	}

	setOutputColour()
	{
		this.output = new editor.ColourParamDef("");
	}

	addInputFloat(name,label = null, rangemin = null, rangemax = null)
	{
		this.inputs.push( new editor.FloatParamDef(name, label, rangemin , rangemax));
	}

	addInputInt(name,label = null, rangemin = null, rangemax = null)
	{
		this.inputs.push( new editor.IntParamDef(name, label, rangemin , rangemax));
	}

	addInputColour(name,label = null)
	{
		this.inputs.push( new editor.ColourParamDef(name, label));
	}

}