let BWIDTH = 100; //width of blocks based on screen size
let BCOUNT = 150; //number of blocks
let CurrentCount = BCOUNT;

let A = []; //array to be sorted
let currentSize = 1;
let left = 0;
let right = -1;
let merge = false;
let drawPopUp = true;

function setup() {
    var cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.style('display', 'block');
    BWIDTH = window.innerWidth / BCOUNT;
    colorMode(HSB, 255);
    let H = 0;
    let S = 255;
    let B = 200;

    let lastPos = 0;
    for (i = 0; i < BCOUNT; i += 1) {
        let size = random(10, window.innerHeight);
        H = map(size, 10, window.innerHeight, 0, 270);
        col = [H, S, B];
        A.push(new Block(lastPos, 0, size, col));
        lastPos += BWIDTH;
    }
}

function draw() {
    background(0);

    UpdateBCOUNT();

    let y = 10;
    for (block of A) {
        block.show()
        block.h = false;
    }
    PopUpWindow();

    //perform mergesort step by step
    if (currentSize < A.length - 1 && !merge) {
        if (left < A.length - 1) {
            merge = true;
            mid = left + currentSize - 1;
            if (2 * currentSize + left - 1 < A.length - 1) {
                right = 2 * currentSize + left - 1;
            }
            else {
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
    else if (currentSize >= A.length - 1 && BCOUNT % 2 != 0) {  //misses the last item sometimes, performs insertion sort on last item
        before = A.length - 2;
        smaller = A.length - 1;
        while (before >= 0 && (A[smaller].s < A[before].s)) {
            A[smaller].h = true;
            temp = A[before];
            A[before] = A[smaller];
            A[smaller] = temp;
            smaller -= 1;
            before -= 1;
        }
    }
    UpdatePos(A);
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

class Block {

    constructor(x, y, s, c) {
        this.x = x;
        this.y = y;
        this.c = c;
        this.s = s;
        this.h = false;
    }

    show() {
        if (this.h) {
            fill(0, 0, 255, 255);
            stroke(0, 0, 255, 255);
            rect(this.x, this.y, BWIDTH, this.s);
        }
        else {
            fill(this.c[0], this.c[1], this.c[2], 255);
            stroke(this.c[0], this.c[1], this.c[2], 50);
            rect(this.x, this.y, BWIDTH, this.s);
        }
    }
}

function UpdatePos(A) {
    for (i = 0; i < A.length; i++) {
        A[i].x = i * BWIDTH;
    }
}

function Merge(left, mid, right) {
    let n1 = mid - left + 1;
    let n2 = right - mid;
    l = [];
    r = [];
    for (let i = 0; i < n1; i++) {
        l.push(A[i + left]);
    }
    for (let i = 0; i < n2; i++) {
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
    while (k <= right) {
        if (l[i].s <= r[j].s) {
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

function PopUpWindow() {
    if (drawPopUp === true) {
        let x = 20;
        let y = 20;

        fill(0, 0, 100, 200);
        stroke(0, 0, 100, 255);
        rect(10, 10, 270, 120);

        fill(0, 0, 0, 255);
        stroke(0, 0, 0, 255);
        textSize(15);
        text("H - Hides/shows help window.", x, y += 20);
        text("Up arrow - increase things to sort.", x, y += 20);
        text("Down Arrow - decrease things to sort.", x, y += 20);
        text("R - Restart.", x, y += 20);
        text("Current sort count - " + CurrentCount, x, y += 20);
    }
}

function keyTyped() {
    if (key === 'h') {
        drawPopUp = !drawPopUp;
    }
    if (key === 'r') {
        A = [];
        let lastPos = 0;
        let H = 0;
        let S = 255;
        let B = 200;
        BCOUNT = CurrentCount;
        BWIDTH = window.innerWidth / BCOUNT;
        for (i = 0; i < BCOUNT; i += 1) {
            let size = random(10, window.innerHeight);
            H = map(size, 10, window.innerHeight, 0, 270);
            col = [H, S, B];
            A.push(new Block(lastPos, 0, size, col));
            lastPos += BWIDTH;
        }
        merge = false;
        currentSize = 1;
        left = 0;
        right = -1;
    }
}

function UpdateBCOUNT() {
    if (keyIsDown(UP_ARROW)) {
        CurrentCount += 1;
    }
    if (keyIsDown(DOWN_ARROW) && CurrentCount > 0) {
        CurrentCount -= 1;
    }
}