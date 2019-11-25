let explosions = [];

function setup() {
  var cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.style('display', 'block');
}

function draw() {
  background(200);
  text(explosions.length, 120, 120);
  for (i = 0; i < explosions.length; i++){
    explosions[i].show();
  }
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
}

class Particle{

  constructor(x, y, Vdirection, Hdirection){ //V is for vertical, H is horizontal
    this.size = 20;
    this.speed = random(10);
    this.color = (random(255), random(255), random(255));
    this.x = mouseX;
    this.y = mouseY;
    this.Vdirection = Vdirection;
    this.Hdirection = Hdirection;
  }

  show(){
    this.update();
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.size);
  }

  update(){
    if (this.Vdirection == "UP"){
      this.y -= this.speed;
    }
    else {
      this.y += this.speed;
    }

    if (this.Hdirection == "RIGHT"){
      this.x += this.speed;
    }
    else {
      this.x -= this.speed;
    }
  }
}

class Explosion{

  constructor(x, y){
    this.x = x;
    this.y = y;
    this.parts = [];
    this.parts.push(new Particle(mouseX, mouseY, "UP", "RIGHT"));
    this.parts.push(new Particle(mouseX, mouseY, "UP", "LEFT"));
    this.parts.push(new Particle(mouseX, mouseY, "DOWN", "RIGHT"));
    this.parts.push(new Particle(mouseX, mouseY, "DOWN", "LEFT"));
    for (i = 0; i < 20; i++){
        this.parts.push(new Particle(mouseX, mouseY, "DOWN", "LEFT"));
    }
  }

  show(){
    for (i = 0; i < this.parts.length; i++){
      this.parts[i].show();
    }
  }
}

function mousePressed(){
  explosions.push(new Explosion(mouseX, mouseY));
}
