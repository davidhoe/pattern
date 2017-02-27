/**
 * Created by David on 27/02/2017.
 */

export class Node{
    constructor()
    {
        this.childNodes = [];
    }

    setParent(node)
    {
        node.addChild(this);
    }

    addChild(node)
    {
        this.childNodes.push(node);
    }

    process()
    {
        // process children
    }

    processChildNodes()
    {
        for(var i = 0 ; i < this.childNodes.length; ++i)
        {
            this.childNodes[i].process();
        }
    }

}