import paper from 'paper'

/**
 * holds the state for the draw operations, namely Colour,Shape, Rect bound
 */
export class PatternState
{
    constructor(){
        PatternState._instance = this;
        // state variables, initialise with defaults
        this.colour = new paper.Color(1);
        this.bound = new paper.Rectangle(0,0,100,100);
        this.path = [new paper.Point(0, 0),new paper.Point(100, 0),new paper.Point(100, 100),new paper.Point(0, 100)];

    }

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