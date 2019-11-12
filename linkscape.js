let x = [],
  y = [],
  segNum = 80,
  segLength = 15;

  let xintro = [0, 0],
  yintro = [0, 0],
  segLengthintro = 50;

  let introLayer;

let selectedArray = [];

let lineCanv, // lineLayer
  shadow, // shadowLayer
  texture,
  beginning;

let bgCol, stringCol;

let driftVal = 0,
  selected = 0,
  drawActive = 1;

let audio;

function preload() {
  texture = loadImage('assets/texture2.png');
  audio = loadSound('assets/audio.mp3');
  click = loadSound('assets/click.mp3');
}

function setup() {

  stringCol = color('#1c1c1c');
  bgCol = color('#f2f2f2');
  createCanvas(windowWidth, windowHeight);
  lineCanv = createGraphics(windowWidth, windowHeight);
  lineCanv.strokeWeight(45);
  lineCanv.stroke(stringCol, 255);

  initialiseLine();
  calcDimensions();
  textLayer = createGraphics(windowWidth, windowHeight);
  slide = 0;
  introLayer = createGraphics(width,height);
  introLayer.strokeWeight(20.0);
  introLayer.stroke(255, 100);
  slideShow();

}

function initialiseLine() {
  // in  this function, each time a new drawing is started
  // want to create a shape?
  background(255, 255);
  for (let i = 0; i < segNum; i++) {
    x[i] = random(0, width);
    y[i] = (height / segNum) * i;
  }

  dragCalc(0, width / 2, height / 2);
  displayCurrent();
}

function displayCurrent() {
  beginning = 1;
  touchMoved();
}


function touchEnded() {
  drawActive = 0;
}



function touchMoved() {

  if (introState === 3) {

    if (multiselectable) {
      if (!drawActive) {
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

        lineCanv.clear();

        if (beginning) {
          dragCalc(selected, width / 2, height / 2);
          beginning = 0;
        } else {
          dragCalc(selected, winMouseX, winMouseY);
        }
        blendMode(DIFFERENCE); // DIFFERENCE IS AMAZING // times 10
        image(lineCanv, 0, 20, width, height);
        blendMode(OVERLAY);
        image(texture, 0, 0, width, height);
        blendMode(BLEND);
        image(lineCanv, 0, 0, width, height);
      }
    } else {
      background(bgCol);
      // do we really need these Layers? // or do we need double the calculation of Lines

      lineCanv.clear();


      if (beginning) {
        dragCalc(selected, width / 2, height / 2);
        beginning = 0;
      } else {
        dragCalc(0, winMouseX, winMouseY);
      }

      blendMode(DIFFERENCE); // DIFFERENCE IS AMAZING // times 10
      image(lineCanv, 0, 20, width, height);
      blendMode(OVERLAY);
      image(texture, 0, 0, width, height);
      blendMode(BLEND);
      image(lineCanv, 0, 0, width, height);
    }
  } else {
    dragSegmentIntro(0, mouseX, mouseY);
dragSegmentIntro(1, xintro[0], yintro[0]);

  }


  return false;
}

function dragSegmentIntro(i, xin, yin) {
  const dx = xin - xintro[i];
  const dy = yin - yintro[i];
  const angle = atan2(dy, dx);
  xintro[i] = xin - cos(angle) * segLengthintro;
  yintro[i] = yin - sin(angle) * segLengthintro;
  segmentIntro(xintro[i], yintro[i], angle);
}

function segmentIntro(x, y, a) {
  introLayer.push();
  introLayer.translate(x, y);
  introLayer.rotate(a);
  introLayer.line(0, 0, segLengthintro, 0);
  introLayer.pop();
}

function dragCalc(_sel, _mouseX, _mouseY) {
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


}


function draw() {

  if (introState === 3) {

  } else {

    blendMode(BLEND);
    background(31, 43, 69, 100);

    if (slide > 0) {

      blendMode(BLEND);
      fill(color('#469ede'));
      noStroke();

    }

    if (slide === 0) {
    } else {
      textLayer.text(introText[slide - 1], width / 2, (height / 6) * (slide));
    } // this if else statgement needs to be replaced with a better system. The current state tracking is not working
    image(introLayer, 0, 0, width, height);
    image(textLayer, 0, 0, width, height);

  }

}
