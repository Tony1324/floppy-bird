var p;
var v;
var a;
var d;
var s = 1 / 3;
var px = [];
var py = [];
var score = 0;
var hscore = 0;
var dif = 500;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  p = new createVector(0, 0)
  v = new createVector(0, -5)
  a = new createVector(0, 0.1)
  d = new createVector(0, -0.5)

}

function draw() {
  function windowResized() {
    resizeCanvas(windowWidth - 20, windowHeight - 20);
  }
  background(220, 220, 255);
  translate(width / 2, height / 2);
  scale(s);

  v.add(a);
  p.add(v);
  a.set(0, 0.1);

  if (p.y - 10 < -height / 2 / s) {
    v.y = 0;
    p.y = constrain(p.y, -height / 2 / s + 10, height / 2 / s - 10 - 200);
  }

  if (keyIsDown(38) | keyIsDown(32)) {
    a.add(d);
  }

  if (keyIsDown(37)) {
    d.rotate(-0.1);
  }

  if (keyIsDown(39)) {
    d.rotate(0.1);
  }

  translate(-p.x - width/s/2+600, 0);
  
  if (px.length == 0) {
    px.push(width / s + p.x - 600);
    py.push(random(-height / 2 / s, height / 2 / s - 400));
  }

  if (px[px.length - 1] + dif - p.x < width /s - 600) {
    px.push(width / s + p.x - 600);
    py.push(random(-height / 2 / s-400, height / 2 / s - 400));
  }
  
  fill(200, 200, 200);
  
  for (let i = 0; i < px.length; i++) {
    strokeWeight(20);
    rect(px[i], py[i], 200, 400)
    if (p.x > px[i] && p.x < px[i] + 200 && p.y > py[i] && p.y < py[i] + 400) {
      px.length = 0
      py.length = 0
      v.mult(0);
      p.x = 0
      p.y = -200
      d.set(0, -0.5)
    }
    if (p.y + 10 + 200 > height / 2 / s) {
      px.length = 0
      py.length = 0
      v.mult(0);
      p.x = 0
      p.y = -200
      d.set(0, -0.5);
    }
  }

  score = round(p.x / 100);

  if (hscore<score) {
    hscore = score
  }

  v.limit(30);
  
  strokeWeight(2);
  fill(0);
  textSize(200);
  textFont('monoSpace');
  text("===>",0,0);
  textFont('futura');
  strokeWeight(15);
  stroke(255, 0, 0);
  line(p.x, p.y, p.x - d.x * 20, p.y - d.y * 20);
  strokeWeight(5);
  stroke(0);
  line(p.x, p.y, p.x + d.x * 50, p.y + d.y * 50);
  strokeWeight(20);
  point(p.x, p.y);
  translate(p.x + width/s/2-600, 0);
  //fill(255, 255, 255);
  fill(220);
  rect(-width / 2 / s, height / 2 / s - 200, width / s, height / s)
  textSize(50);
  strokeWeight(0);
  fill(0)
  text("score: " + score, -width / 2 / s + 50, -height / 2 / s + 100);
  text("high score: " + hscore, width / 2 / s - 500, -height / 2 / s + 100);


}
