import $ from 'jquery'
import * as model from '../../model/model'
import * as utils from '../../util/utils'

export default class HTMLParamMenu
{
	constructor()
	{
		// callback
		this.onValueChangedCallback = null;
		this._nodemodel = null;
		this._menudiv = null;
		this.onDeleteClickedCallback = null;
		this._nodeViewRef = null;
		this._showing = false;
	}

	// create the html
	init(nodeView)
	{
		if(this._menudiv)
		{
			$(this._menudiv).remove();
		}
		this._nodeViewRef = nodeView;
		this._nodemodel = nodeView.nodemodel;
		this._menudiv = this.createMenu(nodeView);

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

	createMenu(nodeView)
	{

		//console.log("createMenu"  , this._nodeViewRef);
			var nodedef = nodeView.nodemodel.getEditorDefinition();

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
		HTMLParamMenu.SetElementPosition(menu, 0,40);

		// set the title
		var heading = HTMLParamMenu.CreateTextLabel(nodedef.label, menu);
		$(menu).append('<br />');
		$(menu).append('<br />');
		var _this = this;
		for(var i =0; i< nodedef.inputs.length;++i)
		{
			var inputdef = nodedef.inputs[i];
			HTMLParamMenu.CreateTextLabel(inputdef.label , menu);
			console.log("init menu", inputdef, this._nodemodel[inputdef.name]);
			if(inputdef.type == model.FloatParamDef.name)
			{
				var input = HTMLParamMenu.CreateNumberInput(this._nodemodel[inputdef.name], inputdef.name, menu);
				input.inputdef = inputdef;
				$(input).focusout(function () {
					var val = $(this).val();
					_this._nodemodel[this.inputdef.name] = parseFloat(val);
					console.log("new float value for " + this.inputdef.name + " set to : " + parseFloat(val));
					_this.onValueChanged();
				});
			}
			else if(inputdef.type == model.IntParamDef.name)
			{
				var isKeyValueInput = inputdef.keyValuePairs != null; // todo flag in Param
				if(isKeyValueInput) {
					// create a dropdown field and populate with values
					var input = HTMLParamMenu.CreateSelectionDropdown(inputdef.keyValuePairs, this._nodemodel[inputdef.name], menu);
					input.inputdef = inputdef;
					var currentVal = this._nodemodel[inputdef.name];
					$(input).val(currentVal);
					$(input).change(function () {
						var val = $(this).val();
						_this._nodemodel[this.inputdef.name] = val;
						console.log("new int value select field for " + this.inputdef.name + " set to : " + parseInt(val));
						_this.onValueChanged();
					});
				}
				else{
					// create a open input field
					var input = HTMLParamMenu.CreateNumberInput(this._nodemodel[inputdef.name], inputdef.name, menu);
					input.inputdef = inputdef;
					$(input).focusout(function () {
						var val = $(this).val();
						_this._nodemodel[this.inputdef.name] = parseInt(val);
						console.log("new int value for " + this.inputdef.name + " set to : " + parseInt(val));
						_this.onValueChanged();
					});
				}
			}
			else if(inputdef.type == model.BoolParamDef.name)
			{
				var input = HTMLParamMenu.CreateBoolInput(this._nodemodel[inputdef.name], menu);
				input.inputdef = inputdef;
				$(input).change(function () {
					var val = $(this).is(':checked');
					_this._nodemodel[this.inputdef.name] = (val);
					console.log("new bool value for " + this.inputdef.name + " set to : " , (val));
					_this.onValueChanged();
				});
			}
			else if(inputdef.type == model.StringParamDef.name)
			{
				var isKeyValueInput = inputdef.keyValuePairs != null; // todo flag in Param
				console.log("------string isKeyValueInput" ,isKeyValueInput );

				if(isKeyValueInput) {
					// create a dropdown field and populate with values
					var input = HTMLParamMenu.CreateSelectionDropdown(inputdef.keyValuePairs, this._nodemodel[inputdef.name], menu);
					input.inputdef = inputdef;
					var currentVal = this._nodemodel[inputdef.name];
					$(input).val(currentVal);
					$(input).change(function () {
						var val = $(this).val();
						_this._nodemodel[this.inputdef.name] = val;
						console.log("new int value select field for " + this.inputdef.name + " set to : " + val);
						_this.onValueChanged();
					});
				}
				else{
					var input = HTMLParamMenu.CreateStringInput(this._nodemodel[inputdef.name], inputdef.name, menu);
					input.inputdef = inputdef;
					$(input).focusout(function () {
						var val = $(this).val();
						_this._nodemodel[this.inputdef.name] = (val);
						console.log("new string value for " + this.inputdef.name + " set to : " + (val));
						_this.onValueChanged();
					});
				}
			}
			else if(inputdef.type == model.ColourParamDef.name)
			{
				var input = HTMLParamMenu.CreateColourInput(this._nodemodel[inputdef.name], menu);
				input.inputdef = inputdef;
				$(input).change(function () {
					var val = $(this).val();
					var col = utils.ColourUtils.HexToColour(val);
					console.log("new colour value for " + this.inputdef.name + " set to : " + (val) , col);
					_this._nodemodel[this.inputdef.name] = col;
					_this.onValueChanged();

				});
			}
			else if(inputdef.type == model.PointParamDef.name)
			{
				//just  display it for now
				var point = this._nodemodel[inputdef.name];

				var inputx = HTMLParamMenu.CreateNumberInput(this._nodemodel[inputdef.name].x, "x", menu);
				inputx.inputdef = inputdef;
				$(inputx).focusout(function () {
					var val = $(this).val();
					var p = _this._nodemodel[this.inputdef.name];
					p.x = parseFloat(val);
					console.log("new float value x for " + this.inputdef.name + " set to : " + parseFloat(val));
					_this.onValueChanged();
				});
				inputx.width = 50;

				var inputy= HTMLParamMenu.CreateNumberInput(this._nodemodel[inputdef.name].y, "y", menu);
				inputy.inputdef = inputdef;
				$(inputy).focusout(function () {
					var val = $(this).val();
					var p = _this._nodemodel[this.inputdef.name];
					p.y = parseFloat(val);
					console.log("new float value x for " + this.inputdef.name + " set to : " + parseFloat(val));
					_this.onValueChanged();
				});

			}


			$(menu).append('<br />');

		}
		$(menu).append('<br />');

		if(nodeView.deletable) {
			// add a  delete button
			var button = HTMLParamMenu.CreateButton("delete", menu);
			$(button).click(function () {
				//	console.log("butonn click",_this);
				if (_this.onDeleteClickedCallback) _this.onDeleteClickedCallback(_this._nodeViewRef);
			});
		}
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

	static CreateSelectionDropdown(keyValueDictionary, value, parent)
	{
		var selectList = document.createElement("select");
		//selectList.id = "mySelect";
		selectList.value = value;
		parent.appendChild(selectList);
		console.log("---CreateSelectionDropdown");
		for (var key in keyValueDictionary)
		{
			if (!keyValueDictionary.hasOwnProperty(key)) continue;
			console.log("---CreateSelectionDropdown key,value: ", key, value);

			var value = keyValueDictionary[key];
			var option = document.createElement("option");
			option.value = value;
			option.text = key;
			option.innerHTML = key;
			// inner text is:
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
		HTMLParamMenu.SetElementPosition(this._menudiv, x,y);
	}

	hide()
	{
		this._showing = false;
		$(this._menudiv).hide();

	}
}