

import {Param} from './Param'
import * as utils from '../../util/utils'

/**
 * returns a array of values between minRange and maxRange distributed with gaps variation between minGapWeight, maxGapWeight
 * min n = 2
 * if minGapWeight = maxGapWeight then its uniform spacing
 * start number always = maxRange, end number always = maxRange
 */
export class RandomOrderedNumbersParam extends Param
{
	constructor(minRange = 0, maxRange = 1, minGapWeight = 0.1, maxGapWeight = 1, n = 5)
	{
		super();
		this.minRange = minRange;
		this.maxRange = maxRange;
		this.minGapWeight = minGapWeight;
		this.maxGapWeight = maxGapWeight;
		this.n = n;
	}

	getEditorDefinition()
	{
		return super.getEditorDefinition().setOutputFloatArray();
	}

	getValue(outputName = "")
	{
		super._processParams();

		this.minSize = Math.max(0.0001, this.minSize);
		this.maxSize = Math.max(this.maxSize, this.minSize);
		this.n = Math.max(2, this.n);
		var sizes = [];
		var sizeSum = 0;
		//sizes.push(sizeSum);

		for(var i =0 ;i < this.n;++i)
		{
			var size = utils.MathUtils.GetSeededRandomFloat(this.minGapWeight,this.maxGapWeight);
			sizes.push(sizeSum);
			if(i < this.n - 1)sizeSum += size;
		}
		for(var i =0 ;i < sizes.length;++i)
		{
			sizes[i] = this.minRange + (this.maxRange - this.minRange)*(sizes[i]/ sizeSum );
		}
		console.log(">>> RandomOrderedNumbersParam ", sizes);
		return sizes;
		//return this.defaultValue;
	}
}