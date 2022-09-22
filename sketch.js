


let mainBranch;

let buttonList = {};


let  inputHandler;

//This should Likely be done in a more sensical matter
const parse = createParser();
const parseInput = document.getElementById("parseInput");
const parseFlush = document.getElementById("parseFlush");
parseFlush.onclick = function(){
 
  console.log(parse(parseInput.value));
  mainBranch.getFromIndex(mainBranch.activeHeight + int(!mainBranch.replaceMode)).expression = parse(parseInput.value);
};



function setup() {
  var canvas = createCanvas(max(windowWidth-30, 700), max(windowHeight-85, 700));
  canvas.parent('p5canvas');
  

  mainBranch = new Branch();

  inputHandler = generateInputHandler(mainBranch)
  buttonList = createButtons(inputHandler);


  mainBranch.activeDepth = 0;
  mainBranch.activeHeight = -1;
  mainBranch.replaceMode = false;



}

function draw() {
  background(25,25,40);


  for(let buttonKey of Object.keys(buttonList)){
    buttonList[buttonKey].draw();
  }

  if(frameCount % 30 == 0){
    console.log('------------');
    verifyTree(mainBranch, {}, 1);

    //could find a better place for this, but it works now so....
    resizeHandler();
  }

 
  

  push();
  translate(0, 40);
  scale(40);
  mainBranch.displaySelf(true, true, buttonList, 40, inputHandler);
  pop();




}

function windowResized() {
  resizeHandler();
}
