let playerSize = 10;
let plankSize = [80, 15];
let gravity = playerSize * 1;
let jumpHeight = 15;
let plankDist = [50, 50];
let planks = [];
let standing;
let lavaFloor;
let player;

function setup() {
  var cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.style('display', 'block');
  lavaFloor = new lava(0, height - 50);
  player = new character(100, 100);
  planks.push(new plank(70, 100 + (5 * playerSize))); //test plank spawns right under player
  standing = planks[0];
  for (i = 1; i < 10; i++)
    planks.push(new plank(planks[i - 1].x + (2 *plankSize[0]), planks[i - 1].y + gravity));
}

function draw() {
  background(0);
  lavaFloor.show();
  for (i = 0; i < planks.length; i++){
    if (standing == planks[i]){
      player.show(planks[i]);
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

function checkInput(player1, floor){ //checks the input before updating the players position
  if (keyIsDown(LEFT_ARROW) && player1.x - (2 * playerSize) > 0){
    player1.x -= playerSize;
  }
  if (keyIsDown(RIGHT_ARROW) && player1.x + playerSize < width){
    player1.x += playerSize;
  }
  if (player1.y + (5 * playerSize) < floor.y && player1.landing){ //find nearest platform near player, compare its y value with player1.y
    player1.y += gravity;
  }
  if (keyIsDown(UP_ARROW) && player1.offPlank == false){
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
  if (player1.x + playerSize < floor.x){ //checks if the player is to far on a platform
    if (player1.jump == false)
      player1.y += gravity;
    player1.offPlank = true;
  }
  else if (player1.x - (2 * playerSize) > floor.x + plankSize[0]){
    if (player1.jump == false)
      player1.y += gravity;
    player1.offPlank = true;
  }
  else if (player1.y + (5 * playerSize) > floor.y && player1.offPlank == true){
    player1.y += gravity;
  }
  if (player1.x - (2 * playerSize) < floor.x + plankSize[0] && player1.x + playerSize > floor.x){
    if (player.y + (5 * playerSize) < standing.y)
      player1.offPlank = false;
    if (player1.landing == false)
      player1.jump = false;
  }
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
    this.jump = false;
    this.landing = true;
    this.offPlank = false;
    this.counter = 0;
  }

  show(floor){ //pass in the new x and y, works as an update function
    fill(0);
    stroke(255);
    checkInput(this, floor);
    characterShape(this.x, this.y);
  }
}

class plank{

  constructor(x, y){
      this.x = x;
      this.y = y;
      this.isCurrent = false;
  }

  show(){
    if (this == standing){
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
