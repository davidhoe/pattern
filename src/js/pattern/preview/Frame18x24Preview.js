import {Preview} from './Preview'
import paper from 'paper'
import * as model from '../model/model'

export class Frame18x24Preview extends Preview
{
	constructor(canvas)
	{
		super();
		this.canvas = canvas;
		canvas.activate();
		this.bgLayer  = new paper.Layer();
		this.nodeLayer  = new paper.Layer();
		this.overlayLayer  = new paper.Layer();

		this.overlayLayer.activate();
		var raster = new paper.Raster('assets/frame18x24.png');
		raster.position.x = 500;
		raster.position.y = 500;

		this.bgLayer.activate();
		this.bg = new paper.Raster('assets/frame_bg.png');


		this.bg.onLoad =function() {
			this.width = 2000;
			this.height = 2000;
			this.position.x = 1000;
			this.position.y = 1000;
			console.log("--this " , this);
		}

	}

	setNodeTree(node)
	{
		this.canvas.activate();
		this.nodeLayer.activate();
		this.nodeLayer.removeChildren();
		model.PatternState.Instance().reset();
		//console.log("startnode" , startnode);
		node.process();
		//readValuesTest();
	}
}