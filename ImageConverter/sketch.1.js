const zzz = 16;

let img;

function preload() {
  img = loadImage('tofik.png');
}

function setup() {
  pixelDensity(1);
  createCanvas(720, 1080);

  image(img, 0, 0);
  loadPixels();

  colorSum = [];
  
  for (var i = 0; i < pixels.length; i += 4 * 4) {
  
    colorSum[i] = [];

    for(let x = 0; x < zzz; x++) {
      for(let y = 0; y < zzz; y++) {
        for(let c = 0; c < 4; c++) {
          colorSum[i][c] += pixels[i+c * x * y];
        }
      }
    }
  }

  for (var i = 0; i < pixels.length; i++) {
    pixels[i+0] = colorSum[i][0] / zzz;
    pixels[i+1] = colorSum[i][1] / zzz;
    pixels[i+2] = colorSum[i][2] / zzz;
    pixels[i+3] = 255;
  }

  updatePixels();
}