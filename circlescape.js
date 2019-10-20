//// TODO:
/*
add markers to pin, draggable from either center or lower
consider optimising by having one fixed background Layer,
which is used with a Layer mask from Shadow
write in UI, (next, save).
further optimisation to chain functions

  Try this:
  When array value is being located IF one is found, then a secondary loop is run
  in order to find all of them within that radius search
  Then all of those X values are stored in an array with a secondary array of their array
  location within the chain. Then they are sorted to find shortest distance, locating the equivalent
  array. Then that array is the chosen one, and the array is broken out of

*/


let x = [],
  y = [],
  segNum = 120,
  segLength = 25;

  let beginning;

  let selectedArray = [];

let lineCanv, // lineLayer
  shadow, // shadowLayer
  texture;

  let bgCol, stringCol;



let driftVal = 0, selected = 0, drawActive = 1;

function preload() {
  texture = loadImage('assets/texture1.png');
}

function setup() {

   stringCol = color('#F2E8DF');
bgCol = color('#D9B29C');

  createCanvas(windowWidth, windowHeight);
  // strokeWeight(60); // not required, confirm deletion?

  lineCanv = createGraphics(windowWidth, windowHeight);
  lineCanv.strokeWeight(45);
  lineCanv.stroke(stringCol, 255);

  shadow = createGraphics(windowWidth, windowHeight);
  shadow.blendMode(DARKEST);
  shadow.strokeWeight(50);
  shadow.stroke(229);



  initialiseLine();



  calcDimensions();
  saveNext();

}

function initialiseLine() {
  // in  this function, each time a new drawing is started
  // want to create a shape?
  background(255, 255);

  for (let i = 0; i < segNum; i++) {
    x[i] = random(0, width);
    y[i] = (height/segNum)*i;
  }

  dragCalc(0, width / 2, height / 2);
  displayCurrent();



}

function displayCurrent(){
  beginning = 1;
  touchMoved();
}


function touchEnded() {

drawActive = 0;

}

function touchMoved() {


if (!drawActive){

  for (i = 0; i < x.length - 1; i++) {
    if (dist(winMouseX, winMouseY, x[i], y[i]) < 45) {
      selected = i;
      drawActive = 1;
      break;
      } else {
          drawActive = 0;
    }
  }
}

  if (drawActive) {
    background(bgCol);
    // do we really need these Layers? // or do we need double the calculation of Lines
    shadow.clear();
    lineCanv.clear();


    if (beginning){
    dragCalc(selected, width/2, height/2);
    beginning = 0;
    }
    else {
    dragCalc(selected, winMouseX, winMouseY);
    }


    blendMode(MULTIPLY); // DIFFERENCE IS AMAZING // times 10
    for (let i = 0; i < 2; i++) {
      image(shadow, i * 2, i * 20, width, height);
    }
    // drawing sequence
    // blendMode(OVERLAY);
    // image(texture, 0, 0, width, height);
    blendMode(BLEND);
    image(lineCanv, 0, 0, width, height);
  }
  return false;
}

function dragCalc(_sel, _mouseX, _mouseY) {
// _sel is the position in the line sequence, the below runs the dragSegment (atan2 calc)
// over both directions from that point in the array.
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
  const angle = (atan2(dy, dx));
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
  shadow.translate(x + 10, y + 10);
  shadow.rotate(a);
  shadow.line(0, 0, segLength, 0);
  shadow.pop();
}
