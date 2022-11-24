class Expression{

	static expressionMap = {
		'a': 'p.', 	//assumptions
		'o': 'op', 	//opetovanje
		'+': 'v',
		'*': 'ʌ',
		'-': '-',
		'>': '->',
		//'=': '<->',
		'x': 'Ʇ',
		'A': '∀',
		'E': 'Ǝ'
	}
	static argumentAmount = {
		'0': 1,
		'+': 2,
		'*': 2,
		'-': 1,
		'>': 2,
		'x': 0,
		'A': 2,
		'E': 2,
		' ': -1	// when operator is undefined, expression shouldn't be 'full'
	}


	type = 'Expression';

	constructor(operator = ' ', ...argumentList){
		this.operator = operator;
		this.argumentList = argumentList;
	}


	equals(expression, ignoreVars = false){

		if(this.operator != expression.operator){
			return false;
		}

		if("AE".includes(this.operator)){
			if(!ignoreVars && this.argumentList[0] != expression.argumentList[0]){
				return false;
			}
			
			return this.argumentList[1].equals(expression.argumentList[1], ignoreVars);
		}

		if(this.argumentList.length != expression.argumentList.length){
			return false;
		}
		for(let i = 0; i < this.argumentList.length; i++){
			if(this.operator == "0"){
				//if ignoreVars, just check the first argument
				if(ignoreVars && this.argumentList[0] == expression.argumentList[0]){
					return true;
				}
				//else check all variables
				if(this.argumentList[i] != expression.argumentList[i]){
					return false;
				}
			} else {
				if(!this.argumentList[i].equals(expression.argumentList[i], ignoreVars)){
					return false;
				}
			}
		}

		return true;
	}

	stringOfSelf(){

		let argumentStrings = [];

		for(let i = 0; i < Expression.argumentAmount[this.operator]; i++){
			if(this.argumentList[i] == undefined){
				argumentStrings[i] = '_';
			}
			else if(this.operator == '0'){
				argumentStrings = this.argumentList;
			}
			else if("AE".includes(this.operator) && i == 0){
				argumentStrings[i] = this.argumentList[i];
			}
			else{
				argumentStrings[i] = this.argumentList[i].stringOfSelf();
			}
		}



		switch(this.operator){
			case ' ':
				return `undefined`;
			case '0':
				return `${argumentStrings.join("")}`; //	Should add some way to make non-index-0 arguments subscript, but this may not be the place for it.
				break;

			case '-':
				return `(${Expression.expressionMap[this.operator]} ${argumentStrings[0]})`;
				break;

			case '+':
			case '*':
			case '>':
			//case '=':
				return `(${argumentStrings[0]} ${Expression.expressionMap[this.operator]} ${argumentStrings[1]})`;
				break;

			case 'x':
				return `${Expression.expressionMap[this.operator]}`;
				break;

			case 'A':
			case 'E':
				return `(${Expression.expressionMap[this.operator]}${argumentStrings[0]}${argumentStrings[1]})`;
				break;


			default:
				return 'string of operator not yet defined';
		}
	}


	hasArgument(expression){

		//just plain bad code

		for(let argument of this.argumentList){
			if(argument.equals(expression)){
				return true;
			}
			//console.log(2);
		}

		return false;

	}

	copy(){
		//this likely keeps ponters to arguments and should be done recursively

		return new Expression(this.operator, ...this.argumentList);
		//
	}

	clear(){
		this.operator = ' ';
		this.argumentList = [];
	}

	get empty(){
		if(this.equals(new Expression())){
			return true;
		}
		return false;
	}

	set(expression){
		this.operator = expression.operator;
		this.argumentList = expression.argumentList;
	}

	get full(){

		if(this.operator == '0'){
			return true;
		}

		if(this.argumentList.length == Expression.argumentAmount[this.operator]){

			if("AE".includes(this.operator)){
				if(this.argumentList[1].full){
					return true;
				}
			}

			for(let argument of this.argumentList){
				if(!argument.full){
					return false;
				}
			}
			return true;
		}
		return false;
	}


	get scaledLength(){
		return this.stringOfSelf().visualLength();
	}


	//returns true if argument has been found a place in the expression
	insertArgument(argument){
		if(this.full){
			return false;
		}

		for(let i = 0; i < Expression.argumentAmount[this.operator]; i++){

			if(i >= this.argumentList.length){
				this.argumentList.push(argument);
				return true;
			}

			if("AE".includes(this.operator) && i == 0){
				continue;
			}


			if(this.argumentList[i].insertArgument(argument)){
				return true;
			}
		}
		return false;
	}

	applyVariable(variable){

		if(this.operator == "0" || "AE".includes(this.operator) && this.argumentList.length == 0){
			this.argumentList.push(variable);
			return true; 
		}

		for(let i = Expression.argumentAmount[this.operator]-1; i >= 0 ; i--){

			if(i >= this.argumentList.length){
				continue;
			}

			if(this.argumentList[i].applyVariable(variable)){
				return true;
			}
		}
		return false;
	}

	//needs optimization, it returns the same var multiple times in the list. Idk if it should, but for my currnet uses it is unnecessairy. Doesent cause any problems tho
	get usedVars(){
		let varList = [];

		if(this.operator == "0"){
			varList.push(...this.argumentList.slice(1, this.argumentList.length+1));

		} else if("AE".includes(this.operator)){
			varList.push(this.argumentList[0]);
			varList.push(...this.argumentList[1].usedVars);
			
		}else{
			for(let i = Expression.argumentAmount[this.operator]-1; i >= 0 ; i--){

				if(i >= this.argumentList.length){
					continue;
				}

				varList.push(...this.argumentList[i].usedVars);
			}
		}
		return varList;

	}


	containsVar(Va){
		if(this.operator == "0"){
			if(this.argumentList.slice(1, this.argumentList.length+1).includes(Va)){
				return true;
			}
			return false;
		} else if("AE".includes(this.operator)){
			if(this.argumentList[0] == Va){
				return true;
			}
			for(let i = 1; i < this.argumentList.length; i++){//unnecessairy, i will always just be 1, never incremented
				if(this.argumentList[i].containsVar(Va)){
					return true;
				}
			}
			return false;
		}

		for(let i = Expression.argumentAmount[this.operator]-1; i >= 0 ; i--){

			if(i >= this.argumentList.length){
				continue;
			}

			if(this.argumentList[i].containsVar(Va)){
				return true;
			}
		}
		return false;
	}

	getReplacedVars(Va, Vb){
		let replaced = this.copy();


		if(replaced.operator == '0'){
			for(let i = 1; i < replaced.argumentList.length; i++){
				if(replaced.argumentList[i] == Va){
					replaced.argumentList[i] = Vb;
				}
			}
		} else if('AE'.includes(replaced.operator)){
			if(replaced.argumentList[0] == Va){
				replaced.argumentList[0] = Vb;
			}
			replaced.argumentList[1] = replaced.argumentList[1].getReplacedVars(Va, Vb);
		} else {
			for(let i = 0; i < replaced.argumentList.length; i++){
				if(replaced.argumentList[i] instanceof Expression){
					replaced.argumentList[i] = replaced.argumentList[i].getReplacedVars(Va, Vb);
				}else{
					console.log('Expression.js getReplacedVars silent error');
				}
			}

		}
		return replaced;
	}


	// checks whenever a variable form this expression is different from the variable
	// in the same place in comparingExpression, that the variable form this expression
	// is Va and the variable form comparingExpression is Vb
	checkIfReplacedOnDifference(comparingExpression, Va, Vb){

		if(!this.equals(comparingExpression, true)){
			return false;
		}

		if(this.operator == '0'){
			for(let i = 1; i < this.argumentList.length; i++){
				if(this.argumentList[i] == Va && !(comparingExpression.argumentList[i] == Vb || comparingExpression.argumentList[i] == Va)){
					return false;
				}

				if(this.argumentList[i] != comparingExpression.argumentList[i]){
					if(!(this.argumentList[i] == Va && comparingExpression.argumentList[i] == Vb)){
						return false;
					}
				}


			}
		} else if('AE'.includes(this.operator)){
			if(this.argumentList[0] != comparingExpression.argumentList[0]){
				return false;
			}
			return this.argumentList[1].checkIfReplacedOnDifference(comparingExpression.argumentList[1], Va, Vb);
		} else {
			for(let i = 0; i < this.argumentList.length; i++){
				if(this.argumentList[i] instanceof Expression){
					if(!this.argumentList[i].checkIfReplacedOnDifference(comparingExpression.argumentList[i], Va, Vb)){
						return false;
					}
				}else{
					console.log('Expression.js checkIfReplacedOnDifference silent error');
				}
			}

		}
		return true;

	}


	//returns the variable form the expression in the argument
	firstDifferentVariable(expression){

		//equals part inefficient as only the first recursive itereation is this needed.
		if(!this.equals(expression, true)){
			return false;			//expressions different, aborting
		}

		if(this.operator == '0'){
			for(let i = 1; i < this.argumentList.length; i++){
				if(this.argumentList[i] != expression.argumentList[i]){
					return expression.argumentList[i];
				}
			}
			return true;			//expressions same, aborting
		}
		if('AE'.includes(this.operator)){
			if(this.argumentList[0] == expression.argumentList[0]){
				return this.argumentList[1].firstDifferentVariable(expression.argumentList[1]);
			}
			return true;
		}


		for(let i = 0; i < Expression.argumentAmount[this.operator]; i++){
			let result = this.argumentList[i].firstDifferentVariable(expression.argumentList[i]);
			if(result == true){
				if(this.argumentList.length == i){
					return true;	//expressions same, aborting
				}
				continue;
			} else {
				return result;
			}


		}


		return true;
	}



}