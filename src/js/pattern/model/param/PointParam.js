/**
 * Created by David on 03/03/2017.
 */

import paper from 'paper'
import {Param} from './Param'
/*
 * operation for a paper.Point object
 */
export class PointParam extends Param{
    constructor(defaultValue)
    {
        super();
        this.point = new paper.Point();
    }

    // process params here like a node

    getValue()
    {
        super._processParams();
        return this.point;
    }
}
