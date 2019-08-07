let trailSize = 100;

function setup() {
  colorMode(HSB);
  pulsars = [];
  let colors = [random(255), random(255), random(255)];
  for (let i = 0; i < 5; i++){
    pulsars.push(new Pulsar(colors));
  }
  var cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.style('display', 'block');
}

function draw() {
  background(0);
  for (let i = 0; i < 5; i++){
    pulsars[i].show();
  }
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
}

class Sun{ //just a ball that pulses

  constructor(color, s, x, y){
    this.x = x;
    this.y = y;
    this.size = s;
    this.color = color;
    this.goingDown = true;
    this.isGrowing = false;
  }

  update(){
    if (this.isGrowing == true){
      if (this.size > 50)
        this.isGrowing = false;
      this.size += 1;
    }
    else{
      if (this.size < 25)
        this.isGrowing = true;
      this.size -= 1;
    }

    if (this.y + 50 < window.innerHeight && this.goingDown){
      this.y += 1;
    }
    else{
      this.goingDown = false;
    }
    if (this.goingDown == false){
      this.y -= 1;
    }
    if (this.y - 50 < 0){
      this.goingDown = true;
    }
  }

  show(){
    this.update();
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.size);
  }
}

class Pulsar{ //two suns pulsing together with a trail

  constructor(colors){
    let x = random(window.innerWidth);
    let y = random(window.innerHeight);
    this.rays = [];
    this.rays.push(new Sun(color(colors), 30, x, y));
    this.rays.push(new Sun(color(random(255), random(255), random(255)), 5, x, y));
    this.Trail = [];
    this.Trail.push(new Trail(colors, this.rays[0]));
    for (let i = 1; i < trailSize; i++){
      this.Trail.push(new Trail(colors, this.Trail[i - 1]));
    }
  }

  show(){
    this.Trail[0].update(this.rays[0].x, this.rays[0].y);
    this.Trail[0].show();
    for (let i = 1; i < trailSize; i++){
      this.Trail[i].update(this.Trail[i - 1].lastX, this.Trail[i - 1].lastY);
      this.Trail[i].show();
    }
    this.rays[0].show();
    this.rays[1].show();
  }
}

class Trail{

  constructor(colors, head){
    this.x = head.x;
    this.y = head.y;
    this.lastY = this.y;
    this.lastX  = this.x;
    this.color = colors;
  }

  show(){
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, 20);
  }

  update(x, y){
    this.lastX = this.x;
    this.lastY = this.y;
    this.x = x;
    this.y = y;
  }
}
