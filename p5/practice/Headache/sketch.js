let PXL_RES = 32;
let BFR_MULT = 1.1;
let val = 0;
let degs = 0;
let rotSpeed = 2;
let pixels = [];

function setup() {
  frameRate(30);
  colorMode(HSB, 360);
  BFR_MULT += random(0, .4);
  PXL_RES = random(32, 64);
  var cnv = createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  cnv.style('display', 'block');
  let pwidth = int(width/PXL_RES);
  let pheight = int(height/PXL_RES);

  for (i = -pwidth * BFR_MULT; i < pwidth * BFR_MULT; i++){
    for (j = -pheight * BFR_MULT; j < pheight * BFR_MULT; j++){
      pixels.push(new pxl(i * PXL_RES, j * PXL_RES));
    }
  }
  angleMode(DEGREES);
}

function draw() {
  translate(width/2, height/2);
  rotate(degs); //rotates the entire canvas around the origin
  for (row of pixels){
    row.show(map(sin(val), -1, 1, 0, 255));
    val += 1;
  }
  degs += rotSpeed;

  if (keyIsDown(UP_ARROW))
    rotSpeed += 1;
  if (keyIsDown(DOWN_ARROW))
    rotSpeed -= 1;
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

class pxl {

  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  show(col){
    fill(col, 360, 360);
    stroke(col, 360, 360);
    square(this.x, this.y, PXL_RES);
  }
}
