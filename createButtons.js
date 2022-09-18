function createButtons(inputHandler){

	let list = [];

  let posY = 0;
  let posX = 1;
  let defaultButtonWidth = 30;
  //let creatingButton;

  const buttonFromParams = function(label, text, size, x, y){
    let creatingButton = new Clickable();
    creatingButton.label = label;
    creatingButton.text = text;
    creatingButton.resize(size, size);
    creatingButton.pos = {'x': x, 'y' : y}
    creatingButton.locate(...coordsFromPos(x, y));
    return creatingButton;
  }

  const coordsFromPos = function(x, y){
    return [width - x*defaultButtonWidth - 5*x, 5+y*(defaultButtonWidth + 5)];
  }





  for(let label of Object.keys(Expression.expressionMap)){
    if('ao'.includes(label)){continue;}
    list[label] = buttonFromParams(label, Expression.expressionMap[label], defaultButtonWidth, posX, posY);
    posY ++;
  }
  for(let i = "A".charCodeAt(0); i < "A".charCodeAt(0)+5; i++){
    let label = "0" + String.fromCharCode(i);
    list[label] = buttonFromParams(label, String.fromCharCode(i), defaultButtonWidth, posX, posY);
    posY ++;

  }
  //variables
  for(let i = "a".charCodeAt(0); i < "a".charCodeAt(0)+5; i++){
    let label = "v" + String.fromCharCode(i);
    list[label] = buttonFromParams(label, String.fromCharCode(i), defaultButtonWidth, posX, posY);
    posY ++;

  }
  for(let i = "x".charCodeAt(0); i < "x".charCodeAt(0)+3; i++){
    let label = "v" + String.fromCharCode(i);
    list[label] = buttonFromParams(label, String.fromCharCode(i), defaultButtonWidth, posX, posY);
    posY ++;

  }
  posY = 0;
  posX++;
  for(let method of Object.keys(Statement.sourceAmount)){
    let label = method;
    list[label] = buttonFromParams(label, `${method[0]}. ${Expression.expressionMap[method[1]]}`, defaultButtonWidth, posX, posY);
    posY ++;
  }

  posY = 0;
  posX ++;
  for(let number = 1; number <= 15; number ++){
    let label = number;
    list[label] = buttonFromParams(label, number, defaultButtonWidth, posX, posY);
    posY ++;
  }

  posY = 0
  posX++;
  list['d0'] = buttonFromParams('d0', '[^]', defaultButtonWidth, posX, posY);
  posY ++;
  list['d1'] = buttonFromParams('d1', '[<]', defaultButtonWidth, posX, posY);
  posY ++;
  list['d2'] = buttonFromParams('d3', '[>]', defaultButtonWidth, posX, posY);
  posY ++;
  list['d3'] = buttonFromParams('d2', '[v]', defaultButtonWidth, posX, posY);
  posY ++;
  list['mode'] = buttonFromParams('mode', 'mode', defaultButtonWidth, posX, posY);
  posY ++;
  list['del'] = buttonFromParams('del', 'del', defaultButtonWidth, posX, posY);
  posY ++;

  posY = 0;
  posX ++;

  

  for(let i of Object.keys(list)){
    if(list[i].label == 'mode'){
      list[i].color = "#ffff00";
      list[i].onPress = inputHandler;
      list[i].onHover = function(){
        rect(mouseX - 120, mouseY, 120, 180);
        text(`yellow (default) - insert mode - will insert the next expression below the pointer

          blue - replace mode - will replace the expresson of the current line`, mouseX + 10 - 120, mouseY + 10, 100, 300);
      }
      continue;
    }


    list[i].onHover = function(){
      this.color = "#999999";
    };

    list[i].onPress = inputHandler;

    list[i].onOutside = function(){
      this.color = "#b4b4c8";
    };

  }


  return list;

}