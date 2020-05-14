

var p;
var v;
var a;
var d;
var d1;
var s = 1 / 3;
var px = [];
var py = [];
var score = 0;
var hscore = 0;
var dif = 500;
var trailX = [];
var trailY = [];
var age = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  p = createVector(0, 0)
  v = createVector(0, -5)
  a = createVector(0, 0.1)
  d = createVector(0, -0.5)
  d1 = createVector(0,0);
  hscore = getItem('hscore');

}

function draw() {
  background(120, 180, 255);
  translate(width / 2, height / 2);
  scale(s);
  stroke(0,0,100)

  v.add(a);
  p.add(v);
  a.set(0, 0.1);

  if (p.y - 10 < -height / 2 / s) {
    v.y = 0;
    p.y = constrain(p.y, -height / 2 / s + 10, height / 2 / s - 10 - 200);
  }

  if (keyIsDown(38) || keyIsDown(32) || keyIsDown(87)) {
    a.add(d);
  }

  if (keyIsDown(37) || keyIsDown(65)) {
    d.rotate(-0.1);
  }

  if (keyIsDown(39) || keyIsDown(68)) {
    d.rotate(0.1);
  }

  if (keyIsDown(40) || keyIsDown(83)) {
    v.mult(0.9)
  }

  if(mouseIsPressed){
    d.x=-width/2/s+600-(mouseX/s-width/2/s)
    d.y=p.y-(mouseY/s-height/2/s)
    d.normalize();
    d.mult(-0.5);
    a.add(d)
  }

  translate(-p.x - width/s/2+600,0);
  
  if (px.length == 0) {
    px.push(width / s + p.x - 590);
    py.push(random(-height / 2 / s, height / 2 / s - 400));
  }

  if (px[px.length - 1] + dif - p.x < width /s - 600) {
    px.push(width / s + p.x - 600);
    py.push(random(-height / 2 / s-400, height / 2 / s - 400));
  }
  
  fill(160, 220, 255);
  
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

  storeItem("hscore", hscore);


  strokeWeight(0)
 if (keyIsDown(38) || keyIsDown(32) || keyIsDown(87) || mouseIsPressed) {
	for (var i = 0; i < 20; i++) {
		trailX.push(p.x+d.x*15);
		trailY.push(p.y+d.y*15);
        age.push(20);
	}
		
 }
	for (let i = 0; i < trailX.length; i++) {
        strokeWeight(210-age[i]*10)
        stroke(255,age[i]/2)
		    point(trailX[i],trailY[i])
	      age[i] -=0.5
        if(age[i] <= 0){
	     	trailX.splice(0,1)
		    trailY.splice(0,1)
        age.splice(0,1);
	}
 }

  
      
  
  
  fill(0);
  textSize(200);
  textFont('monoSpace');
  text("===>",0,0);
  
  strokeWeight(5);
  stroke(0,0,100);
  quad(p.x-d.y*15, p.y+d.x*15, p.x + d.x * 40, p.y + d.y * 40,p.x+d.y*15,p.y-d.x*15,p.x+d.x*5,p.y+d.y*5);
  
  translate(p.x + width/s/2-600, 0);
  
  fill(50,90,180);
  strokeWeight(20);
  rect(-width / 2 / s-20, height / 2 / s - 200, width / s+40, height / s)
  
  textSize(50);
  strokeWeight(0);
  fill(0);
  textFont('futura');
  text("score: " + score, -width / 2 / s + 50, -height / 2 / s + 100);
  text("high score: " + hscore, width / 2 / s - 500, -height / 2 / s + 100);


}
