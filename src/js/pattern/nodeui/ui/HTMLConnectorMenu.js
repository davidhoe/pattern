import $ from 'jquery'
import * as model from '../../model/model'
import * as utils from '../../util/utils'

export default class HTMLConnectorMenu
{
	constructor()
	{
		// callback
		this.onValueChangedCallback = null;
		this._connector = null;
		this._menudiv = null;
		this.onDeleteClickedCallback = null;
		this._nodeViewRef = null;
		this._showing = false;
	}

	// create the html
	init(connector)
	{
		if(this._menudiv)
		{
			$(this._menudiv).remove();
		}
		this._connector = connector;
		this._menudiv = this.createMenu(connector);

		// attach it
		var div = document.getElementById("div2");
		div.appendChild(this._menudiv);

	}

	onValueChanged()
	{
		if(this.onValueChangedCallback)
		{
			this.onValueChangedCallback();
		}
	}

	createMenu(connector)
	{
		//console.log("createMenu"  , this._nodeViewRef);
		//var nodedef = nodeView.nodemodel.getEditorDefinition();

		// background
		var menu = document.createElement("div");
		//menu.setAttribute("background-color", "lightblue");
		//$(menu).css("background-color" , 'lightblue');
		$(menu).width(200);
		$(menu).addClass("triangle-isosceles left");
		/*
		 <p class="triangle-isosceles left">But it could be any element you want.</p>
		 */
		//	$(menu).height(200);

		menu.setAttribute("id", "menu");
		HTMLConnectorMenu.SetElementPosition(menu, 0,40);

		// set the title
		var heading = HTMLConnectorMenu.CreateTextLabel("Connection", menu);
		$(menu).append('<br />');
		$(menu).append('<br />');
		var _this = this;

		// add a  delete button
		var button = HTMLConnectorMenu.CreateButton("delete", menu);
		$(button).click(function () {
			//	console.log("butonn click",_this);
			if (_this.onDeleteClickedCallback) _this.onDeleteClickedCallback(_this._connector);
		});
		return menu;
	}

	static SetElementPosition(element,x,y)
	{
		$(element).css({ position: "absolute", left: x, top: y});
		//element.setAttribute("style", "width:200px;height:200px;position:absolute; left:" +  x + "px; top:" +  y + "px");
	}

	static CreateTextLabel(text, parent)
	{
		var label = document.createElement("Label");
		label.innerHTML = text;
		$(label).width(50);
		parent.appendChild(label);
		return label;

	}

	static CreateSelectionDropdown(keyValueArray, value, parent)
	{
		var selectList = document.createElement("select");
		//selectList.id = "mySelect";
		selectList.value = value;
		parent.appendChild(selectList);

		for (var i = 0; i < keyValueArray.length; i++) {
			var pair = keyValueArray[i];
			option.value = pair.value;
			option.text = pair.key;
			selectList.appendChild(option);
		}
		return selectList;
	}

	static CreateBoolInput(value, parent)
	{
		var element = document.createElement("input");
		element.setAttribute("type", "checkbox");
		element.checked = value;
		element.value = true;
		//element.setAttribute("name", "chechbox");
		parent.appendChild(element);
		return element;
	}

	static CreateNumberInput(value, id, parent)
	{
		var element = document.createElement("input");
		element.setAttribute("type", "number");
		element.setAttribute("value", value);
		element.setAttribute("name", id);
		parent.appendChild(element);
		return element;
	}

	static CreateColourInput(value, parent)
	{
		var element = document.createElement("input");
		element.setAttribute("type", "color");
		element.setAttribute("value", utils.ColourUtils.ColourToHex(value));
		parent.appendChild(element);
		return element;
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

	static CreateButton(label, parent)
	{
		var button = document.createElement("BUTTON");
		var t = document.createTextNode(label);       // Create a text node
		button.appendChild(t);
		//$(label).width(50);
		parent.appendChild(button);
		return button;

	}

	isShowing()
	{
		return this._showing;
	}

	show(x,y)
	{
		this._showing = true;
		$(this._menudiv).show();
		HTMLConnectorMenu.SetElementPosition(this._menudiv, x-10,y-40);
	}

	hide()
	{
		this._showing = false;
		$(this._menudiv).hide();

	}
}