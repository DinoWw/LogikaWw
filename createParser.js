function createParser(){


	//really think about how much you have messed up by representing quantificators with A and E
	//like really consider how dumb you are
	//fix it
	const opOrder = ['>', '+', '*', '$', '%', '-'];		//$ => A;    % => E   		//so dumb, but I dont see a lazier way to do it

	const operators = {
		binary_A : ['>', '+', '*'] ,	//AoB
		binary_B : ['$', '%'] ,			//oAB
		unary	 : ['-'] ,				//oA
	}


	const parse = function(parseString){
		while(parseString[0] == '(' && parseString[parseString.length-1] == ')'){
			parseString = parseString.slice(1, -1);
		}


		//bad time and operation complexity
		for(let j = 0; j < opOrder.length; j ++){
			const operator = opOrder[j];
			let openBracketCount = 0;
			for(let i = 0; i < parseString.length; i++){
				let activeChar = parseString[i];

				//counting if inside open brackets
				if(activeChar == '('){
					openBracketCount += 1;
					continue;
				} else if(activeChar == ')'){
					openBracketCount -= 1;
					continue;
				}
				//never evaluate stuff inside brackets (skip)
				if(openBracketCount != 0){continue;}


				if(activeChar == operator){
					if(operators.binary_A.includes(operator)){
						return new Expression(activeChar, parse(parseString.slice(0, i)), parse(parseString.slice(i+1, parseString.length)));
					} else if (operators.binary_B.includes(operator)){
						return new Expression({'$':'A', '%':'E'}[activeChar], parseString[i+1], parse(parseString.slice(i+2, parseString.length)))
					} else if (operators.unary.includes(operator)){
						return new Expression(activeChar, parse(parseString.slice(i+1, parseString.length)));		//this is a weird way to write it as when calling upon negation, it should only ever be possivle that i = 0
					}
					console.log('createParser.js has some problems with the list constants');
				}
			}
		}

		return new Expression('0', ...parseString);
	}

	return parse;



}