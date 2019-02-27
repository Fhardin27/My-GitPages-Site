let gravity = 1;
let balls = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
}

function draw() {
  background(0);
  for (i = 0; i < 3; i++){
    balls.push(new Ball(random(width), -10));
  }
  for (i = 0; i < balls.length; i++){
    balls[i].show();
    balls[i].update();

    if (balls[i].isUseful == false)
      balls.splice(i, 1);
  }
}

function mousePressed(){
  balls.push(new Ball(mouseX, mouseY, 12))
} //pushes a new ball object in the list to be looped through and updated

class Ball {

  constructor(x, y){
    this.x = x;
    this.y = y;
    this.drift = random(-2, 2);
    this.r = random(1, 6);
    this.speed = random(3);
    this.life = 0;
    this.isUseful = true;
    this.color = color(255, 255, 255);
  }

  show(){
    fill(this.color);
    stroke(this.color); //sets color to white
    ellipse(this.x, this.y, this.r);
  }

  update(){
    let dis = dist(this.x, this.y, mouseX, mouseY);
    let mlt = map(dis, width/2, 0, 1, 0.2);
    if (dis < 100){
      this.color = color(255, 0, 0);
      // if (this.x > mouseX)
      //   this.drift += mlt;
      // else
      //   this.drift += -mlt;
      this.y += this.speed * mlt;
      this.x += this.drift * mlt;
    }
    else{
      this.color = color(255);
      this.life += 1;
      this.y += this.speed;
      this.x += this.drift;
    }
    this.y *= gravity; //we want height to increase, going own the window

    if (this.life > 300)
      this.isUseful = false;
  }
}
