/**
 * Created by David on 03/03/2017.
 */

import paper from 'paper'

/*
 * operation for a paper.Point object
 */
export class PointParam{
    constructor(defaultValue)
    {
        this.point = new paper.Point();
    }

    // process params here like a node

    getValue()
    {
        return this.point;
    }
}
