let planets = [];
let lastDied;
let isGrowing = true;
let waitCounter = 0;

function setup() {
  var cnv = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  cnv.style('display', 'block');
  planets.push(new planet(10, 0, 0, 0, true));
  planets.push(new planet(20, 0, 0, 300, true));
  planets.push(new planet(50, 300, 0, 5000, false));
  planets.push(new planet(500, 450, 0, 1000, true));
  planets.push(new planet(100, 500, 0, 700, false));
  planets.push(new planet(200, 400, 0, 3000, false));
  planets.push(new planet(150, 700, 0, 1500, true));
  planets.push(new planet(300, 900, 0, 2000, true));
  camera(0, 0, 5000, 0, 0, 0, 0, 1, 0);
  colorMode(HSB);
  frameRate(30);
}

function draw() {
  background(10);
  orbitControl();
  for (p of planets){
      p.show();
      planets[0].show();
      if (p.rDist < 0){
        lastDied = p.size / 10;
        planets.splice(planets.indexOf(p), 1);
        planets.push(new planet(random(20, 150), 0, 0, random(100, 2000), false));
        if (isGrowing){
          if (planets[0].size < 1000)
            planets[0].size += lastDied;
          else
            isGrowing = false;
        }
      }

      if (!isGrowing){
        if (waitCounter > 100000){
          waitCounter = 0;
          isGrowing = true;
          planets[0].size = 10;
        }
        else{
          waitCounter ++;
          if (planets[0].size > 10)
            planets[0].size -= 1;
          else {
            planets[0].size = 10;
          }
        }
      }
    }
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
}

class planet{

  constructor(s, x, y, speed, state){
    this.size = s;
    this.x = x;
    this.y = y;
    this.rDist = speed * 2;
    this.framesPerOrbit = speed;
    this.oRotation = 0;
    this.color = random(360);
    this.perm = state;
  }

  show(){
    if (this.framesPerOrbit != 0){
      this.x = this.rDist * cos(this.oRotation);
      this.y = this.rDist * sin(this.oRotation);
      if (!this.perm){
        if (isGrowing){
          this.rDist -= 2;
          if (this.framesPerOrbit > 20)
            this.framesPerOrbit -= random(1, 5);
        }
        else{
          this.rDist += 3;
          this.framesPerOrbit += random(1, 5);
        }
      }
    }
    else{
      this.x = 0;
      this.y = 0;
      this.rDist = 10;
    }

    if (this.x == this.y && this.y == 0){
      fill(0);
      stroke(0);
    }
    else{
      fill(this.color, 100, 100);
      stroke(this.color, 100, 100);
    }

    push();
    translate(this.x, this.y, 0);
    sphere(this.size);
    pop();
    this.oRotation += ((2 * PI) / this.framesPerOrbit);
  }

}

function mousePressed(){
  planets.push(new planet(random(20, 100), 0, 0, random(100, 1000), false));
}
