import paper from 'paper'
import NodeEditorCanvas from '../ui/NodeEditorCanvas'

export default class NodeDragTool
{
	constructor(canvas)
	{
		var _this = this;
		this.draggingNode = null;
		this.canvas = canvas;
		this._dragDetected =  false;

	}

	onMouseDown (event) {
		console.log("dragtool onMouseDown");
		this._dragDetected =  false;

		//attach to nodes
		//	canvas.attachEventToPatternNodes('mouseenter', this.onEnter);
	}

	onMouseDrag (event) {
		const DRAG_DETECT_DIST = 4;
		//console.log(event.delta);

		if(!this._dragDetected) {
			var p = event.point.subtract(event.downPoint);
			if (p.length > DRAG_DETECT_DIST) {
				this._dragDetected = true;
				console.log("drag detected");
				this.canvas.onDragDetected();
			}
		}

		if(this._dragDetected)
		{
			if(this.draggingNode)
			{
				this.draggingNode.position = this.draggingNode.position.add(event.delta);
				this.draggingNode.onPositionUpdate();
			}
		}

	//	console.log(event.delta);
	}

	onMouseUp (event)
	{
		this._dragDetected = false;
		this.draggingNode = null;
		// do callback
		this.canvas.onToolComplete(this);

		console.log("drag mouse up");

	}

	isDragging()
	{
		return this._dragDetected;
	}

	onEnter(evt)
	{
		console.log("enter");
	}

	startDragDetect(draggingNode)
	{
		this._dragDetected = false;
		//this.activate();
		this.draggingNode = draggingNode;
	}
}