import $ from 'jquery'
import paper from 'paper'
import {MathUtils} from './MathUtils'

export class ColourUtils {

    static _instance;
    static Coloursets;

    constructor(){

        this.coloursets = [];
        this.x = 1;
        ColourUtils._instance = this;
    }

    loadColoursets(callback)
    {
        $.getJSON("js/pattern/asset/colour-sets.json", function(json) {

            console.log("colour-sets loaded");
            // console.log(json); // this will show the info it in firebug console
            ColourUtils.Coloursets = json;

            console.log("loadColoursets  "   + ColourUtils.Coloursets.length);


            callback();
        });
    }

    /**
     * get colour set
     * @param ix
     * @returns {Array}
     */
    getColourset(ix)
    {
        ix = ix % ColourUtils.Coloursets.length;
      //  console.log("getColourset "   + ix);

        var colset = [];
        var rgbset = ColourUtils.Coloursets[ix];
        for(var  i =0; i< rgbset.length;++i)
        {
            var rgb = rgbset[i];
            colset.push(new paper.Color(rgb[0]/255,rgb[1]/255,rgb[2]/255) );
        }
        return colset;
    }

    getRandomColourset()
    {
        return this.getColourset(MathUtils.GetRandomIndexForArray(ColourUtils.Coloursets));
        //return this.getColourset( Math.min(ColourUtils.Coloursets.length-1, Math.floor( ColourUtils.Coloursets.length * Math.random())) );
    }

    getSeededRandomColourset()
    {
        return this.getColourset(MathUtils.GetSeededRandomIndexForArray(ColourUtils.Coloursets));
        //return this.getColourset( Math.min(ColourUtils.Coloursets.length-1, Math.floor( ColourUtils.Coloursets.length * Math.random())) );
    }


    static GetColourset(ix)
    {
        return ColourUtils.Instance().getColourset(ix);
    }

    static GetRandomColourset()
    {
        return ColourUtils.Instance().getRandomColourset();
    }

    static GetRandomCombinedColourset()
    {
        var cset0 = ColourUtils.Instance().getRandomColourset();
        var cset1 = ColourUtils.Instance().getRandomColourset();
        return cset0.concat(cset1);
    }

    static GetSeededRandomColourset()
    {
        return ColourUtils.Instance().getSeededRandomColourset();
    }

    static GetRandomColourInSet(colset)
    {
        var i = MathUtils.GetRandomIntBetween(0, colset.length - 1);
        //console.log(i);
        return colset[i];
    }


    static GetSeededRandomColourInSet(colset)
    {
        var i = MathUtils.GetSeededRandomIntBetween(0, colset.length - 1);
        //console.log(i);
        return colset[i];
    }


    static BlendColours(c0,c1, ratio)
    {
        var r = c0.red + (c1.red - c0.red)*ratio;
        var g = c0.green + (c1.green - c0.green)*ratio;
        var b = c0.blue + (c1.blue - c0.blue)*ratio;
        return new paper.Color(r,g,b);
    }

    static Instance()
    {
        if(ColourUtils._instance==null){
            ColourUtils._instance = new ColourUtils();

        }
        return ColourUtils._instance;
    }

    static ColourToHex(colour)
    {
        return colour.toCSS(true);
    }
    static HexToColour(hex)
    {
        hex = hex.replace('#','');
        var r = parseInt(hex.substring(0,2), 16)/255;
        var  g = parseInt(hex.substring(2,4), 16)/255;
        var b = parseInt(hex.substring(4,6), 16)/255;
        return new paper.Color(r,g,b);
    }

}
