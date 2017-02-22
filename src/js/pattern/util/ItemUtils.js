import paper from 'paper'

export class ItemUtil
{
    static RemoveChildrenRecursive(item)
    {
        for(var i =item.children.length-1 ; i>=0; i--) {
            ItemUtil.RemoveChildrenRecursive(item.children[i]);
        }
        item.remove();
        item.removeChildren();
    }
}