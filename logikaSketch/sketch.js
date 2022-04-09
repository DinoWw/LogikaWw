

//TODO update index.html on outside of folder for ease of running

// http://localhost:8001/logikaSketch/index.html







let mainBranch;

let buttonList = {};


//redo, this is here only to better understand html n stuff
const inputField = document.getElementById("stringInput");
const flushButton = document.getElementById("flush");
flushButton.onclick = function(){
  console.log(inputField.value);
}




function setup() {
  createCanvas(700, 700);
  

  mainBranch = new Branch();

  buttonList = createButtons();


  mainBranch.activeDepth = 0;
  mainBranch.activeHeight = -1;
  mainBranch.replaceMode = false;

  //parser testing below, delete after

  const parseExpression = createParser();
  const trialExpression = parseExpression("Aa*-(Bc>A)+Cxy+$x(Fx*%y(Gxy))");
  console.log(trialExpression);
  console.log(trialExpression.stringOfSelf());




}

function draw() {
  background(200, 200, 255);


  for(let buttonKey of Object.keys(buttonList)){
    buttonList[buttonKey].draw();
  }

  if(frameCount % 30 == 0){
    //verifyTree(mainBranch, {}, 1);
    console.log('------------');
    verifyTree(mainBranch, {}, 1);
    //console.log('__');
    //console.log(mainBranch);
  }

 
  

  push();
  translate(0, 40);
  scale(40);
  //mainBranch.displaySelf(true);
  mainBranch.displaySelf(true, true);
  pop();




  text("LogicChecker V002.035; experimental build", 0, 700);

}



/*
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
*/