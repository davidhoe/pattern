/**
 * namespace for model - this includes nodes and params
 *
 * example usage:
 * import * as model from '../model/model'
 * var node = new model.FillNode();...
 */


// todo add in the rest
// 'normal', 'multiply', 'screen', 'overlay', 'soft-light', 'hard- light',
// 'color-dodge', 'color-burn', 'darken', 'lighten', 'difference', 'exclusion',
// 'hue', 'saturation', 'luminosity', 'color', 'add', 'subtract', 'average',
// 'pin-light', 'negation', 'source- over', 'source-in', 'source-out', 'source-atop',
// 'destination-over', 'destination-in', 'destination-out', 'destination-atop',
// 'lighter', 'darker', 'copy', 'xor'
// http://paperjs.org/reference/item/#blendmode
export var BLEND_MODE  = {
	'normal'      : 'normal',
	'multiply'    : 'multiply',
	'screen'    : 'screen',
	'overlay'    : 'overlay',
	'soft-light'    : 'soft-light',
	'add'    : 'add',
	'subtract'    : 'subtract'
};

export {ColourNode as ColourNode} from './ColourNode.js';
export {CompoundPathNode as CompoundPathNode} from './CompoundPathNode.js';
export {DecisionNode as DecisionNode} from './DecisionNode.js';
export {FillNode as FillNode} from './FillNode.js';
export {GroupNode as GroupNode} from './GroupNode.js';
export {Node as Node} from './Node.js';
export {ParamSaveNode as ParamSaveNode} from './ParamSaveNode.js';
export {PathNode as PathNode} from './PathNode.js';
export {PatternState as PatternState} from './PatternState.js';
export {QuadNode as QuadNode} from './QuadNode.js';
export {QuadShearNode as QuadShearNode} from './QuadShearNode.js';
export {QuadMirrorNode as QuadMirrorNode} from './QuadMirrorNode.js';
export {QuadScaleNode as QuadScaleNode} from './QuadScaleNode.js';
export {QuadSubdivisionNode as QuadSubdivisionNode} from './QuadSubdivisionNode.js';
export {QuadToDiagonalLeafNode as QuadToDiagonalLeafNode} from './QuadToDiagonalLeafNode.js';
export {QuadToCircleNode as QuadToCircleNode } from './QuadToCircleNode.js';
export {QuadToQuarterCircleNode as QuadToQuarterCircleNode} from './QuadToQuarterCircleNode.js';
export {QuadToSCurveNode as QuadToSCurveNode} from './QuadToSCurveNode.js';
export {QuadToShapeNode as QuadToShapeNode} from './QuadToShapeNode.js';
export {QuadToSubQuadNode as QuadToSubQuadNode} from './QuadToSubQuadNode.js';
export {QuadToTriNode as QuadToTriNode} from './QuadToTriNode.js';
export {QuadTranslateGridNode as QuadTranslateGridNode} from './QuadTranslateGridNode.js';
export {RandomColourFromSetNode as RandomColourFromSetNode} from './RandomColourFromSetNode.js';
export {RepeatNode as RepeatNode} from './RepeatNode.js';
export {RectGridNode as RectGridNode} from './RectGridNode.js';
export {RotatePathIndexNode as RotatePathIndexNode} from './RotatePathIndexNode.js';
export {TransformCenterPathNode as TransformCenterPathNode} from './TransformCenterPathNode.js';
export {TransformNode as TransformNode} from './TransformNode.js';
export {TriSliceNode as TriSliceNode} from './TriSliceNode.js';
export {TriSubdivisionNode as TriSubdivisionNode} from './TriSubdivisionNode.js';
