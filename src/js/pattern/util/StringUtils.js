export class StringUtils
{

	static ConvertToLabel(str, ignoreText = [])
	{
		var newstr = str;
		for(var i =0; i< ignoreText.length;++i)
		{
			newstr = newstr.replace(ignoreText[i], "");
		}
		var split = newstr.split(/(?=[A-Z])/);
		var newstr = split.join(" ");
		return newstr;
	}
}