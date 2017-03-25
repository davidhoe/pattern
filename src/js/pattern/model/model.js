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
export {NodeEditorDefinition as NodeEditorDefinition} from './editor/NodeEditorDefinition';
export {ParamDef as ParamDef} from './editor/ParamDef';
export {FloatParamDef as FloatParamDef} from './editor/ParamDef';
export {IntParamDef as IntParamDef} from './editor/ParamDef';
export {ColourParamDef as ColourParamDef} from './editor/ParamDef';
export {BoolParamDef as BoolParamDef} from './editor/ParamDef';
export {StringParamDef as StringParamDef} from './editor/ParamDef';

export {ColourBlendHSBParam as ColourBlendHSBParam} from './param/ColourBlendHSBParam';
export {ColourBlendRGBParam as ColourBlendRGBParam} from './param/ColourBlendRGBParam';
export {ColourHSBParam as ColourHSBParam} from './param/ColourHSBParam';
export {ColourHSBShiftParam as ColourHSBShiftParam} from './param/ColourHSBShiftParam';
export {ColourRGBParam as ColourRGBParam} from './param/ColourRGBParam';
export {ColourRGBShiftParam as ColourRGBShiftParam} from './param/ColourRGBShiftParam';
export {ColourSelectFromSetParam as ColourSelectFromSetParam} from './param/ColourSelectFromSetParam';
export {ColourSelectRandomFromSetParam as ColourSelectRandomFromSetParam} from './param/ColourSelectRandomFromSetParam';
export {ColoursetPresetParam  as ColoursetPresetParam } from './param/ColoursetPresetParam';
export {ColoursetCombineParam  as ColoursetCombineParam } from './param/ColoursetCombineParam';
export {ColourToHSBParam  as ColourToHSBParam } from './param/ColourToHSBParam';
export {ColourToRGBParam  as ColourToRGBParam } from './param/ColourToRGBParam';

export {CompareNumberParam as CompareNumberParam} from './param/CompareNumberParam';

export {FloatParam as FloatParam} from './param/FloatParam';
export {FloatRandomParam as FloatRandomParam} from './param/FloatRandomParam';
export {FloatSelectFromArrayParam as FloatSelectFromArrayParam} from './param/FloatSelectFromArrayParam';
export {IntParam as IntParam} from './param/IntParam';
export {IntSelectFromArrayParam as IntSelectFromArrayParam} from './param/IntSelectFromArrayParam';
export {NumberMultiplyParam as NumberMultiplyParam} from './param/NumberMultiplyParam';
export {Param as Param} from './param/Param';
export {Parameterizable as Parameterizable} from './param/Parameterizable';
export {PointParam as PointParam} from './param/PointParam';
export {PointToXYParam as PointToXYParam} from './param/PointToXYParam';
export {RandomIntInRangeParam as RandomIntInRangeParam} from './param/RandomIntInRangeParam';
export {RandomOrderedNumbersParam as RandomOrderedNumbersParam} from './param/RandomOrderedNumbersParam';
export {SavedColoursetParam as SavedColoursetParam} from './param/SavedColoursetParam';

export {ColourNode as ColourNode} from './ColourNode.js';
export {CompoundPathNode as CompoundPathNode} from './CompoundPathNode.js';
export {DecisionNode as DecisionNode} from './DecisionNode.js';
export {FillNode as FillNode} from './FillNode.js';
export {GroupNode as GroupNode} from './GroupNode.js';
export {IfThenNode as IfThenNode} from './IfThenNode.js';
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
export {QuadToSlicesNode as QuadToSlicesNode} from './QuadToSlicesNode.js';
export {QuadToSubQuadNode as QuadToSubQuadNode} from './QuadToSubQuadNode.js';
export {QuadToTriNode as QuadToTriNode} from './QuadToTriNode.js';
export {QuadTranslateGridNode as QuadTranslateGridNode} from './QuadTranslateGridNode.js';
export {RandomColourFromSetNode as RandomColourFromSetNode} from './RandomColourFromSetNode.js';
export {RepeatNode as RepeatNode} from './RepeatNode.js';
export {RectGridNode as RectGridNode} from './RectGridNode.js';
export {RotatePathIndexNode as RotatePathIndexNode} from './RotatePathIndexNode.js';
export {SaveColourSetNode as SaveColourSetNode} from './SaveColourSetNode.js';
export {TextureDrawNode as TextureDrawNode} from './TextureDrawNode.js';
export {TransformCenterPathNode as TransformCenterPathNode} from './TransformCenterPathNode.js';
export {TransformNode as TransformNode} from './TransformNode.js';
export {TriSliceNode as TriSliceNode} from './TriSliceNode.js';
export {TriSubdivisionNode as TriSubdivisionNode} from './TriSubdivisionNode.js';
export {TriToQuarterCurveNode as TriToQuarterCurveNode} from './TriToQuarterCurveNode.js';
export {TriToSlicesNode as TriToSlicesNode} from './TriToSlicesNode.js';

