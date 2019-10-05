// TODO:
// figure out how to only fill once certain criteria are met, i.e. a certain
// number of vertexes + minimum distance between array[0] for X and Y, and the
// last Array value

let lineArrayX = [];
let lineArrayY = [];

let bgLayer;
let fgLayer;


function setup(){
  createCanvas(windowWidth, windowHeight);

  bgLayer = createGraphics(windowWidth, windowHeight);
  fgLayer = loadImage('assets/background.jpg');


  bgLayer.background(255,220,220);
  bgLayer.strokeWeight(10);
  bgLayer.stroke(0);
  bgLayer.fill(0);

}


function touchStarted(){
  //clear the array

  return false;
}

function touchMoved(){
  lineArrayX.push(mouseX);
  lineArrayY.push(mouseY);

  bgLayer.beginShape();
  for (i = 0; i < lineArrayX.length; i++){
    bgLayer.curveVertex(lineArrayX[i], lineArrayY[i]);
  }
  bgLayer.endShape();

  return false;

}

function touchEnded(){
  console.log(lineArrayX);
  lineArrayX = [];
  lineArrayY = [];

  return false;

}

function draw(){
  blendMode(BLEND);
  image(bgLayer, 0, 0, width, height);
  blendMode(LIGHTEST);
  image(fgLayer, 0, 0, width, height);

}
