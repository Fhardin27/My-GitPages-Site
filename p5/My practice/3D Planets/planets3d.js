let planets = [];

function setup() {
  var cnv = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  cnv.style('display', 'block');
  planets.push(new planet(10, 0, 0, 0, true));
  planets.push(new planet(20, 200, 0, 100, true));
  planets.push(new planet(100, 500, 0, 500, true));
  colorMode(HSB);
}

function draw() {
  background(255);
  orbitControl();
  for (p of planets){
      p.show();
      if (p.rDist < 0){
        planets.splice(planets.indexOf(p), 1);
        planets[0].size += .5;
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
    this.rDist = x;
    this.framesPerOrbit = speed;
    this.oRotation = 0;
    this.color = random(360);
    this.perm = state;
  }

  show(){
    if (this.framesPerOrbit != 0){
      this.x = this.rDist * cos(this.oRotation);
      this.y = this.rDist * sin(this.oRotation);
      if (!this.perm)
        this.rDist -= 1;
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

function mouseClicked(){
  planets.push(new planet(random(50), mouseX, mouseY, random(100, 500), false));
}
