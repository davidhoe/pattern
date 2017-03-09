/**
 * Created by David on 27/02/2017.
 */
import * as utils from '../util/utils'
import * as editor from './editor/editor'
import {PatternState} from './PatternState'
import {Parameterizable} from './param/Parameterizable'

export class Node extends Parameterizable{

    constructor()
    {
	    super();
        this._childNodes = [];
        this._savedPath = null;
	    this._savedMatrix = null;
	    this._savedColour = null;
	    this._savedGroup = null;

		this._parentRefs = []; // array of parent references
		// automatically push and set as a child node
		if(PatternState.Instance().autoPushNodeOnCreation) this.push();
    }



	getEditorDefinition()
	{
		var classname = this.constructor.name;
		var label = (classname.toLowerCase() == "node") ? classname : utils.StringUtils.ConvertToLabel(classname, ["Node"]);
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
		for(var i =0; i< this._childNodes.length;++i)
		{
			if(this._childNodes[i] != node )
			{
				temp.push(this._childNodes[i]);
			}
		}
		this._childNodes =  temp;

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
		// remove from the head
		/*
		if(PatternState.Instance().headNode == this)
		{
			PatternState.Instance().headNode = null;
		}*/
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
        this._childNodes.push(node);
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

    processChildNodes()
    {
        for(var i = 0 ; i < this._childNodes.length; ++i)
        {
            this._childNodes[i].process();
        }
    }

}
