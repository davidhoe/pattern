import paper from 'paper'
import NodeEditorCanvas from '../ui/NodeEditorCanvas'

export default class NodeDragTool
{
	constructor(canvas)
	{
		var _this = this;
		this.draggingNode = null;
		this.canvas = canvas;

	}

	onMouseDown (event) {
		console.log("dragtool onMouseDown");
		//attach to nodes
		//	canvas.attachEventToPatternNodes('mouseenter', this.onEnter);
	}

	onMouseDrag (event) {
		//console.log(event.delta);

		if(this.draggingNode)
		{

			this.draggingNode.position = this.draggingNode.position.add(event.delta);
			this.draggingNode.onPositionUpdate();
		}

	//	console.log(event.delta);
	}

	onMouseUp (event)
	{
		this.draggingNode = null;
		// do callback
		this.canvas.onToolComplete(this);

	}

	onEnter(evt)
	{
		console.log("enter");
	}

	startDrag(draggingNode)
	{
		//this.activate();
		this.draggingNode = draggingNode;
	}
}