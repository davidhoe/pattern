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
		this.remove();
		if(this.startConnectionPoint)
		{
			this.startConnectionPoint.node.removeConnectionLine(this);
		}
		if(this.endConnectionPoint)
		{
			this.endConnectionPoint.node.removeConnectionLine(this);
		}
	}

	setStartConnectionPoint(conpoint)
	{
		this.startConnectionPoint = conpoint;
		conpoint.node.addConnectionLine(this);
	}

	setEndConnectionPoint(conpoint)
	{
		this.endConnectionPoint = conpoint;
		conpoint.node.addConnectionLine(this);

		// logic here?
		this.updateModel();

	}

	///there are 3 types of connection
	// pattern(parent)->pattern(child)
	// param(output)->pattern(input)
	// param (output) -> param(input )
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

		var isPatternToPattern  = (c0.node.type == PatternNodeView.NodeType && (c1.node.type == PatternNodeView.NodeType)) ;
		var isParamToParam  = (c0.node.type == ParamNodeView.NodeType && (c1.node.type == ParamNodeView.NodeType)) ;
		var isPatternToParam  = (c0.node.type == PatternNodeView.NodeType && (c1.node.type == ParamNodeView.NodeType)) ;
		var isParamToPattern  = (c0.node.type == ParamNodeView.NodeType && (c1.node.type == PatternNodeView.NodeType)) ;

		var parent,child;
		if(isPatternToPattern)
		{
			// pattern(parent)->pattern(child)
			//find the parent and child
			var isParentToChild = (c0.connectorType == PatternConnectorType.patternNodeParent ) && (c1.connectorType == PatternConnectorType.patternNodeChild) ;
			var isChildToParent = (c1.connectorType == PatternConnectorType.patternNodeParent ) && (c0.connectorType == PatternConnectorType.patternNodeChild) ;
			if(isParentToChild)
			{
				console.log("start pattern(parent)-> end pattern(child)");
				c0.node.nodemodel.addChild(c1.node.nodemodel);
			}
			else if(isChildToParent)
			{
				console.log("start pattern(child) <- end pattern(child)");
				c1.node.nodemodel.addChild(c0.node.nodemodel);

			}
		}
		else if(isParamToParam)
		{

		}
		else if(isPatternToParam || isParamToPattern){

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