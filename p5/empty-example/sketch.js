function setup() {
  var cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.style('display', 'block');
}

function draw() {
  background(0);
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
}
