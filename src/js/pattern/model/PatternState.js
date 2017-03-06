import paper from 'paper'
import * as utils from '../util/utils'
/**
 * holds the state for the draw operations, namely Colour,Shape, Rect bound
 */
export class PatternState
{
    constructor(){
        PatternState._instance = this;
        // state variables, initialise with defaults
        this.reset();
    }

    reset()
    {
        this.colour = new paper.Color(1);
        this.bound = new paper.Rectangle(0,0,100,100);
        this.path = utils.PointUtils.CreateRectPoints(new paper.Rectangle(0,0,100,100));
        this.matrix = new paper.Matrix();
        this.group = null;
        this.headNode = null;// temp node reference to make it easier to create node trees
    //    this._startNode = null;
    }

/*
    process()
    {
        if(this._startNode != null)
        {
            this._startNode.process();
        }
    }*/

    // singleton
    static _instance;
    static Instance()
    {
        if(PatternState._instance == null){
            PatternState._instance = new PatternState();
        }
        return PatternState._instance;
    }
}