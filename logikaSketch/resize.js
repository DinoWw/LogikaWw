function resizeHandler(){
  resizeCanvas(max(windowWidth-30, 700), max(windowHeight-45 + 40*(max(mainBranch.getHeight()-16, 0)), 500));


	for(buttonKey in buttonList){
		button = buttonList[buttonKey];
		button.locate(width - button.pos.x*button.width - 5*button.pos.x, 5+button.pos.y*(button.height + 5));
	}



}