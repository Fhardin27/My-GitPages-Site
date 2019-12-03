let BWIDTH = 100;
let BCOUNT = 75;
let CurrentCount = BCOUNT;

let A = [];
let outerLoop = 0;
let innerLoop = -1;
let continues = 0;
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
    UpdatePos(A);

    for (block of A) {
        block.show()
        block.h = false;
    }

    PopUpWindow();

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

        if (!Boolean(x)) {
            A[innerLoop + 1] = temp;
            innerLoop = -1;
        }
        else {
            A[innerLoop + 1] = temp;
        }
    }
    else if (outerLoop < A.length + 1) {
        outerLoop += 1;
        innerLoop = outerLoop - 1;
        continues = 0;
    }
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
            fill(this.c[0], this.c[1], this.c[2]);
            stroke(this.c[0], this.c[1], this.c[2]);
            rect(this.x, this.y, BWIDTH, this.s);
        }
    }
}

function UpdatePos(A) {
    for (i = 0; i < A.length; i++) {
        A[i].x = i * BWIDTH;
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
        BCOUNT = CurrentCount;
        BWIDTH = window.innerWidth / BCOUNT;
        outerLoop = 0;
        innerLoop = -1;
        continues = 0;
        H = 0;
        S = 255;
        B = 200;
        lastPos = 0;
        for (i = 0; i < BCOUNT; i += 1) {
            let size = random(10, window.innerHeight);
            H = map(size, 10, window.innerHeight, 0, 270);
            col = [H, S, B];
            A.push(new Block(lastPos, 0, size, col));
            lastPos += BWIDTH;
        }
    }
}