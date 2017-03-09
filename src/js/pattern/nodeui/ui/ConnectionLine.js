import paper from 'paper'
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
//		this.line = new paper.Path.Line(this.p0,this.p1);
	}

	destroy()
	{
		this.updateModelOnRemove();

		this.remove();
		if(this.startConnectionPoint)
		{
			this.startConnectionPoint.node.onConnectionLineRemoved(this);
		}
		if(this.endConnectionPoint)
		{
			this.endConnectionPoint.node.onConnectionLineRemoved(this);
		}


	}

	setStartConnectionPoint(conpoint)
	{
		this.startConnectionPoint = conpoint;
		conpoint.node.onConnectionLineAdded(this);
	}

	setEndConnectionPoint(conpoint)
	{
		this.endConnectionPoint = conpoint;
		conpoint.node.onConnectionLineAdded(this);

		// logic here?
		this.updateModel();

	}

	// update model when a connection is removed between 2 nodeviews
	updateModelOnRemove()
	{
		var c0 = this.startConnectionPoint;
		var c1 = this.endConnectionPoint;
		if(c1 == null || c0 == null) return;
		console.log("updateModelOnRemove");
		// update model on removal
		if(this.isPatternParentToPatternChild())
		{
			console.log("start pattern(parent)-> end pattern(child)");
			c0.node.nodemodel.removeChild(c1.node.nodemodel);
		}
		else if(this.isPatternChildToPatternParent())
		{
			console.log("start pattern(child) <- end pattern(parent)");
			c1.node.nodemodel.removeChild(c0.node.nodemodel);
		}
		else if(this.isStartConnectionParamInputParent())
		{
			console.log("start param(parent) - end param(child)");
			// start is parent
			c0.node.nodemodel.removeParam(c1.node.nodemodel, c0.paramDef.name);
		}
		else if(this.isEndConnectionParamInputParent())
		{
			console.log("start pattern(child) <- end pattern(child)");
			// end is parent
			c1.node.nodemodel.removeParam(c0.node.nodemodel, c1.paramDef.name);
		}
	}

	///there are 3 types of connection
	// pattern(parent)-> pattern(child)
	// pattern(input - parent ) <- param(output)
	// param (input - parent ) <- param(output)
	//
	// update model for when a connection is made between to nodeviews
	updateModel()
	{
		//
		var c0 = this.startConnectionPoint;
		var c1 = this.endConnectionPoint;

		var parent,child;
		if(this.isPatternParentToPatternChild())
		{
			console.log("start pattern(parent)-> end pattern(child)");
			c0.node.nodemodel.addChild(c1.node.nodemodel);
		}
		else if(this.isPatternChildToPatternParent())
		{
			console.log("start pattern(child) <- end pattern(child)");
			c1.node.nodemodel.addChild(c0.node.nodemodel);
		}
		else if(this.isStartConnectionParamInputParent())
		{
			console.log("parent ", c0);
			console.log("should be a param ", c1);
			console.log("c0.paramdef.name ", c0.paramDef.name);

			if(c0.connectedLine) c0.connectedLine.destroy();
			c0.connectedLine = this;
			c0.node.nodemodel.setParam(c0.paramDef.name, c1.node.nodemodel);
		}
		else if(this.isEndConnectionParamInputParent())
		{
			console.log("should be parent c1", c1);
			console.log("should be a param c0", c0);
			console.log("c1.paramdef.name ", c1.paramDef.name);

			// c0.node should be a paramNodeView
			// c1.node is a patternnode or param node view
			if(c1.connectedLine)
				c1.connectedLine.destroy();
			c1.connectedLine = this;
			c1.node.nodemodel.setParam(c1.paramDef.name, c0.node.nodemodel);
			//}
		}
	}


	isPatternParentToPatternChild()
	{
		var c0 = this.startConnectionPoint;
		var c1 = this.endConnectionPoint;
		return (c0.connectorType == PatternConnectorType.patternNodeParent ) && (c1.connectorType == PatternConnectorType.patternNodeChild) ;
	}

	isPatternChildToPatternParent()
	{
		var c0 = this.startConnectionPoint;
		var c1 = this.endConnectionPoint;
		return (c1.connectorType == PatternConnectorType.patternNodeParent ) && (c0.connectorType == PatternConnectorType.patternNodeChild) ;
	}

	isStartConnectionParamInputParent()
	{
		var c0 = this.startConnectionPoint;
		return c0.connectorType.includes( ParamConnectorType.paramInput );
	}

	isEndConnectionParamInputParent()
	{
		var c1 = this.endConnectionPoint;
		return c1.connectorType.includes(ParamConnectorType.paramInput );
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