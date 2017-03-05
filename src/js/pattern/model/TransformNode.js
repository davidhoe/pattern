/**
 * Created by David on 05/03/2017.
 */

import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import {MathUtils} from '../util/MathUtils'
import paper from 'paper'

/**
 * base matrix node
 */
export class TransformNode  extends Node
{
	constructor(shearRatio)
	{
		super();
		//this.shearRatio = ( shearRatio == null) ? 0.25 : shearRatio;
		this.translation = null; // point
		this.rotation = null; // angle in degrees
		this.scale = null;  // point
	}

	setRotation(angleInDegrees)
	{
		this.rotation = angleInDegrees;
		return this;
	}

	setScale(sx,sy = null)
	{
		if(sy == null) sy = sx;
		this.scale = new paper.Point(sx,sy);
		return this;
	}

	setTranslation(x,y)
	{
		this.translation = new paper.Point(x,y);
		return this;
	}

	setTranslationPoint(p)
	{
		this.translation = p;
		return this;
	}

	process()
	{
		super._processParams();
		super._saveStateMatrix();
		var mat = new paper.Matrix();
		if(this.translation != null) mat.translate(this.translation);
		if(this.rotation != null) mat.rotate(this.rotation);
		if(this.scale != null) mat.scale(this.scale);
		PatternState.Instance().matrix =  PatternState.Instance().matrix.prepended(mat);
		super.processChildNodes();
		super._restoreStateMatrix();
	}
}
