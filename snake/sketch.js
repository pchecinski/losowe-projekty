let sizeX, sizeY, snake, food;
const tile = 16;

class Snake {
	constructor() {
		this.pos = createVector(Math.floor(sizeX/2), Math.floor(sizeY/2));
		this.vel = createVector(1, 0);
		this.length = 1;
		this.tail = [];
	}

  	checkFood() {
		if(this.pos.equals(food)) {
			this.length++;
			food.set(Math.floor(random(sizeX)), Math.floor(random(sizeY)));
		}	
	}

	move() {
		this.pos.add(this.vel);

		if (this.pos.x == sizeX) {
			this.pos.x = 0;
		}
		if (this.pos.y == sizeY) {
			this.pos.y = 0;
		}
		if (this.pos.x < 0) {
			this.pos.x = sizeX - 1;
		}
		if (this.pos.y < 0) {
			this.pos.y = sizeY - 1;
		}

		this.tail.forEach(p => {
			if(this.pos.equals(p)) {
				this.dead = true;
				textAlign(CENTER);
				textSize(32);
				text("GAME OVER\npress any key to try again", sizeX * tile / 2, sizeY * tile /2);
				noLoop();
			}
		});

		for (var i = 0; i < this.tail.length - 1; i++) {
			this.tail[i] = this.tail[i + 1];
		}

		this.tail[this.length - 1] = this.pos.copy();
		this.checkFood();
	}

  	setDirection(keyCode) {
		if(keyCode == RIGHT_ARROW && !this.vel.equals(-1, 0)) {
			this.vel.set(1, 0);
			return;
		}
		if(keyCode == LEFT_ARROW && !this.vel.equals(1, 0)) {
			this.vel.set(-1, 0);
			return;
		}
		if(keyCode == UP_ARROW && !this.vel.equals(0, 1)) {
			this.vel.set(0, -1);
			return;
		}
		if(keyCode == DOWN_ARROW && !this.vel.equals(0, -1)) {
			this.vel.set(0, 1);
			return;
		}
	}
	
	draw() {
		noStroke();
		fill('#27ae60');
		this.tail.forEach(p => {
			rect(p.x * tile, p.y * tile, tile, tile);
		})
	}
}

function preload() {
	cherry = loadImage('cherry-16.png');
}

function setup() {
	sizeX = Math.floor(windowWidth / tile);
	sizeY = Math.floor(windowHeight / tile);

	createCanvas(sizeX * tile, sizeY * tile);
	frameRate(10);
	
	snake = new Snake();
	food = createVector(Math.floor(random(sizeX)), Math.floor(random(sizeY)));
}

function draw() {
	background(220);
	image(cherry, food.x * tile, food.y * tile);
	snake.move();
	snake.draw();
}

function keyPressed() {
	if(snake.dead) {
		snake = new Snake();
		loop();
	}
	snake.setDirection(keyCode);
}

let touchPosition, sweepCode;

function touchStarted() {
	console.log("start");

	touchPosition = createVector(mouseX, mouseY);
}

function touchEnded() {
	
	let sweepAngle = touchPosition.sub(mouseX, mouseY).heading();
	let sweepAngleAbs = abs(sweepAngle);

	console.log(sweepAngle);
	if(sweepAngleAbs > (3 * PI / 4)) {
		snake.setDirection(RIGHT_ARROW);
	}
	else if(sweepAngleAbs < PI / 4) {
		snake.setDirection(LEFT_ARROW);
	}
	else if(sweepAngle > 0) {
		snake.setDirection(UP_ARROW);
	}
	else {
		snake.setDirection(DOWN_ARROW);
	}
}

function touchMoved() {
	return false;
}