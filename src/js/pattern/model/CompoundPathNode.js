import {FillNode} from './FillNode'
import {PatternState} from './PatternState'
import paper from 'paper'

import GridUtils from '../util/RectGridUtils'

/**
 * defines a compound path, all paths under this node will be part of this compound group
 */
export class CompoundPathNode extends FillNode
{
	constructor(shapeAtts = null)
	{
		super(shapeAtts);
	}



	process()
	{
		var item = new paper.CompoundPath();
		var parentGroup = PatternState.Instance().group;
		if(parentGroup != null)
		{
			parentGroup.addChild(item);
		}
		item.clipMask = this.clipMask;
		item.opacity = this.opacity;
		item.blendMode = this.blendMode;
		item.fillColor = PatternState.Instance().colour;
		item.strokeColor = 'grey'; // testing
		//item.applyMatrix = true;
		item.pivot = new paper.Point(0,0);
		//item.matrix = PatternState.Instance().matrix.clone();
		if(this.shapeAtts != null)
		{
			for (var key in this.shapeAtts) {
				if (this.shapeAtts.hasOwnProperty(key)) {
					console.log("shape att", key , "val", this.shapeAtts[key]);
					item[key] = this.shapeAtts[key];
				}
			}
		}

		super._saveStateGroup();
		PatternState.Instance().group = item;
		super.processChildNodes();
		super._restoreStateGroup();
	}
}