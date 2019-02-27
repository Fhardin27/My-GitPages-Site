var snake; //the snake
var snakeColor; //random color of the snake
var direction; //the current direction the snake is moving
var foodBlock;
let currentSize = 20; //starting size of the snakes bits, may get smaller if gets really long

function setup() {
  frameRate(20);
  snake = [];
  foodBlock = new Snakefood();
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);

  direction = [currentSize, 0];
  snakeColor = color(random(255), random(255), random(255));
  snake.push(new snakeBit(window.innerWidth/2, window.innerHeight/2, snakeColor));
  for (i = 1; i < 10; i++){
    if (i % 2 == 0) {snake.push(new snakeBit(snake[i - 1].lastX - 1, snake[i - 1].lastY, snakeColor));}
    else {snake.push(new snakeBit(snake[i - 1].lastX - 1, snake[i - 1].lastY, color(0)));}
  }
}

function draw() {
  background(0);
  textAlign(RIGHT);
  drawWords(width - 50);

  foodBlock.show();
  foodBlock.update(snake);

  snake[0].show();
  automate(snake, foodBlock);
  snake[0].update(snake[0].x + direction[0], snake[0].y + direction[1]);
  for (i = 1; i < snake.length; i++){
    snake[i].show();
    snake[i].update(snake[i - 1].lastX, snake[i - 1].lastY)
  }
}

function automate(snake, foodBlock){
  if (snake[0].x < foodBlock.x - (currentSize / 2))
    direction = [currentSize, 0];
  else if (snake[0].x > foodBlock.x + (currentSize / 2))
    direction = [-1 * currentSize, 0];
  else if (snake[0].y < foodBlock.y - (currentSize / 2))
    direction = [0, currentSize];
  else if (snake[0].y > foodBlock.y + (currentSize / 2))
    direction = [0, -1 * currentSize];
  //call a function the checks if updating the head will touch another part of the snake, if it does, direction is changed, then calls itself to check again
}

function keyPressed(){ //if a arrow key is pressed change direction of the worm
  switch(keyCode){
    case LEFT_ARROW:
      direction = [-1 * currentSize, 0];
      break;
    case RIGHT_ARROW:
      direction = [currentSize, 0];
      break;
    case UP_ARROW:
      direction = [0, -1 * currentSize];
      break;
    case DOWN_ARROW:
      direction = [0, currentSize];
      break;
  }
}

class snakeBit{

  constructor(x, y, c){
    this.x = x;
    this.y = y;
    this.size = currentSize;
    this.color = c;
    this.lastX = x;
    this.lastY = y;
  }

  show(){
    fill(this.color);
    stroke(color(255));
    square(this.x, this.y, this.size);
  }

  update(x, y){
    this.lastX = this.x;
    this.lastY = this.y;

    // if (x >= window.innerWidth){
    //   direction = [-1 * currentSize, 0];
    //   this.x = this.x - currentSize;
    // }
    // else if (x < 1){
    //   direction = [currentSize, 0];
    //   this.x = this.x + currentSize;
    // }
    // else {
    //   this.x = x;
    // }
    // if (y >= window.innerHeight){
    //   direction = [0, -1 * currentSize];
    //   this.y = this.y - currentSize;
    // }
    // else if (y < 1){
    //   direction = [0, currentSize];
    //   this.y = this.y + currentSize;
    // }
    // else{
    //   this.y = y;
    // }
    this.x = x;
    this.y = y;
  }
}

class Snakefood{

  constructor(){
    this.x = random(currentSize, width - currentSize);
    this.y = random(currentSize, height - currentSize);
    this.color = color(random(255), random(255), random(255));
    this.size = currentSize;
  }

  show(){
    fill(this.color);
    stroke(color(255));
    square(this.x, this.y, this.size);
  }

  update(snake){
    let dis = dist(snake[0].x, snake[0].y, this.x, this.y);
    if (dis < currentSize){
      this.x = random(100, window.innerWidth - 100);
      this.y = random(100, window.innerWidth - 100);
      this.color = color(random(255), random(255), random(255));
      snake.push(new snakeBit(snake[snake.length - 1].lastX, snake[snake.length - 1].lastY, snakeColor));
      snake.push(new snakeBit(snake[snake.length - 1].lastX, snake[snake.length - 1].lastY, color(0)));
    }
  }
}

function drawWords(x){
  fill(255);
  text("Worm Length: " + str(snake.length/2), x, 80);
}

function directionCheck(){

}
