

import {Param} from './Param'
import * as utils from '../../util/utils'
import paper from 'paper'

/**
 * create a radial set of points
 */
export class PointsArrayRadialParam extends Param
{
	constructor(degreeArray = [0,50,100,150,200,250,300])
	{
		super();
		this.degreeArray = degreeArray;
		this.minRandomRadius = 50;
		this.maxRandomRadius =  50;
	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputPointArray();
	}

	getValue(outputName = "")
	{
		super._processParams();
		//
		//var bound = utils.PointUtils.GetBoundForSegments(this.array);
		var points = [];
		for(var i =0; i< this.degreeArray.length;++i)
		{
			var deg = this.degreeArray[i];
			var r = utils.MathUtils.GetSeededRandomFloat(this.minRandomRadius,this.maxRandomRadius);
			points.push(utils.PointUtils.PointFromAngleAndRadius(deg,r));
		}
		//var boundPoints  = utils.PointUtils.CreateRectPoints(bound);
		return points;
	}
}