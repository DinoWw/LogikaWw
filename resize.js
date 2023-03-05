function resizeHandler(){
	let desiredX = max(windowWidth, 700);
	let desiredY = max(windowHeight-55, max(40*mainBranch.getHeight() + 45, 700));

	if(width != desiredX || height != desiredY){
	  resizeCanvas(desiredX, desiredY);


		for(buttonKey in buttonList){
			button = buttonList[buttonKey];
			button.locate(width - button.pos.x*button.width - 5*button.pos.x, 5+button.pos.y*(button.height + 5));
		}

	}

}


String.prototype.visualLength = function()
{
    var ruler = document.getElementById("ruler");
    ruler.innerHTML = this;
    return ruler.offsetWidth;
}
