import paper from 'paper'
import * as utils from '../../util/utils'
import {PatternConnectorType as PatternConnectorType} from '../model/ConnectorTypes'
import {ParamConnectorType as ParamConnectorType} from '../model/ConnectorTypes'
import PatternNodeView from './PatternNodeView'
import ParamNodeView from './ParamNodeView'

/*
 *  visually represents a relationship between 2 view nodes
 */
export default class ConnectionLine extends paper.Path
{
	constructor()
	{
		super();
		this.p0 = new paper.Point(0,0);
		this.p1 = new paper.Point(0,0);
		this.startConnectionPoint = null;
		this.endConnectionPoint = null;
		this.segments = [this.p0,this.p1];
		this.strokeColor = new paper.Color(0.3);
		this.strokeWidth = 5;
//		this.line = new paper.Path.Line(this.p0,this.p1);
		this.selected = false;
		//this._id =  utils.MathUtils.GenerateUUID();// generate a random id

	}

	/*
	getID()
	{
		return this._id;
	}*/

	getMidPoint()
	{
		return new paper.Point(this.p0.x*0.5 + this.p1.x*0.5, this.p0.y*0.5 + this.p1.y*0.5);
	}

	getOtherPoint(connector)
	{
		return (connector == this.startConnectionPoint)? this.endConnectionPoint : this.startConnectionPoint;
	}

	destroy()
	{
		//this.updateModelOnRemove();


		this.remove();
		if(this.startConnectionPoint)
		{
			this.startConnectionPoint.onConnectionRemoved(this);
			this.startConnectionPoint.nodeview.onConnectionLineRemoved(this);
		}
		if(this.endConnectionPoint)
		{
			this.endConnectionPoint.onConnectionRemoved(this);
			this.endConnectionPoint.nodeview.onConnectionLineRemoved(this);
		}

		// update model
		if(this.startConnectionPoint)
			this.startConnectionPoint.updateModelOnConnectionRemoved(this);
		else if(this.endConnectionPoint)
			this.endConnectionPoint.updateModelOnConnectionRemoved(this);


	}

	setStartConnectionPoint(conpoint)
	{
		this.startConnectionPoint = conpoint;
		conpoint.nodeview.onConnectionLineAdded(this);
	}

	setEndConnectionPoint(conpoint)
	{
		this.endConnectionPoint = conpoint;
		conpoint.nodeview.onConnectionLineAdded(this);

		// logic here?
		//this.updateModel();
		this.startConnectionPoint.onConnectionAdded(this);
		this.endConnectionPoint.onConnectionAdded(this);

		this.startConnectionPoint.updateModelOnConnectionAdded(this);

	}

	updateConnectionLine()
	{
		if(this.startConnectionPoint)
		{
			this.p0 = this.startConnectionPoint.bg.localToGlobal();

			//console.log("here", this.startConnectionPoint);
		}
		if(this.endConnectionPoint)
		{
			this.p1 = this.endConnectionPoint.bg.localToGlobal();
		}
		this.segments = [this.p0,this.p1];


	}

	hasSameConnections(conp1,conp2)
	{
		return(  (conp1 == this.startConnectionPoint || conp1 == this.endConnectionPoint ) && (conp2 == this.startConnectionPoint || conp2 == this.endConnectionPoint) );
	}


}