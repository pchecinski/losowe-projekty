let tiles, background, frame;

const rows = 20
const colums = 10;

let field = [];

function preload() {
    tilesImg = loadImage("images/tiles.png");
    frame = loadImage("images/frame.png");
	background = loadImage("images/background.png");
}

class Tiles {
    constructor() {
        console.log("tile set created");
    }

    
}

function setup() {
    createCanvas(320, 480);

    for(let r = 0; r < rows; r++) {
        field[r] = [];
    }

    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < colums; c++) {
            field[r][c] = Math.floor(random(8));
        }
    }

    let tiles = new Tiles();
    console.log(tiles);
}

let i = 0;
function draw() {
    image(background, 0, 0);

    //image(tiles, 0, 0, 18, 18, 0, 0, 18, 18);

    image(tilesImg, 28, 31 + 18 * i);
    

    if(frameCount % 20 == 0) i++;

    image(frame, 0, 0);
}