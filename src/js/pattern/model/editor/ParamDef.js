import * as utils from '../../util/utils'
export class ParamDef
{
	constructor(name, label, type)
	{
		this.name = name;
		this.label = (label == null) ? utils.StringUtils.ConvertToLabel(name) : label;
		this.type = type;
		this.keyValuePairs = null; // for populating a dropdown selection field
	}

	addKeyValuePair(key, value)
	{
		if(this.keyValuePairs == null)
		{
			this.keyValuePairs = {};
		}
		this.keyValuePairs[key] = value;
	}

	getKeyValuePairs()
	{
		return this.keyValuePairs;
	}

	hasKeyValuePairs()
	{
		return this.keyValuePairs != null;
	}

	getCompatibleTypes()
	{
		// default, only support its own type
		return [this.constructor.name];
	}
}

export class StringParamDef extends ParamDef
{
	constructor(name, label= null)
	{
		super(name, label, StringParamDef.name);
	}

	getCompatibleTypes()
	{
		return [StringParamDef.name];
	}
}


export class BoolParamDef extends ParamDef
{
	constructor(name, label= null)
	{
		super(name, label, BoolParamDef.name);
	}

	getCompatibleTypes()
	{
		return [BoolParamDef.name, IntParamDef.name];
	}
}

export class FloatParamDef extends ParamDef
{
	constructor(name, label= null, rangeMin = null, rangeMax = null)
	{
		super(name, label, FloatParamDef.name);
		this.rangeMin = rangeMin;
		this.rangeMax = rangeMax;
	}

	getCompatibleTypes()
	{
		return [FloatParamDef.name, IntParamDef.name];
	}
}

export class IntParamDef extends ParamDef
{
	constructor(name, label= null, rangeMin = null, rangeMax = null)
	{
		super(name, label, IntParamDef.name);
		this.rangeMin = rangeMin;
		this.rangeMax = rangeMax;
	}

	getCompatibleTypes()
	{
		return [FloatParamDef.name, IntParamDef.name];
	}
}

export class ColourParamDef extends ParamDef
{
	constructor(name, label= null)
	{
		super(name, label, ColourParamDef.name);
	}

	getCompatibleTypes()
	{
		return [ColourParamDef.name];
	}
}

export class PointParamDef extends ParamDef
{
	constructor(name, label= null)
	{
		super(name, label, PointParamDef.name);
	}
}


export class ColourArrayParamDef extends ParamDef
{
	constructor(name, label= null)
	{
		super(name, label, ColourArrayParamDef.name);
	}
}

export class FloatArrayParamDef extends ParamDef
{
	constructor(name, label= null)
	{
		super(name, label, FloatArrayParamDef.name);
	}
}

export class IntArrayParamDef extends ParamDef
{
	constructor(name, label= null)
	{
		super(name, label, IntArrayParamDef.name);
	}
}

export class PointArrayParamDef extends ParamDef
{
	constructor(name, label= null)
	{
		super(name, label, PointArrayParamDef.name);
	}
}
