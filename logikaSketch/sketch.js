

//TODO update index.html on outside of folder for ease of running

// http://localhost:8001/logikaSketch/index.html







let mainBranch;

let buttonList = {};


//This should Likely be done in a more sensical matter
const parse = createParser();
const parseInput = document.getElementById("parseInput");
const parseFlush = document.getElementById("parseFlush");
parseFlush.onclick = function(){
  console.log(parse(parseInput.value));
  mainBranch.getFromIndex(mainBranch.activeHeight + int(!mainBranch.replaceMode)).expression = parse(parseInput.value);
};



function setup() {
  var canvas = createCanvas(700, 700);
  canvas.parent('p5canvas');
  

  mainBranch = new Branch();

  buttonList = createButtons();


  mainBranch.activeDepth = 0;
  mainBranch.activeHeight = -1;
  mainBranch.replaceMode = false;

  //parser testing below, delete after

  /*
  const parseExpression = createParser();
  const trialExpression = parseExpression("Aa*-(Bc>A)+Cxy+$x(Fx*%y(Gxy))");
  console.log(trialExpression);
  console.log(trialExpression.stringOfSelf());
*/



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



  text("LogicChecker V002.036; experimental build", 0, 700);

}



/*
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
*/