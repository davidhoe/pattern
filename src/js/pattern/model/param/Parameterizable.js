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

	getEditorDefinition(ignoreTextArray = [])
	{
		var classname = this.constructor.name;
		var label = utils.StringUtils.ConvertToLabel(classname, ignoreTextArray);

		//var label = (classname.toLowerCase() == "node") ? classname : utils.StringUtils.ConvertToLabel(classname, ["Node"]);
		var def = new editor.NodeEditorDefinition(label);

		//console.log("----def:" + this.constructor.name);
		// try to automatically add the definitions
		var keys = Object.keys(this);
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			// use val
			if(key.charAt(0) != '_')
			{
				//	console.log("key:", key);
				if(key.toLowerCase().includes('index')) {
					//treat as a int
					def.addInputInt(key);
				}
				else if(key.toLowerCase().includes('colour'))
				{
					def.addInputColour(key);
				}
				else{
					// treat as a float
					def.addInputFloat(key);
				}
			}
		}
		return def;
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
		if(paramName == "" || paramName == null)
		{
			console.error("error: no paramName is null or empty string, ignoring.");
			return ;
		}
		if(Parameterizable.HasOwnProperty(this, paramName) ){
			console.log("setParam", paramName, "has prop");
			this._params.push({"key": paramName,"object" : paramObject});
		}
		else{
			console.error("error: no param with the name exists for this . Param ", paramName)
		}
	}

	// remove param, if paramName is null then it removes the param from all keys, otherwise just that key
	removeParam(paramObject, paramName =null)
	{
		console.log("removeParam", paramObject, "paramName ", paramName);
		var newarray = [];
		for(var i =0; i< this._params.length;++i)
		{
			var pair = this._params[i];
			if(pair["object"] != paramObject)
			{
				newarray.push(pair);
			}
			else if(paramName != null && paramName !=  pair["key"]){
				newarray.push(pair); // different paramName
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
