/*

Methods legend


1. character ( + or -)
	u uvodjenje
	i iskljucivanje

2. character (many things)
	x protuslovlje
	- not
	+ or
	* and
	> kondicional



*/



function verifyTree(tree, validated, startIndex){
	
//testing mobile app
	//fill validated with assumptions as they are taken as truth and don't require validation
	tree.assumptions.forEach(function(assumption, index){
		validated[startIndex + index] = assumption;
		//console.log(assumption);
	});


	let valid = true;

	let index = tree.assumptions.length;

	tree.content.forEach(function(element){
		//console.log('next');
		//console.log(validated);
		//console.log(element);

		//valid = true;

		switch(element.type){
			case 'Statement':
			/**/
				if(element.sources.length != Statement.sourceAmount[element.method]){
					valid = false;
					break;
				}
			/**/

				// generic check if sources are valid
				if(!(['u-', 'u>', 'i+', 'iE'].includes(element.method))){   	//exception for those methods that dont adhere to this rule (often need trees as sources)
					for(let elementSource of element.sources){
						if(!(elementSource in validated)){
							valid = false;
							break;
						}
					}
				}

				if(valid){
					switch(element.method){
						case 'uo':				//opetovanje

							if(element.expression.equals(validated[element.sources[0]].expression)){
								break;
							}
							valid = false;

							break;
						case 'u-': 				//can't handle branches with multiple assumptions (shouldn't?)

							if(element.expression.operator != '-'){
								valid = false;
								break;
							}

							if(element.sources[0] in validated
								&& validated[element.sources[0]].type == 'Branch'
								&& validated[element.sources[0]].getDepthOfIndex(0) == 0
								&& validated[element.sources[0]].getDepthOfIndex(element.sources[1]-element.sources[0]) == 0
								&& new Expression('-', validated[element.sources[0]].getFromIndex(0).expression.copy()).equals(element.expression)){
								let contradiction = validated[element.sources[0]].getFromIndex(element.sources[1]-element.sources[0]);
								if(contradiction != false
									&& contradiction.expression.operator == 'x'){
									break;
								}
							}
							valid = false;

							break;

						case 'i-':

							if(validated[element.sources[0]].type == 'Statement'
							 && validated[element.sources[0]].expression.operator == '-'
							 && validated[element.sources[0]].expression.argumentList[0].operator == '-'
							 && validated[element.sources[0]].expression.argumentList[0].hasArgument(element.expression)){
								break;
							}
							valid = false;

							break;

						case 'ux':

							if(element.expression.operator != 'x'){
								valid = false;
								break;
							}

							if(new Expression('-', validated[element.sources[0]].expression).equals(validated[element.sources[1]].expression)
								|| new Expression('-', validated[element.sources[1]].expression).equals(validated[element.sources[0]].expression)){
								break;
							}

							valid = false;

							break;

						case 'u+':  	//uvodjenje disjunkcije
							if(element.expression.operator != '+'){
								valid = false;
								break;
							}

							if(element.expression.operator == '+' && element.expression.hasArgument(validated[element.sources[0]].expression)){
								break;
							}

							valid = false;
							break;

						case 'i+':  	//isljucenje disjunkcije

							if(element.sources[0] in validated
								&& element.sources[1] in validated
								&& element.sources[3] in validated
								&& validated[element.sources[0]].type == 'Statement'
								&& validated[element.sources[0]].expression.operator == '+'
								&& validated[element.sources[1]].type == 'Branch'
								&& validated[element.sources[3]].type == 'Branch'
								&& (validated[element.sources[0]].expression.argumentList[0].equals(validated[element.sources[1]].assumptions[0].expression)			//assumptions of trees at indecies 1 & 3 must be the arguments of disjunction at index 0
									&& validated[element.sources[0]].expression.argumentList[1].equals(validated[element.sources[3]].assumptions[0].expression)
									|| validated[element.sources[0]].expression.argumentList[0].equals(validated[element.sources[3]].assumptions[0].expression)
									&& validated[element.sources[0]].expression.argumentList[1].equals(validated[element.sources[1]].assumptions[0].expression))
								&& element.expression.equals(validated[element.sources[1]].getFromIndex(element.sources[2]-element.sources[1]).expression)
								&& validated[element.sources[1]].getDepthOfIndex(element.sources[2]-element.sources[1]) == 0
								&& element.expression.equals(validated[element.sources[3]].getFromIndex(element.sources[4]-element.sources[3]).expression)
								&& validated[element.sources[3]].getDepthOfIndex(element.sources[4]-element.sources[3]) == 0
								){
									break;
								}
						
							valid = false;

							break;

						case 'u*':
							if(element.expression.operator != '*'){
								valid = false;
								break;
							}

							if(element.sources.length != 2){
								valid = false;
								break;
							}

							for(let elementSource of element.sources){
							
								if(!(element.expression.hasArgument(validated[elementSource].expression))){
									valid = false;
									break;
								}
							}
							

							break;

						case 'i*':
							if(validated[element.sources[0]].expression.operator == '*'
								&& validated[element.sources[0]].expression.hasArgument(element.expression)){
								break;
							}

							valid = false;
							break;

						case 'u>':				//can't handle branches with multiple assumptions (shouldn't?)

							if(element.expression.operator != '>'){
								valid = false;
								break;
							}

							if(element.sources[0] in validated
								&& validated[element.sources[0]].type == 'Branch'																																															//checks that first source points to a tree
								&& validated[element.sources[0]].getDepthOfIndex(0) == 0																																											//IDK lol
								&& validated[element.sources[0]].getDepthOfIndex(element.sources[1]-element.sources[0]) == 0																									//checks that the second source is not part of a subtree
								&& element.expression.argumentList[0].equals(validated[element.sources[0]].getFromIndex(0).expression) 																				//checks that the assumption of the source tree is equal to the left side of the conditional statement 
								&& element.expression.argumentList[1].equals(validated[element.sources[0]].getFromIndex(element.sources[1]-element.sources[0]).expression)		//checks that the second source is equal to the right side of the conditional statement
							){
								break;
							}

							valid = false;

							break;

						case 'i>':
							if(!validated[element.sources[0]].expression.argumentList[0].equals(validated[element.sources[1]].expression)){
								valid = false;
								break;
							}
							if(!element.expression.equals(validated[element.sources[0]].expression.argumentList[1])){
								valid = false;
								break;
							}
							break;

						case 'uA':{

							let tempVar = element.expression.argumentList[1].firstDifferentVariable(validated[element.sources[0]].expression);

							for(const index in validated){
								const subject = validated[index];
								if(!(subject instanceof Statement)){continue;}
								if(subject.method != 'ua'){continue;}
								if(subject.expression.containsVar(tempVar)){
									valid = false;
									break;
								}
							}
							
							if(element.expression.argumentList[1].getReplacedVars(element.expression.argumentList[0], tempVar).equals(validated[element.sources[0]].expression)){
								break;
							}

							valid = false;

							break;
						}

						case 'iA':
							let varxA = validated[element.sources[0]].expression.argumentList[0];	//the variable in the expression
							let diffA = validated[element.sources[0]].expression.argumentList[1].firstDifferentVariable(element.expression); //the variable that replaced x
							
							if(diffA == false){
								valid = false;
								break;
							}
							if(diffA == true){
								valid = false;
								console.log('Reused variable name but no good way to prevent you to do so. Stop it.');
								break;
							}
							if(validated[element.sources[0]].expression.argumentList[1].getReplacedVars(varxA, diffA).equals(element.expression)){
								break;
							}

							valid = false;

							break;

						case 'uE':
							let varxE = element.expression.argumentList[0];	//the variable in the quantificator
							let diffE = element.expression.argumentList[1].firstDifferentVariable(validated[element.sources[0]].expression); //the variable that gets repolaced with x
							
							console.log(varxE, diffE);

							if(diffE == false){
								valid = false;
								break;
							}

							if(validated[element.sources[0]].expression.checkIfReplacedOnDifference(element.expression.argumentList[1], diffE, varxE)){
								break;
							}

							valid = false;

							break;

						case 'iE':{

							if(validated[element.sources[0]].type != 'Statement'
								|| validated[element.sources[0]].expression.operator != 'E'
								|| validated[element.sources[1]].type != 'Branch'
								|| validated[element.sources[1]].getDepthOfIndex(element.sources[2] - element.sources[1]) != 0){
								valid = false;
								break;
							}

							let tempVar = validated[element.sources[0]].expression.argumentList[1].firstDifferentVariable(validated[element.sources[1]].assumptions[0].expression);

							for(const index in validated){
								const subject = validated[index];
								if(!(subject instanceof Statement)){continue;}
								if(subject.method != 'ua'){continue;}
								if(subject.expression.containsVar(tempVar)){
									valid = false;
									break;
								}
							}
							
							if(validated[element.sources[0]].expression.argumentList[1].getReplacedVars(validated[element.sources[0]].expression.argumentList[0], tempVar).equals(validated[element.sources[1]].assumptions[0].expression)
								&& validated[element.sources[1]].getFromIndex(element.sources[2] - element.sources[1]).expression.equals(element.expression)
								&& !element.expression.containsVar(tempVar)){
								break;
							}


							valid = false;

							break;
						}

						default:
							valid = false;
							console.log('Attempted to validate not yet implemented or invalid operator');
					}
				}

				if(valid){
					validated[startIndex + index] = element; //Adds a valid statemnet to 'validated'
					console.log(`${element.method} correct at line ${startIndex + index}`);
					element.valid = true;
				} else {
					console.log(`${element.method} incorrect at line ${startIndex + index}`);
					element.valid = false;
				}


				index ++;

				break;

			case 'Branch':
				if(verifyTree(element, validated, startIndex + index)){//something to keep an eye on, I don't see why it would fail, but didn't really check either
					validated[startIndex + index] = element; //Adds a valid branch to 'validated'
				} else {
					valid = false;
				}

				index += element.getHeight();

				break;

			default:
			console.log('Some fuckery happening, be careful what you put in trees and branches');
		}
	});

	//cuz pass by refernence, this is nnecessairy
	for(let i of Object.keys(validated)){
		if(i < startIndex){continue;}

		delete validated[i];
	}


	return valid;


}

