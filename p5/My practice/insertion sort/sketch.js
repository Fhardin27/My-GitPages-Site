let A = [];
let BWIDTH = 100;
let BCOUNT = 50;
let outerLoop = 0;
let innerLoop = -1;
let continues = 0;

function setup() {
    var cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.style('display', 'block');
	BWIDTH = window.innerWidth / BCOUNT;
	frameRate(10);

	let lastPos = 0;
	for (i = 0; i < BCOUNT; i+=1){
		col = [random(1, 255), random(1, 254), random(1, 254)];
		A.push(new Block(lastPos, 0, random(10, window.innerHeight), col));
		lastPos += BWIDTH;
	}
}

function draw() {
    background(0);

    UpdatePos(A);

	   for (block of A){
		     block.show()
         block.h = false;
    }

    if (outerLoop < A.length && innerLoop != -1) {
      temp = A[outerLoop - continues];

        var x = 0;
        if (innerLoop >= 0 && temp.s < A[innerLoop].s) {
            A[innerLoop + 1].h = true;
            A[innerLoop + 1] = A[innerLoop];
            innerLoop -= 1;
            x = 1;
            continues += 1;
        }

        if (!Boolean(x)){
          A[innerLoop + 1] = temp;
          innerLoop = -1;
        }
        else {
          A[innerLoop + 1]  = temp;
        }
     }
    else if (outerLoop < A.length + 1){
        outerLoop += 1;
        innerLoop = outerLoop - 1;
        continues = 0;
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

class Block{

	constructor(x, y, s, c){
		this.x = x;
		this.y = y;
		this.c = c;
		this.s = s;
		this.h = false;
	}

	show(){
		if (this.h){
			fill(255, 255, 0);
			stroke(255, 255, 255);
			rect(this.x, this.y, BWIDTH, this.s);
		}
		else{
			fill(this.c[0], this.c[1], this.c[2]);
			stroke(this.c[0], this.c[1], this.c[2]);
			rect(this.x, this.y, BWIDTH, this.s);
		}
	}
}

function UpdatePos(A){
  //checks which index of A the element is in a places it on the screen correctly
  //IE first thing in array is at 0, so it is at this.x = 0
  for (i = 0; i < A.length; i++){
    A[i].x = i * BWIDTH;
  }
}
