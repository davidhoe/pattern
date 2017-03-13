export class ArrayUtils
{
	static FindObjectByParameter(array,paramName,value)
	{
		for (var i = 0; i < array.length; i++) {
			if (array[i][paramName] === value) {
				return array[i];
			}
		}
		return null;
	}

	static ContainsObject(array, obj)
	{
		for (var i = 0; i < array.length; i++) {
			if (array[i] === obj) {
				return true;
			}
		}
		return false;
	}

	static RemoveObject(array, obj)
	{
		var temp = [];
		for(var i =0; i< array.length;++i)
		{
			if(array[i] != obj )
			{
				temp.push(array[i]);
			}
		}
		return temp;
	}
}