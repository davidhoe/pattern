
export class ParamDef
{
	constructor(name, label, type)
	{
		this.name = name;
		this.label = (label == null) ? name : label;
		this.type = type;
	}
}

export class FloatParamDef extends ParamDef
{
	constructor(name, label= null, rangeMin = null, rangeMax = null)
	{
		super(name, label, FloatParamDef.constructor.name);
		this.rangeMin = rangeMin;
		this.rangeMax = rangeMax;
	}
}

export class IntParamDef extends ParamDef
{
	constructor(name, label= null, rangeMin = null, rangeMax = null)
	{
		super(name, label, IntParamDef.constructor.name);
		this.rangeMin = rangeMin;
		this.rangeMax = rangeMax;
	}
}

export class ColourParamDef extends ParamDef
{
	constructor(name, label= null)
	{
		super(name, label, ColourParamDef.constructor.name);
	}
}