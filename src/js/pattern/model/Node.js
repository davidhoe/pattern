/**
 * Created by David on 27/02/2017.
 */

import {PatternState} from './PatternState'
export class Node{
    constructor()
    {
        this.childNodes = [];
        this._savedPath = null;
	    this._savedMatrix = null;
	    this._savedColour = null;
	    this._savedGroup = null;
	    this._params = [];
    }

	_saveStateColour()
	{
		this._savedColour = PatternState.Instance().colour;
	}

	_restoreStateColour()
	{
		if(this._savedMatrix != null) {
			PatternState.Instance().colour = this._savedColour;
		}
	}

	_saveStateGroup()
	{
		this._savedGroup = PatternState.Instance().group;
	}

	_restoreStateGroup()
	{
		// group can be null
		PatternState.Instance().group = this._savedGroup;
	}

	_saveStateMatrix()
	{
		this._savedMatrix = PatternState.Instance().matrix;
	}

	_restoreStateMatrix()
	{
		if(this._savedMatrix != null) {
			PatternState.Instance().matrix = this._savedMatrix;
		}
	}


    _saveStatePath()
    {
      this._savedPath = PatternState.Instance().path;
    }

    _restoreStatePath()
    {
      if(this._savedPath != null) {
        PatternState.Instance().path = this._savedPath;
      }
    }

    _getPushedPath()
    {
      return this._savedPath;
    }

    _getStatePath()
    {
      return PatternState.Instance().path;
    }

    _getStatePathLength()
    {
	    var path = PatternState.Instance().path;
	    if(path) return path.length;
	    return 0;
    }

    setParent(node)
    {
        node.addChild(this);
    }

    // helper method to add child to previous node
    push()
    {
	    if(PatternState.Instance().headNode) {
            PatternState.Instance().headNode.addChild(this);
        }
        PatternState.Instance().headNode = this;
	    return this;
    }

    addChild(node)
    {
        this.childNodes.push(node);
    }

    process()
    {
	   // console.log("-------------------------node here");

	    // iterate through params
		this._processParams();
        // process children
	    this.processChildNodes();
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
		if(Node.HasOwnProperty(this, paramName) ){
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

    processChildNodes()
    {
        for(var i = 0 ; i < this.childNodes.length; ++i)
        {
            this.childNodes[i].process();
        }
    }

}
