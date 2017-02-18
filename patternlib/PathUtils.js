import paper from 'paper'

export class PathUtils
{
    static rightAngleTriangle(rect, cornerix )
    {
        if(cornerix == undefined ) cornerix = 0;

        var corners = [rect.topLeft, rect.topRight, rect.bottomRight, rect.bottomLeft];

        var myPath = new paper.Path();

        myPath.add( corners[(0 + cornerix) % 4 ]);
        myPath.add( corners[(1 + cornerix) % 4 ]);
        myPath.add( corners[(3 + cornerix) % 4 ]);

        myPath.closed = true;
        return myPath;
    }
}