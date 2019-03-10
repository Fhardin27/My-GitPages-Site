let playerSize = 10;
let gravity = playerSize * 1;
let jumpHeight = 10;
let lavaFloor;
let player;

function setup() {
  var cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.style('display', 'block');
  lavaFloor = new lava(0, height - 50);
  player = new character(100, 100);
}

function draw() {
  background(0);
  lavaFloor.show();
  player.show(lavaFloor);
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
}

class lava{ //the ground floor that is lava

  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  show(){
    fill(255, 100, 0);
    stroke(255, 0, 0);
    rect(this.x, this.y, width, 1000);
  }
}

class character{ //the character you move as

  constructor(x, y){
    this.x = x;
    this.y = y;
    this.jump = false;
    this.landing = true;
    this.counter = 0;
  }

  show(floor){ //pass in the new x and y, works as an update function
    fill(0);
    stroke(255);
    checkInput(this, floor);
    characterShape(this.x, this.y);
  }
}

function characterShape(x, y){ //shapes our character, taking in the coordinates of them
  beginShape();
  vertex(x, y);
  vertex(x - playerSize, y);
  vertex(x - playerSize, y + playerSize);
  vertex(x - (2 * playerSize), y +playerSize);
  vertex(x - playerSize, y + (2 * playerSize));
  vertex(x - playerSize, y + (3 * playerSize));
  vertex(x - (2 * playerSize), y + (3 * playerSize));
  vertex(x - (2 * playerSize), y + (5 * playerSize));
  vertex(x - playerSize, y + (3 * playerSize));
  vertex(x, y + (3 * playerSize));
  vertex(x + playerSize, y + (5 * playerSize));
  vertex(x + playerSize, y + (3 * playerSize));
  vertex(x, y + (3 * playerSize));
  vertex(x, y + (2 * playerSize));
  vertex(x + playerSize, y + playerSize);
  vertex(x, y + playerSize);
  endShape(CLOSE);
}

function checkInput(player1, floor){ //checks the input before updating the players position
  if (keyIsDown(LEFT_ARROW)){
    player1.x -= playerSize;
  }
  if (keyIsDown(RIGHT_ARROW)){
    player1.x += playerSize;
  }
  if (player1.y + (5 * playerSize) < floor.y && player1.landing){ //find nearest platform near player, compare its y value with player1.y
    player1.y += gravity;
  }
  if (keyIsDown(UP_ARROW)){
    if (player1.jump == false){
      player1.jump = true;
      player1.landing = false;
    }
  }
    if (player1.counter < (jumpHeight * playerSize) && !player1.landing){
      player1.counter += playerSize;
      player1.y -= gravity;
    }
    else if (player1.counter > 0){
      player1.counter -= playerSize;
      player1.landing = true;
    }
    else{
      player1.counter = 0;
      player1.jump = false;
    }
}
