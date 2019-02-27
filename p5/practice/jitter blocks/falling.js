let blocks = [];

function setup() {
  cir = new mouseCircle(mouseX, mouseY);
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
}

function draw() {
  background(0); //new frame

  cir.update();
  cir.show();
  for (i = 0; i < blocks.length; i++){
    blocks[i].update();
    blocks[i].show();
  }
}

function mousePressed(){
  for (i = 0; i < 100; i++)
    blocks.push(new Block(mouseX, mouseY));
}

class mouseCircle{

  constructor(x, y){
    this.x = x;
    this.y = y;
    this.color = color(random(255), random(255), random(255));
    this.r = 50;
  }

  show(){
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.r);
  }

  update(){
    this.x = mouseX;
    this.y = mouseY;
  }
}

class Block{

  constructor(x, y){
    this.x = x;
    this.y = y;
    this.color = color(random(255), random(255), random(255));
    this.ogcolor = this.color;
    this.size = random(10, 30);
    this.isClose = false;
  }

  show(){
    fill(this.color);
    stroke(this.color);
    square(this.x, this.y, this.size);
  }

  update(){
    let dis = dist(this.x, this.y, mouseX, mouseY);
    if (dis < 75){
      if (this.isClose == false){
        this.x = mouseX + random(-10, 10);
        this.y = mouseY;
        this.isClose = true;
        this.color = color(cir.color);
      }
    }
    else if (this.isClose == true){
      if (dis > 300){
        this.isClose = false;
      }
    }
    else if (this.isClose == false){
      this.y += random(-5, 5);
      this.x += random(-5, 5);
      this.color = this.ogcolor;
    }
  }
}
