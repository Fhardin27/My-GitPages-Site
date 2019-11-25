let A = [];
let BWIDTH = 100;
let BCOUNT = 10;
let outerLoop = 1;
let lastOuterLoop = -1;
let innerLoop = 0;

function setup() {
    var cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.style('display', 'block');
	BWIDTH = window.innerWidth / BCOUNT;
	frameRate(1);
	
	let lastPos = 0;
	for (i = 0; i < BCOUNT; i+=1){
		col = [random(1, 255), random(1, 254), random(1, 254)];
		A.push(new Block(lastPos, 0, random(0, window.innerHeight), col));
		lastPos += BWIDTH;
	}
}

function draw() {
    background(0);

	for (block of A){
		block.show()
    }
    //A[innerLoop + 1].h = false;

    if (outerLoop < A.length && innerLoop != -1) {
        temp = A[outerLoop];

        if (innerLoop >= 0 && temp.s < A[innerLoop].s) {
            text("okkkkkkkkkkkk", 100, 100);
            //A[innerLoop].h = true;
            A[]
            A[innerLoop + 1] = A[innerLoop];
            A[innerLoop] = 
            innerLoop -= 1;
        }
        else {
            A[outerLoop] = A[innerLoop];
            A[innerLoop] = temp;
            outerLoop += 1;
            innerLoop = outerLoop - 1;
        }
    }
    else
        innerLoop = outerLoop - 1;


    textSize(32);

    let y = 30;
    for (block of A) {
        text(block.s, 10, y);
        fill(255, 0, 0);
        y += 30;
    }
    text("inner" + innerLoop, 10, y);
    fill(255, 0, 0);
    text("outer" + outerLoop, 10, y + 30);
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