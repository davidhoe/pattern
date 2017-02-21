import paper from 'paper'

export class FillUtils
{
    static createLineGradient(p0,p1,c0,c1 )
    {
        var fill = {
            gradient: {
                stops: [c0,c1]
            },
            origin: p0,
            destination: p1
        }
        return fill;
    }

    static createCircleGradient(p,r,c0,c1 )
    {
        var fill = {
            gradient: {
                stops: [c0,c1]
            },
            origin: p + new paper.Point(-r,-r),
            destination: p + new paper.Point(r,r)
        }
        return fill;
    }
}