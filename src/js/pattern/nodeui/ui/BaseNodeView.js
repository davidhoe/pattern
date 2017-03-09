import paper from 'paper'
import {ArrayUtils} from '../../util/ArrayUtils'
import * as model from '../../model/model'
import ConnectionPoint from './ConnectionPoint'
/**
 * base view of a draggable item. An node is either a pattern node or a parameter (Float,Int...)
 */
export default class BaseNodeView extends paper.Group
{
	constructor(nodetype, model, testcolour = 'red')
	{
		super();
		this.type = nodetype;
		this.model  = model;
		this.dragging = false;
		this.connectors = [];
		this.connectionLines = [];
		//this.applyMatrix = false;
		//

		// add the name of the
	}

	destroy()
	{
		this.remove();
		this.removeAllConnections();
	}



	onPositionUpdate()
	{
		for(var i =0;i < this.connectionLines.length;++i)
		{
			this.connectionLines[i].updateConnectionLine();
		}
	}

	containsExistingConnection(point1, point2)
	{
		for(var i =0; i< this.connectionLines.length;++i)
		{
			if(this.connectionLines[i].hasSameConnections(point1,point2))
			{
				return true;
			}
		}
		return false;
	}

	onConnectionLineRemoved(line)
	{
		console.log("before",this.connectionLines);
		this.connectionLines = ArrayUtils.RemoveObject(this.connectionLines,line);
		console.log("after",this.connectionLines);
	}

	onConnectionLineAdded(line)
	{
		if(!ArrayUtils.ContainsObject(this.connectionLines,line))
		{
			this.connectionLines.push(line);
		}
	}

	removeAllConnections()
	{
		var lines = this.connectionLines;
		for(var i =0; i< lines.length;++i)
		{
			lines[i].destroy();
		}
		this.connectionLines = [];
	}
}