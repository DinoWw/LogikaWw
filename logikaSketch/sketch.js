

//TODO update index.html on outside of folder for ease of running

// http://localhost:8001/logikaSketch/index.html







let mainBranch;

let buttonList = {};



function setup() {
  createCanvas(700, 700);
  

  mainBranch = new Branch();

  buttonList = createButtons();


  mainBranch.activeDepth = 0;
  mainBranch.activeHeight = -1;
  mainBranch.replaceMode = false;

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




  text("LogicChecker V002.033; experimental build", 0, 700);

}