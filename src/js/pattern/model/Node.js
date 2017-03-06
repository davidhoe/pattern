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

		this._parentRefs = []; // array of parent references
		// automatically push and set as a child node
		this.push();
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
		return this;
    }

    removeChild(node)
	{
		var temp = [];
		for(var i =0; i< this.childNodes.length;++i)
		{
			if(this.childNodes[i] != node )
			{
				temp.push(this.childNodes[i]);
			}
		}
		this.childNodes =  temp;

		//
		node._removeParentReference(this);
	}

    removeAllParents()
	{
		var temp = this._parentRefs; // clone it?
		for(var i = 0; i< temp.length;++i)
		{
			//console.log("removeall parents", i, temp[i])
			temp[i].removeChild(this);
		}

		this._parentRefs = [];
		return this;
	}

    // helper method to add to the current head and set as the head
    push()
    {
		var curHead = PatternState.Instance().headNode;
		// dont add to itself as this will be an infinite loop
	    if(curHead != null && curHead != this) {
			curHead.addChild(this);
        }
        this.setHead();
        return this;
    }

    // helper method to set just set a the head only
	setHead()
	{
		PatternState.Instance().headNode = this;
		return this;
	}

    addChild(node)
    {
		// test check dont add to itself
		if(node == this)
		{
			console.error("should not add node as a child node of itself");
			return;
		}
        this.childNodes.push(node);
		node._parentRefs.push(this);
		return this;
    }

    _addParentReference(parent)
	{
		this._parentRefs.push(parent);
	}

	_removeParentReference(parent)
	{
		var temp = [];
		for(var i =0; i< this._parentRefs.length;++i)
		{
			if(this._parentRefs[i] != parent )
			{
				temp.push(this._parentRefs[i]);
			}
		}
		this._parentRefs =  temp;
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
