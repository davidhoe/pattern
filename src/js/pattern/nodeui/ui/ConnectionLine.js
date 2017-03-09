import paper from 'paper'
import {ParamConnectorType} from './ParamNodeView'
import {PatternConnectorType} from './PatternNodeView'
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

	updateModelOnRemove()
	{
		var c0 = this.startConnectionPoint;
		var c1 = this.endConnectionPoint;
		if(c1 == null || c0 == null) return;

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
			c0.node.removeParam(c1.node.paramModel);
		}
		else if(this.isEndConnectionParamInputParent())
		{
			//console.log("start pattern(child) <- end pattern(child)");
			// end is parent
			c1.node.removeParam(c0.node.paramModel);
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
		return c0.connectorType == ParamConnectorType.paramInput;
	}

	isEndConnectionParamInputParent()
	{
		var c1 = this.endConnectionPoint;
		return c1.connectorType == ParamConnectorType.paramInput;
	}

	///there are 3 types of connection
	// pattern(parent)-> pattern(child)
	// pattern(input - parent ) <- param(output)
	// param (input - parent ) <- param(output)
	//
	updateModel()
	{
		//
		var c0 = this.startConnectionPoint;
		var c1 = this.endConnectionPoint;
		console.log("c0.node.nodemodel", c0.node.nodemodel);
		console.log("c1.node.nodemodel", c1.node.nodemodel);

		console.log("c0.node.type", c0.node.type);
		console.log("c1.node.type", c1.node.type);
		console.log("c0.connectorType", c0.connectorType);
		console.log("c1.connectorType", c1.connectorType);
		/*
		var isPatternToPattern  = (c0.node.type == PatternNodeView.NodeType && (c1.node.type == PatternNodeView.NodeType)) ;
		var isParamToParam  = (c0.node.type == ParamNodeView.NodeType && (c1.node.type == ParamNodeView.NodeType)) ;
		var isPatternToParam  = (c0.node.type == PatternNodeView.NodeType && (c1.node.type == ParamNodeView.NodeType)) ;
		var isParamToPattern  = (c0.node.type == ParamNodeView.NodeType && (c1.node.type == PatternNodeView.NodeType)) ;
		*/
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

		}
		else if(this.isEndConnectionParamInputParent())
		{

		}

		// find the input or the parent
		//var this.endConnectionPoint.connectorType;


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