import paper from 'paper'
import ParamNodeView from './ui/ParamNodeView'
import PatternNodeView from './ui/PatternNodeView'
import NodeEditorCanvas from './ui/NodeEditorCanvas'
import ConnectionLine from './ui/ConnectionLine'

/**
 * main app for the node editor
 */
export default class NodeEditorApp
{
	constructor(project)
	{
		this.canvas = new NodeEditorCanvas(project);

		this.test();
	}

	test()
	{
		//make a node
		var node = new PatternNodeView(null, 'blue');
		this.canvas.addPatternNode(node);
		node.position.x = 139;
		node.position.y = 139;

		var node2 = new PatternNodeView();
		this.canvas.addPatternNode(node2);
		node2.position.x = 179;
		node2.position.y = 339;

		var node3 = new PatternNodeView();
		this.canvas.addPatternNode(node3);
		node3.position.x = 279;
		node3.position.y = 439;

	}
}