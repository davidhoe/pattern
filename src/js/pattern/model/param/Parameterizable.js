/**
 * Created by David on 27/02/2017.
 */
import * as utils from '../../util/utils'
import * as editor from '../editor/editor'
import {PatternState} from '../PatternState'

/*
 * model that can have Params attached to it
 */
export class Parameterizable{

	constructor()
	{
		this._params = [];
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
		if(Parameterizable.HasOwnProperty(this, paramName) ){
			console.log("setParam", paramName, "has prop");
			this._params.push({"key": paramName,"object" : paramObject});
		}
		else{
			console.error("error: no param with the name exists for this . Param ", paramName)
		}
	}

	removeParam(paramObject)
	{
		var newarray = [];
		for(var i =0; i< this._params.length;++i)
		{
			var pair = this._params[i];
			if(pair["object"] != paramObject)
			{
				newarray.push(pair);
			}
		}
		this._params = newarray;
	}

	static HasOwnProperty(obj, prop)
	{
		var proto = obj.__proto__ || obj.constructor.prototype;
		return (prop in obj) &&
			(!(prop in proto) || proto[prop] !== obj[prop]);
	}


}
