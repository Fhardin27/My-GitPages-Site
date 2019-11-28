let BWIDTH = 100; //width of blocks based on screen size
const BCOUNT = 500; //number of blocks
const FPS = 200;

let A = []; //array to be sorted
let currentSize = 1;
let left = 0;
let right = -1;
let merge = false;

function setup() {
  var cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.style('display', 'block');
  BWIDTH = window.innerWidth / BCOUNT;
  frameRate(FPS);
  colorMode(HSB);

  let H = 0;
  let S = 100;
  let B = 50;

	let lastPos = 0;
	for (i = 0; i < BCOUNT; i+=1){
    let size = random(10, window.innerHeight);
    H = map(size, 10, window.innerHeight, 0, 270);
    col = [H, S, B];
		A.push(new Block(lastPos, 0, size, col));
    lastPos += BWIDTH;
	}
}

function draw() {
  background(0);

  let y = 10;
  for (block of A){
     block.show()
     block.h = false;
  }

  //perform mergesort step by step
  if (currentSize < A.length - 1 && !merge){
    if (left < A.length - 1){
      merge = true;
      mid = left + currentSize - 1;
      if (2 * currentSize + left - 1 < A.length - 1){
        right = 2 * currentSize + left - 1;
      }
      else{
        right = A.length - 1;
      }
      Merge(left, mid, right);
      left = left + currentSize * 2;
    }
    else {
      currentSize *= 2;
      left = 0;
    }
  }
  UpdatePos(A);
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
			fill(0, 0, 100);
			stroke(0, 0, 100);
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
  for (i = 0; i < A.length; i++){
    A[i].x = i * BWIDTH;
  }
}

function Merge(left, mid, right){
  let n1 = mid - left + 1;
  let n2 = right - mid;
  l = [];
  r = [];
  for (let i = 0; i < n1; i++){
    l.push(A[i + left]);
  }
  for (let i = 0; i < n2; i++){
    r.push(A[mid + i + 1]);
  }
  l.push(new Block(0, 0, 99999999, col));
  r.push(new Block(0, 0, 99999999, col));


  console.log(l);
  console.log(r);
  console.log(A);
  let i = 0;
  let j = 0;
  let k = left;
  while (k <= right){
    if (l[i].s <= r[j].s){
      A[k] = l[i];
      i += 1
    }
    else {
      A[k] = r[j];
      j += 1;
    }
    A[k].h = true;
    k += 1;
    draw();
  }
  merge = false;
}
