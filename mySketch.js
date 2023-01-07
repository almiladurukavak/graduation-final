const lineThickness = 8;
var colors;

const colorProb = 1/3.0; // Proportion of colored rectangles
const maxIter = 2; // How deep to recursively subdivide rectangles
const rectMaxProportion = 0.8; // The maximum createCanvas of a rect division

//xorshift128+ algorithm. math.random()

function setup() {


  yellow = color(Math.floor(Math.random() * 5) + 250, Math.floor(Math.random() * 10) + 250, 0)
  blue = color(0, 0, Math.floor(Math.random() * 5) + 250)
  red = color(252, 71, 51)

	createCanvas(800, 800);
  strokeWeight(lineThickness);
  stroke(0);
  noLoop();


	 colors = [yellow, blue, red];
}

function draw() {
  drawRectangles(0+lineThickness/2, 0+lineThickness/2, width-lineThickness, height-lineThickness, 0);
  //saveFrame(timestamp() + ".png");
}

function drawRectangles(startPointX, startPointY, w, h, iter) {
  if (iter < maxIter) {
    var w1 = random(1-rectMaxProportion, rectMaxProportion);
    var w2 = 1 - w1;
    var h1 = random(1-rectMaxProportion, rectMaxProportion);
    var h2 = 1 - h1;
    
    // Top left
    if (iter == maxIter-1) {
      fill(DecideColor());
      rect(startPointX, startPointY, w1*w, h1*h);
    }
    drawRectangles(startPointX, startPointY, w1*w, h1*h, iter+1);
    
    // Top right
    if (iter == maxIter-1) {
      fill(DecideColor());
      rect(startPointX + w1*w, startPointY, w2*w, h1*h);
    }
    drawRectangles(startPointX + w1*w, startPointY, w2*w, h1*h, iter+1);
    
    // Bottom left
    if (iter == maxIter-1) {
      fill(DecideColor());
      rect(startPointX, startPointY + h1*h, w1*w, h2*h);
    }
    drawRectangles(startPointX, startPointY + h1*h, w1*w, h2*h, iter+1);
    
    // Bottom right
    if (iter == maxIter-1) {
      fill(DecideColor());
      rect(startPointX + w1*w, startPointY + h1*h, w2*w, h2*h);
    }
    drawRectangles(startPointX + w1*w, startPointY + h1*h, w2*w, h2*h, iter+1);
  }
}

function DecideColor() {
  if (random(1) < colorProb) {
    // Color
    return colors[int(random(colors.length))];
  } else {
    // White
    return color(255);
  }
}

function timestamp() {
  var  t = day() + "-" + month() + "-" + year() + " " + hour() + "." + minute() + "." + second();
  return t;
}