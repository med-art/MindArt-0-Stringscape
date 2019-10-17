//// TODO:
// add markers to pin, draggable from either center or lower

let colArray = ["#e02027", "#d64389", "#943390", "#0b52a0", "#499ed7", "#16ac84", "#0b7c40", "#135741", "#f8e400", "#f0b51d", "#f78f26", "#ed6623", "#ffffff", "#ddcba5", "#b05938", "#050606"];
//red, magenta, purple, darkblue, lightblue, bluegreen, green, darkgreen, yellow, mustard, wax, orange, white, sand, brown, black


let x = [],
  y = [],
  segNum =110,
  segLength = 30,
  numDots = 30,
  dotCanv,
  dotCol = [],
  dotX = [],
  dotY = [];
  dotDia = 40;


let lineCanv, shadow, texture, texture2;

let driftVal = 0;

let selected = 0;

let drawActive = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(60);

  dotCanv = createGraphics(windowWidth, windowHeight);
  dotCanv.strokeWeight(dotDia);

  texture = loadImage('assets/texture2.png');
  texture2 = loadImage('assets/texture3.png');

  dotCanv = createGraphics(windowWidth, windowHeight);
  dotCanv.strokeWeight(dotDia);

  lineCanv = createGraphics(windowWidth, windowHeight);
  lineCanv.strokeWeight(60);
  lineCanv.stroke(70, 240);

  shadow = createGraphics(windowWidth, windowHeight);
  shadow.blendMode(DARKEST);
  shadow.strokeWeight(68);
  shadow.stroke(245);






    background(255, 255);

    for (let i = 0; i < segNum; i++) {
      x[i] = random(0, width);
      y[i] = random(0, height);
    }

 dragCalc(0, width/2, height/2);
 touchMoved();

}

function scatterDot(){
for (let i = 0; i < (numDots - 1); i++){
  dotCol[i] = int(random(0, colArray.length-1));
  dotX[i] = int(random(0, width)); // add constraints based on %
  dotY[i] = int(random(0, height)); // add constrains based on %
  dotCanv.stroke(colArray[dotCol[i]]);
  dotCanv.point(dotX[i], dotY[i]);
}



}

function touchStarted(){

   for (i = 0; i < x.length-1; i++){

  if (dist(winMouseX, winMouseY, x[i], y[i]) < 45){
    selected = i;
    drawActive = 1;
    break;
  }

  else {
    drawActive = 0;
  }
}
return false;
}



function touchMoved() {

  if (drawActive){


  background(255, 180);


  shadow.clear();
  lineCanv.clear();

  dragCalc(selected, winMouseX, winMouseY);






  blendMode(MULTIPLY); // DIFFERENCE IS AMAZING // times 10
  for (let i = 0; i < 2; i++){
  image(shadow, i*2, i*20, width, height);
  }

  // blendMode(OVERLAY);
  // image(texture, 0, 0, width, height);


  blendMode(BLEND);
  image(lineCanv, 0, 0, width, height);


  // blendMode(LIGHTEST);
  // image(texture2, driftVal, 0, width, height);
}


  return false;


}

function dragCalc(_sel, _mouseX, _mouseY){

  dragSegment(_sel, _mouseX, _mouseY);
  for (let j = _sel; j < x.length - 1; j++) {
    dragSegment(j + 1, x[j], y[j]);
  }

  for (let j = _sel; j > 0; j--) {
    dragSegment(j - 1, x[j], y[j]);
  }
}

function dragSegment(i, xin, yin) {
  const dx = xin - x[i];
  const dy = yin - y[i];
  const angle = atan2(dy, dx);
  x[i] = xin - cos(angle) * segLength;
  y[i] = yin - sin(angle) * segLength;
  segment(x[i], y[i], angle);
}

function segment(x, y, a) {

  lineCanv.push();
  lineCanv.translate(x, y);
  lineCanv.rotate(a);
  lineCanv.line(0, 0, segLength, 0);
  lineCanv.pop();

  shadow.push();

  shadow.translate(x+10, y+10);
  shadow.rotate(a);
  shadow.line(0, 0, segLength, 0);
  shadow.pop();

}



function colorAlpha(aColor, alpha) {
  var c = color(aColor);
  return color('rgba(' + [red(c), green(c), blue(c), alpha].join(',') + ')');
}
