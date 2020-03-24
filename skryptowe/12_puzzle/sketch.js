class Piece {
	constructor(x, y, w, h) {
		this.pos = createVector(x, y);
		this.offset = createVector(x, y);
		this.width = w;
		this.height = h;
		
		this.snaped = false;
	}

	show(border) {
		image(img, this.pos.x, this.pos.y, this.width, this.height,
			this.offset.x, this.offset.y, this.width, this.height);
		
		if(border) {
			stroke(0);
			strokeWeight(1);
			noFill();
			rect(this.pos.x, this.pos.y, this.width, this.height);
		}
		else if(this.snaped) {
			stroke(0, 170, 0);
			strokeWeight(1);
			noFill();
			rect(this.pos.x, this.pos.y, this.width, this.height);		
		}
		
	}

	checkMouse() {
		if (mouseX > this.pos.x && mouseX < this.pos.x + this.width &&
			mouseY > this.pos.y && mouseY < this.pos.y + this.height && !this.snaped) {
			mouseOffset.x = mouseX - this.pos.x;
			mouseOffset.y = mouseY - this.pos.y;
			return this;
		}
	}
	
	checkSnap() {
		if(abs(this.pos.x - this.offset.x) < 10 && abs(this.pos.y - this.offset.y) < 10) {
			this.snaped = true;
			this.pos.x = this.offset.x;
			this.pos.y = this.offset.y;
		}
	}
	
	shuffle() {
		this.pos.x = random(0, width - this.width);
		this.pos.y = random(0, height - this.height);
	}
	
	move() {
		this.pos.x = mouseX - mouseOffset.x;
		this.pos.y = mouseY - mouseOffset.y;
	}
}

let dom_input;
let img;
let puzzle = [];
let selected = null;
let mouseOffset;


function setup() {
	//noCanvas();
	mouseOffset = createVector(0, 0);
	
	dom_input = createFileInput(file => {
		print(file);
		
		if (file.type === 'image') {
			loadImage(file.data, loadedImage => {
				img = loadedImage;
				
				createCanvas(img.width, img.height);

				let diff = 6;
				let puzzleWidth = width / diff;
				let puzzleHeight = height / diff;

				for(let x = 0; x < diff; x++) {
					for(let y = 0; y < diff; y++) {
						puzzle.push(new Piece(x * puzzleWidth, y * puzzleHeight, puzzleWidth, puzzleHeight));
					}
				}

				for(const piece of puzzle) {
					piece.shuffle();
				}
				
				dom_input.remove();
			});
		}
	});
}

function draw() {
	background(255);

	for (const piece of puzzle) {
		piece.show();
	}
	
	if(selected) {
		selected.move();
		selected.show(true);
	}
}

function mousePressed() {
	selected = null;
	
	for(let i = puzzle.length - 1; i >= 0; i--) {
		selected = puzzle[i].checkMouse();
		if(selected) return;
	}
}

function mouseReleased() {
	if(selected) {
		selected.checkSnap();
		
		puzzle.filter(el => el !== selected);
		puzzle.push(selected);
		selected = null;
	}
	
}