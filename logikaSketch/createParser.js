function createParser(){


	//really think about how much you have messed up by representing quantificators with A and E
	//like really consider how dumb you are
	//fix it
	const opOrder = [/*'A', 'E'*/, '>', '+', '*', '-'];//no quantificators for you




	const parse = function(parseString){
		while(parseString[0] == '(' && parseString[parseString.length-1] == ')'){
			parseString = parseString.slice(1, parseString.length);
		}

		if(parseString.length == 1){
			return new Expression('0', parseString);
		}

		//bad time and operation complexity
		for(let j = 0; j < opOrder.length; j ++){
			const operator = opOrder[j];
			for(let i = 0; i < parseString.length; i++){
				let activeChar = parseString[i];
				if(activeChar == operator){
					return new Expression(activeChar, parse(parseString.slice(0, i)), parse(parseString.slice(i+1, parseString.length)));
				}
			}
		}

		console.log(`Parser broke: ${parseString}`);
		return false;
	}

	return parse;



}