class Box {

  constructor(x, z) {
    this.x = x;
    this.z = z;
    this.dist = dist(x, z, 0, 0);
    this.offset = map(this.dist, 0, maxDistance, -PI, PI);
  }

}

let boxes = [];

let step = 25;
let w = step - 5;

let angle = 0;
let light;
let maxDistance;

function setup() {
  colorMode(HSL);

  createCanvas(600, 400, WEBGL);
  light = new createVector(200, 200, 200);
  maxDistance = dist(0, 0, 200, 200);

  for(let z = -200; z <= 200; z += step) {
    for(let x = -200; x <= 200; x += step) {
      let box = new Box(x, z);
      boxes.push(box);
    }
  }
}

function draw() {
  background(51);

  angle -= 0.1;
  //let x = sin(angle/4) * 400;
  //let z = cos(angle/4) * 400;

  let x = 400;
  let z = 400;

  camera(x, 400, z, 0, 0, 0, 0, -1, 0);
  //pointLight(255, 255, 255, light);

  for (const b of boxes) {
    let h = floor(map(sin(angle + b.offset), -1, 1, 100, 300));
    let hue = floor(map(h, 100, 300, 285, 0));

    push();
    translate(b.x, 0, b.z);
    let c = color(`hsl(${hue}, 100%, 50%)`);
    fill(c);
    //normalMaterial();
    //ambientMaterial(255, 255, 255);
    box(w, h, w);
    pop();
  }
}