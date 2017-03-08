import {Node} from './Node'
import {PatternState} from './PatternState'
import {PointUtils} from '../util/PointUtils'
import * as editor from './editor/editor'

import paper from 'paper'

/**
 * subdivide a quad path into a grid of smaller quad paths
 */
export class QuadSubdivisionNode extends Node
{
	/**
	 * sudivide into a number of rows

	 */
	constructor(nrows, ncols)
	{
		super();
		// public
		this.nrows = nrows;
		this.ncols = ncols;
		this._specificChildNodes = []; // store nodes attached to a specific child index

	}

	/**
	 *  add a node to a specific index
	 * @param node node to add
	 * @param ix  index to process the child node at.
	 */
	addChildToIndex(node, ix)
	{
		var found = false;
		for(var i =0; i< this._specificChildNodes.length; ++i)
		{
			var pair = this._specificChildNodes[i];
			if(pair.node == node)
			{
				pair.indexes.push(ix);
				found = true;
			}
		}
		if(!found)
		{
			var pair = {"indexes":[ix], "node": node};
			this._specificChildNodes.push(pair);
		}
	}

	process()
	{

		super._processParams();
		var path  = super._getStatePath();
		if(path.length >= 4)
		{
			super._saveStatePath();
			var shapes = QuadSubdivisionNode.SubdivideQuad(this.nrows, this.ncols, path);
			for (var i = 0; i < shapes.length; i++) {
				//
				PatternState.Instance().path = shapes[i];
			//	console.log("here", PatternState.Instance().path);
				super.processChildNodes();
			}
			// process nodes attached to a specific child index
			for (var j =0; j < this._specificChildNodes.length; ++j) {
				var pair = this._specificChildNodes[j];
				var node = pair.node;
				var indexes = pair.indexes;
				for(var k =0; k< indexes.length; ++k)
				{
					//console.log("indexes[k]", indexes[k]);
					PatternState.Instance().path = shapes[indexes[k]];
					//console.log(node.constructor.name);
					node.process();
				}
			}

			super._restoreStatePath();
		}
	}

	static GetGridPoints(nrows, ncols, quadPoints)
	{
		// create grid points
		var rj, r, ri;
		var gridpoints = [];
		for(var j = 0; j<= nrows;++j)
		{
			rj = j/ nrows;
			var p0 = PointUtils.LerpPoint(quadPoints[0],quadPoints[3], rj);
			var p1 = PointUtils.LerpPoint(quadPoints[1],quadPoints[2], rj);
			var prow = [];
			for(var i =0; i<= ncols;++i)
			{
				ri = i/ncols;
				var p = PointUtils.LerpPoint(p0,p1, ri);
				prow.push(p);
			}
			gridpoints.push(prow);
		}
		return gridpoints;
	}

	// todo subdivide into X rows
	static SubdivideQuad(nrows, ncols, quadpoints)
	{
		var gridpoints = QuadSubdivisionNode.GetGridPoints(nrows, ncols, quadpoints);
		var p0,p1,p2,p3;
		var quads = [];
		var prow0,prow1;
		// for each row, make a row of triangles
		for(var j = 0; j< nrows;++j)
		{
			prow0 = gridpoints[j];
			prow1 = gridpoints[j+1];
			for(var i=0; i< ncols;++i )
			{
				p0 = prow0[i];
				p1 = prow0[i+1];
				p2 = prow1[i+1];
				p3 = prow1[i];
				quads.push([p0,p1,p2,p3]);
			}
		}
		return quads;
	}

	getEditorDefinition()
	{
		var def = new editor.NodeEditorDefinition("Quad subdivide");
		def.addInputFloat('nrows');
		def.addInputFloat('ncols');
		return def;
	}
}