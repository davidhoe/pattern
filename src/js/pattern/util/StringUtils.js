export class StringUtils
{

	static ConvertToLabel(str, ignoreText = [])
	{
		if(ignoreText == str) return StringUtils.CapitalizeFirstLetter(str);
		var newstr = str;
		for(var i =0; i< ignoreText.length;++i)
		{
			newstr = newstr.replace(ignoreText[i], "");
		}
		var split = newstr.split(/(?=[A-Z])/);
		var newstr = split.join(" ");
		return StringUtils.CapitalizeFirstLetter(newstr);
	}

	static CapitalizeFirstLetter(string)
	{
		if(string == "" || string == null) return string;
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}