let playerSize = 10;
let plankSize = [100, 15];
let gravity = playerSize * 1;
let jumpHeight = 15;
let plankDist = [700, 700];
let options = [-1, 1];
let counter = 0;
let coinCounter = 0;
let planks = [];
let lavaFloor;
let player;
let standingOnThis;
let locations = [];

function setup() {
  x = int(random(100, window.innerWidth - 100));
  y = int(random(100, window.innderHeight - 100));
  locations.push([x, y]);
  var cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.style('display', 'block');

  lavaFloor = new lava(0, height - 50); //set up the character and first platform
  player = new character(x, y);
  planks.push(new plank(x, y + (5 * playerSize))); //test plank spawns right under player
  standingOnThis = planks[0];

  for (i = 1; i < 20; i++){ //put the rest of the planks on the screen
    j = int(random(0, window.innerWidth));
    k = int(random(0, window.innerWidth));
    locations.push(getLocations(planks[i - 1]));
    planks.push(new plank(locations[i][0], locations[i][1]));
  }
}

function getLocations(floor){
  //below, below and left, below and right, above, above and left, above and right, not off the map
  j = int(random(2)); //checks to place left/right of current platform
  k = int(random(2)); //checks to place up/down
  if (j == 1)
    newX = floor.x + (options[j] * (plankDist[0] + plankSize[0]));
  else
    newX = floor.x + plankSize[0] + 100 + (options[j] * plankDist[0]);
  newY = floor.y + plankSize[1] + 100 + (options[k] * plankDist[1]);

  if (newX < 0)
    newX *= -2;
  else if (newX > window.innerWidth)
    newX -= (2 * plankDist[0]);
  if (newY < 0)
    newY *= -2;
  else if (newY > window.innerHeight)
    newY -= (2 * plankDist[1]);

  temp = [newX, newY];
  if (locations.includes(temp)){
    getLocations(floor);
  }
  return temp;
}

function draw() {
  background(0);

  for (i = 0; i < locations.length; i++)
    text(locations[i][0] + " " + locations[i][1], 100, 100 + (i * 10));

  for (i = 0; i < planks.length; i++){
    if (planks[i] == standingOnThis){ //is this the closest platform's index in the list
      player.show();
      player.update(standingOnThis);
    }
    else{
      planks[i].isCurrent = false;
      player.show();
    }
    planks[i].show();
  }
  lavaFloor.show();
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

function checkStanding(player, planks){ //returns a tuple of the
  let distances = [];
  min = 10000000;
  index = 0;
  for (i = 0; i < planks.length; i++){
    if (min > dist(player.x, player.y, planks[i].x, planks[i].y)){
      min = dist(player.x, player.y, planks[i].x, planks[i].y);
      index = i;
    }
  }
  standingOnThis = planks[index]; //the closest plank and its index in the list
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
    this.onPlatform = true; //true when you start, set to false when you are jumping and y value should never increase when on platform (no falling), only decrease possible (jumping)
    this.goingUp = false; //true only when the use jumps and the y value needs to decrease, then this is false and the user falls
  }

  show(){ //pass in the new x and y, works as an update function
    fill(0);
    stroke(255);
    characterShape(this.x, this.y);
  }

  update(floor){
    if (keyIsDown(LEFT_ARROW)){ //if player moving is on edge
      this.x -= playerSize;
    }
    if (keyIsDown(RIGHT_ARROW)){
      this.x += playerSize;
    }
    if (this.x + playerSize < floor.x || this.x - (2 * playerSize) > floor.x + plankSize[0]){ //if go off the edge, fall
        this.onPlatform = false;
    }
    else if (floor.y > this.y + (5 * playerSize) + gravity){
      this.onPlatform = false;
    }
    else if (floor.y < this.y){
      this.onPlatform = false;
    }
    else if (!this.goingUp){
      this.onPlatform = true;
    }

    if (keyIsDown(UP_ARROW) && !this.goingUp){ //if you aren't jumping, and are on a platform already (no infinite jumping)
      if (this.onPlatform){
        this.goingUp = true;
        this.onPlatform = false;
        floor.isCurrent = false;
      }
    }
    if (this.goingUp && !this.onPlatform){
      counter += 1;
      this.y -= gravity;
      if (counter == jumpHeight){
        this.goingUp = false;
        counter = 0;
      }
    }
    else if (floor.y > this.y + (5 * playerSize) && !this.onPlatform){
      if (floor.y == this.y + (5 * playerSize)){
        this.goingUp = false;
        this.onPlatform = true;
      }
    }
    if (!this.goingUp && !this.onPlatform){
      this.y += gravity;
    }
    else if (!this.goingUp){ //makes sure character is on the platform and not flaoting above
      this.y = floor.y - (5 * playerSize);
    }
  }
}

class plank{

  constructor(x, y){
      this.x = x;
      this.y = y;
  }

  show(){
    if (standingOnThis == this){
      colorMode(RGB, 255);
      fill(0, 0, 0);
      stroke(0, 255, 255);
    }
    else{
      colorMode(RGB, 255);
      fill(255, 255, 255);
      stroke(0, 255, 0);
    }
    rect(this.x, this.y, plankSize[0], plankSize[1]);
  }
}
