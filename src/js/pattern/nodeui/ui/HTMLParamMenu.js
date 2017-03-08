import $ from 'jquery'

export default class HTMLParamMenu
{
	constructor()
	{
		// callback
		this.onValueChangedCallback = null;
		this._nodemodel = null;
		this._menudiv = null;
	}

	// create the html
	init(nodemodel)
	{
		if(this._menudiv)
		{
			$(this._menudiv).remove();
		}

		this._nodemodel = nodemodel;
		this._menudiv = this.createMenu(nodemodel);


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

	createMenu(nodemodel)
	{
		var nodedef = nodemodel.getEditorDefinition();

		// background
		var menu = document.createElement("div");
		//menu.setAttribute("background-color", "lightblue");
		$(menu).css("background-color" , 'lightblue');
		$(menu).width(200);
	//	$(menu).height(200);



		menu.setAttribute("id", "menu");
		HTMLParamMenu.SetElementPosition(menu, 0,40);

		// set the title
		var x = 0;
		var y = 10;
		var heading = HTMLParamMenu.CreateTextLabel(nodedef.label, menu);
		$(menu).append('<br />');
		$(menu).append('<br />');
		y+=25;
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

			y+=25;


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


	show(x,y)
	{
		$(this._menudiv).show();
		HTMLParamMenu.SetElementPosition(this._menudiv, x,y);
	}

	hide()
	{
		$(this._menudiv).hide();

	}
}