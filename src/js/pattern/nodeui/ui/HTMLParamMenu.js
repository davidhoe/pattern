import $ from 'jquery'

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
			var input = HTMLParamMenu.CreateParamInput(this._nodemodel[inputdef.name] , inputdef.name , menu);
			input.inputdef = inputdef;

			$(input).focusout (function()
			{
				var val = $(this).val();
				_this._nodemodel[this.inputdef.name] = parseFloat( val);
				console.log("new value for " + this.inputdef.name + " set to : " + parseFloat(val));
				_this.onValueChanged();
			});

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

	static CreateParamInput(value, id, parent)
	{
		var element = document.createElement("input");
		element.setAttribute("type", "number");
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