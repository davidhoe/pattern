import {Node} from './Node'
import {PatternState} from './PatternState'
import paper from 'paper'

import GridUtils from '../util/RectGridUtils'

/**
 * group node - all children are attached this group
 * masking is achieved by setting clipping to true
 */
export class GroupNode extends Node
{
	constructor()
	{
		super();
		// public
		this.clipped = false;
	}

	/**
	 * http://paperjs.org/reference/group/#clipped
	 * Specifies whether the group item is to be clipped. When setting to true, the first child in the group is automatically defined as the clipping mask.
	 * @param clipped
	 */
	setClipped(clipped)
	{
		this.clipped = clipped;
		return this;
	}

	process()
	{
		super._processParams();
		super._saveStateGroup();
		var parentgroup = this._savedGroup;
		var group = new paper.Group();
		if(parentgroup != null)
		{
			parentgroup.addChild(group);
		}
		PatternState.Instance().group = group;
		super.processChildNodes();
		super._restoreStateGroup();
	}
}