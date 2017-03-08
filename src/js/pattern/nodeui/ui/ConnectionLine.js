import paper from 'paper'

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
		this.strokeColor = 'green';
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
	}
	updateConnectionLine()
	{
		if(this.startConnectionPoint)
		{
			this.p0 = this.startConnectionPoint.rect.localToGlobal();

			//console.log("here", this.startConnectionPoint);
		}
		if(this.endConnectionPoint)
		{
			this.p1 = this.endConnectionPoint.rect.localToGlobal();
		}
		this.segments = [this.p0,this.p1];

	}

	hasSameConnections(conp1,conp2)
	{
		return(  (conp1 == this.startConnectionPoint || conp1 == this.endConnectionPoint ) && (conp2 == this.startConnectionPoint || conp2 == this.endConnectionPoint) );
	}


}