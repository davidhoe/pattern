/**
 * Created by David on 27/02/2017.
 */
import * as utils from '../../util/utils'
import * as editor from '../editor/editor'
import {PatternState} from '../PatternState'
import paper from 'paper'
/*
 * model that can have Params attached to it
 */
export class Parameterizable{

	constructor()
	{
		//this.outputValues = {};
		this._params = [];
		this._id =  utils.MathUtils.GenerateUUID();// generate a random id
		console.log("id", this._id);
	}

	reset()
	{

	}

	getValue(outputName = "")
	{
		return 0;// super.getValue(outputName);
	}
/*
	getOutputValue(outputName = "")
	{
		if(Parameterizable.HasOwnProperty(this.outputValues, outputName)) {
			return this.outputValues[outputName];
		}
		return null;
	}*/
/*
	setOutputValue(value, outputName = "")
	{
		this.outputValues[outputName] = value;
	}*/

	getID()
	{
		return this._id;
	}

	toJsonObject(data = null)
	{
		data = (data == null)? {} : data;
		var paramData = [];
		data["classname"] = this.constructor.name;
		data["guid"] = this.getID();
		data["params"] = paramData;
		for(var i =0; i < this._params.length;++i)
		{
			var param = this._params[i];
			paramData.push({"key": param.key,"object" : param.object.getID(), "outputName": param.outputName});
		}

		var valuesData = [];
		data["values"] = valuesData;
		var def = this.getEditorDefinition();
		for(var i =0; i < def.inputs.length;++i) {
			var param = def.inputs[i];
			valuesData.push({"name" : param.name, "value": Parameterizable.ConvertParamToJsonObject(this[param.name]) });
		}
		return data;
	}

	static ConvertParamToJsonObject(obj)
	{
		if(	Array.isArray(obj)  )  // is an array, check the first object in array for the type
		{
			var jsonobj =[];
			for(var i =0 ; i< obj.length;++i)
			{
				jsonobj.push(Parameterizable.ConvertToJsonObject(obj[i]));
			}
			return jsonobj;
		}
		else {
			return Parameterizable.ConvertToJsonObject(obj);
		}
	}

	static ConvertToJsonObject(obj)
	{
		var vartype = typeof(obj);
		if (vartype == "object" && obj != null) {
			var classname = obj.constructor.name;
			if (classname == paper.Color.name) {
				return {'classname':paper.Color.name, 'r': obj.red, 'g':obj.green, 'b':obj.blue};
			}
			else if (classname == paper.Point.name) {
				return {'classname':paper.Point.name, 'x': obj.x, 'y':obj.y}
			}
		}
		else{
			return obj;
		}
	}

	fromJsonObject(data, models)
	{
		this._id = data["guid"];

		var paramData = data["params"];
		for(var i =0; i < paramData.length;++i)
		{
			var dparam = paramData[i];
			var paramModel = utils.ArrayUtils.FindObjectByParameter(models,"_id", dparam["object"]);
			this.setParam(dparam["key"], paramModel, dparam["outputName"]);
		}

		var valuesData = data["values"];
		for(var i = 0;i <valuesData.length;++i)
		{
			var dvalue = valuesData[i];
			//var vartype = typeof(dvalue);
			//var value;

			this[dvalue.name] = Parameterizable.ConvertParamFromJsonObject( dvalue.value);
		}
	}

	static ConvertParamFromJsonObject(obj)
	{
		console.log("ConvertParamFromJsonObject", obj);
		if(	Array.isArray(obj) )  // is an array, check the first object in array for the type
		{
			var convertedobj =[];
			for(var i =0 ; i< obj.length;++i)
			{
				convertedobj.push(Parameterizable.ConvertFromJsonObject(obj[i]));
			}
			console.log("ConvertParamFromJsonObject converted", convertedobj);

			return convertedobj ;
		}
		else {
			return Parameterizable.ConvertFromJsonObject(obj);
		}
	}

	static ConvertFromJsonObject(obj)
	{
		var vartype = typeof(obj);
		if (vartype == "object" && obj != null ) {
			if( Parameterizable.HasOwnProperty(obj, "classname"))
			{
				if (obj["classname"] == paper.Color.name) {
					console.log(obj);
					return new paper.Color(obj.r,obj.g,obj.b);

				}
				else if (obj["classname"] == paper.Point.name) {
					return new paper.Point(obj.x,obj.y);
				}
			}
			else{
				console.error("unknown object type, no classname, ignoring ", obj);
				return null;
			}
		}
		else{
			return obj;
		}
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
		var vartype, obj;
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			// use val
			if(key.charAt(0) != '_') // ignore private varaibles
			{
				obj = this[key];
				if(	Array.isArray(obj) && obj.length > 0 )  // is an array, check the first object in array for the type
				{
					obj = obj[0];
					vartype = typeof(obj);
					if(vartype == 'number')
					{
						if(key.toLowerCase().includes('index')) {
							//treat as a int
							def.addInputIntArray(key);
						}
						else{
							// treat as a float
							def.addInputFloatArray(key);
						}
					}
					else if(vartype == "boolean")
					{
						//def.addInputBoolArray(key);
					}
					else if(vartype == "string")
					{
						//def.addInputStringArray(key);
					}
					else if(vartype == "object"  && obj != null)
					{
						console.log("this[key]", key, obj);
						var classname = obj.constructor.name;
						if(classname == paper.Color.name)
						{
							def.addInputColourArray(key);
						}
						else if(classname == paper.Point.name)
						{
							def.addInputPointArray(key);
						}
					}
				}
				else { // not an array

					obj = this[key];
					vartype = typeof(obj);

					if (vartype == 'number') {
						if (key.toLowerCase().includes('index')) {
							//treat as a int
							def.addInputInt(key);
						}
						else {
							// treat as a float
							def.addInputFloat(key);
						}
					}
					else if (vartype == "boolean") {
						def.addInputBool(key);
					}
					else if (vartype == "string") {
						def.addInputString(key);
					}
					else if (vartype == "object" && obj != null) {
						console.log("this[key]", key, obj);
						var classname = obj.constructor.name;
						if (classname == paper.Color.name) {
							def.addInputColour(key);
						}
						else if(classname == paper.Point.name)
						{
							def.addInputPoint(key);
						}
					}
				}


				//	console.log("key:", key);


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
			this[paramKey] = param.object.getValue(param.outputName);
			//todo here - add param type
		}
	}

	setParam(paramName, paramObject, outputName= "")
	{
		if(paramName == "" || paramName == null)
		{
			console.error("error: no paramName is null or empty string, ignoring.");
			return ;
		}
		if(Parameterizable.HasOwnProperty(this, paramName) ){
			console.log("setParam", paramName, "has prop");
			this._params.push({"key": paramName,"object" : paramObject, "outputName": outputName});
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
