/**
 * Created by David on 24/03/2017.
 */

/**
 * base class for a parameter
 */
export class Param{
	constructor()
	{
		this._params = [];
	}

	getValue()
	{
		this._processParams();
	}

	_processParams()
	{
		for(var i =0; i < this._params.length;++i)
		{
			var param = this._params[i];
			var paramKey = param.key;
			this[paramKey] = param.object.getValue();
		}
	}

	setParam(paramName, paramObject)
	{
		if(Param.HasOwnProperty(this, paramName) ){
			console.log("setParam", paramName, "has prop");
			this._params.push({"key": paramName,"object" : paramObject});
		}
		else{
			console.error("error: no param with the name exists for this node. Param ", paramName)
		}
	}

	static HasOwnProperty(obj, prop)
	{
		var proto = obj.__proto__ || obj.constructor.prototype;
		return (prop in obj) &&
			(!(prop in proto) || proto[prop] !== obj[prop]);
	}

}
