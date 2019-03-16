let playerSize = 10;
let plankSize = [100, 15];
let gravity = playerSize * 1;
let jumpHeight = 15;
let plankDist = [100, 150];
let planks = [];
let lavaFloor;
let player;

function setup() {
  x = 200;
  y = 200;
  var cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.style('display', 'block');

  lavaFloor = new lava(0, height - 50); //set up the character and first platform
  player = new character(x, y);
  planks.push(new plank(x, y + (5 * playerSize))); //test plank spawns right under player
  planks[0].isCurrent = true;

  for (i = 1; i < 20; i++) //put the rest of the planks on the screen
    planks.push(new plank(random(planks[i - 1].x + plankDist[0], planks[i - 1].y + plankDist[1]),
                          random(planks[i - 1].x + plankDist[0], planks[i - 1].y + plankDist[1])));
}

function draw() {
  background(0);
  lavaFloor.show();
  for (i = 0; i < planks.length; i++){
    if (planks[i].isCurrent){
      player.show();
      player.update(floor);
    }
    planks[i].show();
  }
  checkStanding(player, planks);
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
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

function checkStanding(player, planks){
  let distances = [];
  min = 10000000;
  index = 0;
  for (i = 0; i < planks.length; i++){
    if (min > dist(player.x, player.y, planks[i].x, planks[i].y)){
      min = dist(player.x, player.y, planks[i].x, planks[i].y);
      index = i;
    }
  }
  standing = planks[index];
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
  }

  show(){ //pass in the new x and y, works as an update function
    fill(0);
    stroke(255);
    characterShape(this.x, this.y);
  }

  update(foor){
    if (keyIsDown(LEFT_ARROW) && this.x - (2 * playerSize) > 0){
      this.x -= playerSize;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x + playerSize < width){
      this.x += playerSize;
    }
    if (keyIsDown(UP_ARROW)){
      //check when you walk off a plank, when jumped and go off plank
    }
  }
}

class plank{

  constructor(x, y){
      this.x = x;
      this.y = y;
      this.isCurrent = false; //if this is the current platform being stood on, if jumping not on any platform
  }

  show(){
    if (this.isCurrent){
      colorMode(RGB, 255);
      fill(0, 0, 0);
      stroke(0, 255, 0);
    }
    else{
      colorMode(RGB, 255);
      fill(255, 255, 255);
      stroke(0, 255, 0);
    }
    rect(this.x, this.y, plankSize[0], plankSize[1]);
  }

  update(){

  }
}
