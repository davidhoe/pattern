import $ from 'jquery'
import * as model from '../../model/model'
import * as utils from '../../util/utils'

export default class HTMLNodeList
{
	constructor()
	{
		this.onPatternNodeSelectedCallback = null;
		this.onParamNodeSelectedCallback = null;
		this._buttons = [];
	}

	init(divID)
	{
		this._menudiv = this.createMenu();
		// attach it
		var div = document.getElementById(divID);
		div.appendChild(this._menudiv);
	}

	createMenu()
	{
		var menu = document.createElement("div");
		$(menu).css({
			position: "absolute",
			marginLeft: 0, marginTop: 0,
			top: 50, left: 0
		});

		//create filter box
		var input = HTMLNodeList.CreateStringInput("", "filterinput", menu);
		input.placeholder = "filter";
		var _this = this;
		$(input).on("change keyup paste", function () {
			var val = $(this).val();
			_this.filterButtons(val);
		});
		$(menu).append('<br />');

		// add buttons for nodes
		this.addPatternNodeButtons(menu);
		$(menu).append('<br />');
		this.addParamNodeButtons(menu);


		return menu;
	}

	filterButtons(filterString)
	{
		filterString = filterString.toLowerCase();
		if(filterString != "" || filterString != null) {
			for (var i = 0; i < this._buttons.length; ++i) {
				var b = this._buttons[i];
				if (b.className.toLowerCase().includes(filterString)) {
					this.showButton(b);
				}
				else {
					this.hideButton(b);
				}
			}
		}
		else{
			// show all
			for (var i = 0; i < this._buttons.length; ++i) {
				var b = this._buttons[i];
				this.showButton(b);
			}
		}
	}

	showButton(b)
	{
		$(b.br).show();
		$(b).show();
	}

	hideButton(b)
	{
		$(b.br).hide();
		$(b).hide();
	}

	addPatternNodeButtons(parent)
	{
		var _this= this;
		var classNames = HTMLNodeList.GetNodeClassnameList();
		for(var i =0 ;i < classNames.length;++i)
		{
			var classname = classNames[i] + "";
			var button = HTMLNodeList.CreateButton(classname, parent);
			this._buttons.push(button);
			button.className = classname;
			$(button).click(function () {

				if(_this.onPatternNodeSelectedCallback)
				{
					_this.onPatternNodeSelectedCallback(this.className);
				}
				//console.log("button click", this.nodeClassName);
			});
			//}
			var br = document.createElement("br");
			parent.appendChild(br);
			button.br = br;

			//$(parent).append('<br />');

		}
	}

	addParamNodeButtons(parent)
	{
		var _this= this;
		var classNames = HTMLNodeList.GetParamClassnameList();
		for(var i =0 ;i < classNames.length;++i)
		{
			var classname = classNames[i] + "";
			var button = HTMLNodeList.CreateButton(classname, parent);
			button.className = classname;
			this._buttons.push(button);
			$(button).click(function () {
				if(_this.onParamNodeSelectedCallback)
				{
					_this.onParamNodeSelectedCallback(this.className);
				}
				//console.log("button click", this.nodeClassName);
			});
			//}
			var br = document.createElement("br");
			parent.appendChild(br);
			button.br = br;

		}

	}


	static CreateNodeInstance(className)
	{
		return new model[className];
	}

	static GetNodeClassnameList()
	{
		var list = [];
		for (var nodeClass in model) {

			var ix = nodeClass.indexOf("Node");
			var doesEndWithNode = ix  == nodeClass.length - 4;
			if(doesEndWithNode) {
				list.push(nodeClass);
			}
		}
		return list;
	}

	static GetParamClassnameList()
	{
		var list = [];
		for (var nodeClass in model) {

			var ix = nodeClass.indexOf("Param");
			var doesEndWithNode = ix  == nodeClass.length - 5;
			if(doesEndWithNode) {
				list.push(nodeClass);
			}
		}
		return list;
	}

	static CreateButton(label, parent)
	{
		var button = document.createElement("BUTTON");
		var t = document.createTextNode(label);       // Create a text node
		button.appendChild(t);
		//$(label).width(50);
		parent.appendChild(button);
		return button;

	}

	static CreateStringInput(value, id, parent)
	{
		var element = document.createElement("input");
		element.setAttribute("type", "string");
		element.setAttribute("value", value);
		element.setAttribute("name", id);
		parent.appendChild(element);
		return element;
	}
}
