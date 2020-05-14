

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
var die = false;
var p1;

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

  if(!die){
    v.add(a);
    p.add(v);
    a.set(0, 0.1);
  }
  if(p.x<-100){v.x+=1}





  if (p.y - 10 < -height / 2 / s) {
    v.y = 0;
    p.y = constrain(p.y, -height / 2 / s + 10, height / 2 / s - 10 - 200);
  }

  if (keyIsDown(38) || keyIsDown(32) || keyIsDown(87) || mouseIsPressed) {
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
  }

  translate(-p.x - width/s/2+600,0);
  
  if (px.length == 0) {
    px.push(width / s + p.x - 580);
    py.push(random(-height / 2 / s, height / 2 / s - 400));
  }

  if (px[px.length - 1] + dif - p.x < width /s - 600) {
    px.push(width / s + p.x - 600);
    py.push(random(-height / 2 / s-400, height / 2 / s - 400));
  }
  
  fill(160, 220, 255);
  
  for (let i = 0; i < px.length; i++) {
    if(abs(px[i]-p.x)<width/s+200){
      strokeWeight(20);
      rect(px[i], py[i], 200, 400, 25)
      if (p.x > px[i] && p.x < px[i] + 200 && p.y > py[i] && p.y < py[i] + 400) {
        die = true;
        d.set(0,-0.5)
      }
    }  
  }
      if (p.y + 10 + 200 > height / 2 / s) {
        die = true;
        d.set(0,-0.5)
      }

  if(!die){
    score = round(p.x / 100);
  }
  if (hscore<score) {
    hscore = score
  }

  storeItem("hscore", hscore);


  strokeWeight(0)
 if ((keyIsDown(38) || keyIsDown(32) || keyIsDown(87) || mouseIsPressed) && frameCount%2==0) {
	for (var i = 0; i < 20; i++) {
		trailX.push(p.x+d.x*15);
		trailY.push(p.y+d.y*15);
        age.push(20+random(-5,5));
	}
		
 }
	for (let i = 0; i < trailX.length; i++) {
        strokeWeight(170-age[i]*10)
        stroke(255,age[i]/2)
		    point(trailX[i],trailY[i])
	      age[i] -=0.5
        if(age[i] <= 0){
	     	trailX.splice([i],1)
		    trailY.splice([i],1)
        age.splice([i],1);
	}
 }
