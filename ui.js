let newButton, saveButton, fsButton;
let appCol = 0;
let appBg = '#1f2b45';

let button1, button2;

let vW, vMax, vMin;
let multiselectable = 0;


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

  fsButton = createImg('assets/enterFS.png');
  fsButton.style('height', '4.5vMax');
  fsButton.position(width-(7.5 * vMax), 1.5 * vMax);
  fsButton.mousePressed(fs);

  button1 = createImg('assets/icon1.0.png');
  button1.remove();
  button1 = createImg('assets/icon1.1.png');
  button1.style('width', '16vmax');
  button1.position(3 * vMax, height - (10 * vMax));
  button1.mousePressed(switcher);

  button2 = createImg('assets/icon2.1.png');
  button2.remove();
  button2 = createImg('assets/icon2.0.png');
  button2.style('width', '16vmax');
  button2.position(19 * vMax, height - (10 * vMax));
  button2.mousePressed(switcher);



}

function switcher(){
  multiselectable = !multiselectable;


  if (!multiselectable){

    button1.remove();
    button1 = createImg('assets/icon1.1.png');
    button1.style('width', '16vmax');
    button1.position(3 * vMax, height - (10 * vMax));
    button1.mousePressed(switcher);


    button2.remove();
    button2 = createImg('assets/icon2.0.png');
    button2.style('width', '16vmax');
    button2.position(19 * vMax, height - (10 * vMax));
    button2.mousePressed(switcher);
  }

  else {

    button1.remove();
    button1 = createImg('assets/icon1.0.png');
    button1.style('width', '16vmax');
    button1.position(3 * vMax, height - (10 * vMax));
    button1.mousePressed(switcher);


    button2.remove();
    button2 = createImg('assets/icon2.1.png');
    button2.style('width', '16vmax');
    button2.position(19 * vMax, height - (10 * vMax));
    button2.mousePressed(switcher);
  }




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
