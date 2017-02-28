
export class MathUtils {

    static Lerp(x0,x1,r)
    {
        return x0 + (x1-x0)*r;
    }

    static GetRandomIndexForArray(array)
    {
        return MathUtils.GetRandomIntBetween(0, array.length - 1);
    }

    static GetRandomIntBetween(from, to)
    {
        var x = from + Math.random() * (to - from + 1);
        return Math.min(to, Math.floor(x));
    }

    static GetRandomFloat(from, to)
    {
        var xx = from + Math.random() * (to - from );
        return xx;
    }

    // //
    // seeded random

    static SetSeed(seed)
    {
        Math.seed = seed;
    }

    static GetSeededRandomIndexForArray(array)
    {
        return MathUtils.GetSeededRandomIntBetween(0, array.length - 1);
    }

    static GetSeededRandomIntBetween(from, to)
    {
        var x = from + MathUtils.GetSeededRandomFloat(0,1) * (to - from + 1);
        return Math.min(to, Math.floor(x));
    }

    // in order to work 'Math.seed' must NOT be undefined,
    // so in any case, you HAVE to provide a Math.seed
    static GetSeededRandomFloat(min, max)
    {
        max = max || 1;
        min = min || 0;

        Math.seed = (Math.seed * 9301 + 49297) % 233280;
        var rnd = Math.seed / 233280;

        return min + rnd * (max - min);
    }

}
