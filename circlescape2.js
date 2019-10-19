let numSegments = 20,
  x = [],
  y = [],
  angle = [],
  segLength = 20,
  targetX,
  targetY,
  moveDotActive = 0,
  segStroke = 30;

for (let i = 0; i < numSegments; i++) {
  x[i] = 0;
  y[i] = 0;
  angle[i] = 0;
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  x[x.length - 1] = width/2 // Set base x-coordinate
  y[x.length - 1] = height/2; // Set base y-coordinate
}

function touchStarted(){
  if (dist(winMouseX, winMouseY, x[x.length-1], y[x.length-1]) < segStroke){
  moveDotActive = 1;
  }

  for (let i = 0; i < x.length-2; i++){

    if (dist(winMouseX, winMouseY, x[i], y[i]) < segStroke){
      console.log(i);
    }

  }


}

function touchMoved(){

if (moveDotActive){
  x[x.length - 1] = mouseX; // Set base x-coordinate
  y[x.length - 1] = mouseY; // Set base y-coordinate
}

else if (!moveDotActive){
  reachSegment(0, mouseX, mouseY);
}

background(255);
strokeWeight(segStroke);
stroke(50, 200);



for (let i = 1; i < numSegments; i++) {
  reachSegment(i, targetX, targetY);
}

for (let j = x.length - 1; j >= 1; j--) {
  positionSegment(j, j - 1);
}

for (let k = 0; k < x.length; k++) {
  segment(x[k], y[k], angle[k]);
}

fill(255,0,0);
noStroke();
circle(x[x.length-1], y[x.length-1], segStroke*2, segStroke*2);


}

function touchEnded(){
  moveDotActive = 0;
}



function reachSegment(i, xin, yin) {
  const dx = xin - x[i];
  const dy = yin - y[i];
  angle[i] = atan2(dy, dx);
  targetX = xin - cos(angle[i]) * segLength;
  targetY = yin - sin(angle[i]) * segLength;
}

function positionSegment(a, b) {
  x[b] = x[a] + cos(angle[a]) * segLength;
  y[b] = y[a] + sin(angle[a]) * segLength;
}


function segment(x, y, a) {
  strokeWeight(50);
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}
