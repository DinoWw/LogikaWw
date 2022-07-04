function generateInputHandler(mainBranch){
	return function(){
		
		let expressionCache = mainBranch.getFromIndex(mainBranch.activeHeight + int(!mainBranch.replaceMode)).expression;

		if(this.label[0] in Expression.argumentAmount){


			if(expressionCache.full){
				if(mainBranch.activeHeight != mainBranch.getHeight()){
					expressionCache = new Expression();
				}
			}

			if(expressionCache.operator == ' '){
				mainBranch.insertAtIndex(new Statement(new Expression(), 'ua'), mainBranch.activeHeight, mainBranch.activeDepth, mainBranch.replaceMode);
				expressionCache = mainBranch.getFromIndex(mainBranch.activeHeight + int(!mainBranch.replaceMode)).expression;
				if(this.label[0] != '0'){
					expressionCache.set(new Expression(this.label[0]));
				} else{
					expressionCache.set(new Expression(this.label[0], this.label[1]));
				}
				
			} else {
				if(this.label[0] != '0'){
					expressionCache.insertArgument(new Expression(this.label));
				} else{
					expressionCache.insertArgument(new Expression('0', this.label[1]));
				}
			}
			
			if(expressionCache.full){
				mainBranch.activeHeight += int(!mainBranch.replaceMode);
			}
			
			
		} else if("ui".includes(this.label[0])){
			mainBranch.getFromIndex(mainBranch.activeHeight).method = this.label;

			if(this.label[1] != "a"){return;}		//return and not continue cuz inside of that weird forEach loop
			mainBranch.branchOutFromIndex(mainBranch.activeHeight);
			mainBranch.activeDepth += 1;
		
		} else if(this.label == 'mode'){		//switch input mode
			mainBranch.replaceMode = !mainBranch.replaceMode;
	       	this.color = color(255*int(!mainBranch.replaceMode), 255*int(!mainBranch.replaceMode), 255*int(mainBranch.replaceMode));
      		
		}
		else if(this.label == 'del'){		//delete (watch out for direction lablels begining with 'd')
			mainBranch.cut(mainBranch.activeHeight);
		}
		else if(this.label[0] == 'd'){		//d-pad
			switch(this.label[1]){
				case '0': 		//up
				if(mainBranch.activeHeight == 0){
					break;
				}
				mainBranch.activeHeight -= 1;
				break; 
				case '1':		//enter
				if(mainBranch.activeDepth == 0){
					break;
				}
				mainBranch.activeDepth -= 1;
				break;
				case '2':  		//down
				if(mainBranch.activeHeight >= mainBranch.getHeight()){
					break;
				}
				mainBranch.activeHeight += 1;
				break;
				case '3':		//'anti' enter
				mainBranch.activeDepth += 1;
				break;
				default:
				console.log('not good, add code for that direction');
				break;
			}
		}
		else if(this.label[0] == "v"){			//variable
			if(expressionCache.empty){
				if(mainBranch.getFromIndex(mainBranch.activeHeight).expression.empty){
					mainBranch.insertAtIndex(new Branch(this.label[1]), mainBranch.activeHeight-1, mainBranch.activeDepth);	//really should refactor this
					mainBranch.activeDepth += 1;
				}
				else{
					mainBranch.getFromIndex(mainBranch.activeHeight).expression.applyVariable(this.label[1]);
				}	
			}
			else {
				expressionCache.applyVariable(this.label[1]);
			}	
		}
		else if(typeof(this.label) == "number"){
			mainBranch.getFromIndex(mainBranch.activeHeight).addSource(this.label);
		}
		else if(this.label == "export"){
			console.log(JSON.stringify(mainBranch));
		}
	};
}