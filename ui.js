let newButton, saveButton, fsButton;
let appCol = 0;
let appBg = '#e3f3fc';

let vW, vMax, vMin;


function calcDimensions() {
  vW = width / 100;

  if (width > height) {
    vMax = width / 100;
    vMin = height / 100;
  } else {
    vMax = height / 100;
    vMin = width / 100;
  }
}


function saveNext(){

  newButton = createButton("Reset")
  newButton.class("select");
  newButton.position(width-(15 * vMax), height - (12.5 * vMax));
  newButton.style('font-size', '2.6vmax');
  newButton.style('height', '4.5vmax');
  newButton.mousePressed(reset);

  saveButton = createButton("Save")
  saveButton.class("select");
  saveButton.style('font-size', '2.6vmax');
  saveButton.style('height', '4.5vmax');
  saveButton.position(width-(15 * vMax), height - (6.5 * vMax));
  saveButton.mousePressed(saveImg);


  fsButton = createButton("FS")
  fsButton.class("select");
  fsButton.style('font-size', '2.6vmax');
  fsButton.style('height', '4.5vmax');
  fsButton.position(width-(15 * vMax), 1.5 * vMax);
  fsButton.mousePressed(fs);
}

function fs(){
  let fs = fullscreen();
 fullscreen(!fs);
}

function reset(){


initialiseLine();
drawActive = 1;
displayCurrent();

}


function saveImg() {

save('stringscape' + month() + day() + hour() + second() + '.jpg');
}
