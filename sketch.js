// 
// UPI PULSE: THE FUTURE OF DIGITAL BHARAT 
// Theme: India: Digital Payments (UPI) - Global Impact.

let scene = 0;
let particles = [];
let ripples = [];
let scanLineY = 0;
let sceneAlpha = 255;
let targetScene = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(5, 8, 20); // Deep Space Blue
  drawDigitalGrid();

  // Background Particles
  for (let p of particles) {
    p.update();
    p.show();
  }

  // Scene Logic with Smooth Fading
  push();
  if (scene == 0) introScene();
  else if (scene == 1) indiaScene();
  else if (scene == 2) globalScene();
  else if (scene == 3) dashboardScene();
  pop();

  // Screen Scanline Effect (Cyberpunk Feel)
  drawScanline();

  // Interaction Ripples
  for (let i = ripples.length - 1; i >= 0; i--) {
    ripples[i].update();
    ripples[i].show();
    if (ripples[i].alpha <= 0) ripples.splice(i, 1);
  }

  controlsUI();
}

function drawDigitalGrid() {
  stroke(0, 217, 255, 15);
  strokeWeight(1);
  for (let i = 0; i < width; i += 40) line(i, 0, i, height);
  for (let j = 0; j < height; j += 40) line(0, j, width, j);
}

function drawScanline() {
  stroke(0, 217, 255, 30);
  line(0, scanLineY, width, scanLineY);
  scanLineY = (scanLineY + 2) % height;
}

// ─── SCENE 0: CYBER INTRO ─────
function introScene() {
  let glow = 200 + sin(frameCount * 0.05) * 30;
  
  // Outer Pulse Rings
  noFill();
  stroke(0, 217, 255, 50);
  ellipse(width/2, height/2, glow + 50);
  ellipse(width/2, height/2, glow + 100);

  // Main Orb
  drawingContext.shadowBlur = 40;
  drawingContext.shadowColor = '#00D9FF';
  fill(0, 217, 255, 200);
  ellipse(width / 2, height / 2, glow);
  drawingContext.shadowBlur = 0;

  textAlign(CENTER, CENTER);
  fill(255);
  textSize(width * 0.07); 
  textStyle(BOLD);
  text("UPI PULSE", width / 2, height / 2 - 20);

  fill(0, 255, 150);
  textSize(22);
  textStyle(NORMAL);
  text("REVOLUTIONIZING GLOBAL PAYMENTS", width / 2, height / 2 + 80);
}

// ─── SCENE 1: NATIONAL GRID ──────
function indiaScene() {
  textAlign(CENTER);
  fill(255);
  textSize(28);
  text("NATIONAL INTEROPERABILITY MESH", width / 2, 80);
  
  drawIndiaMap();

  let cities = [
    { name: "DELHI", x: width / 2 - 20, y: height/2 - 120 },
    { name: "MUMBAI", x: width / 2 - 110, y: height/2 + 20 },
    { name: "BENGALURU", x: width / 2 - 40, y: height/2 + 130 },
    { name: "KOLKATA", x: width / 2 + 110, y: height/2 + 10 }
  ];

  cities.forEach(c => {
    // Glowing Data Streams
    stroke(0, 217, 255, 80);
    strokeWeight(1);
    line(width/2, height/2, c.x, c.y);

    let t = (frameCount * 0.02) % 1;
    let px = lerp(width/2, c.x, t);
    let py = lerp(height/2, c.y, t);

    noStroke();
    fill(0, 255, 150);
    ellipse(px, py, 8);
    
    // City Node
    fill(255);
    ellipse(c.x, c.y, 10);
    fill(0, 217, 255);
    textSize(12);
    text(c.name, c.x, c.y - 20);
  });
  
  // Core Hub
  fill(0, 217, 255, 150);
  ellipse(width/2, height/2, 40 + sin(frameCount*0.1)*5);
}

// ─── SCENE 2: GLOBAL EXPANSION ───
function globalScene() {
  textAlign(CENTER);
  fill(255);
  textSize(28);
  text("GLOBAL FINTECH REACH", width / 2, 80);

  let indiaX = width * 0.2;
  let indiaY = height / 2;

  // India Hub
  fill(0, 217, 255, 100);
  stroke(0, 217, 255);
  ellipse(indiaX, indiaY, 100);
  fill(255);
  text("INDIA HUB", indiaX, indiaY + 5);

  let countries = [
    { name: "UAE", x: width * 0.5, y: height * 0.3 },
    { name: "SINGAPORE", x: width * 0.8, y: height * 0.5 },
    { name: "FRANCE", x: width * 0.6, y: height * 0.8 }
  ];

  countries.forEach(c => {
    stroke(0, 255, 150, 60);
    strokeWeight(2);
    bezier(indiaX, indiaY, width/2, height/2, width/2, height/2, c.x, c.y);

    let t = (frameCount * 0.01) % 1;
    let px = bezierPoint(indiaX, width/2, width/2, c.x, t);
    let py = bezierPoint(indiaY, height/2, height/2, c.y, t);

    fill(0, 255, 150);
    noStroke();
    ellipse(px, py, 10);
    fill(255);
    ellipse(c.x, c.y, 15);
    text(c.name, c.x, c.y - 25);
  });
}

function dashboardScene() {
  fill(255);
  textAlign(CENTER);
  textSize(28);
  text("NETWORK ANALYTICS", width / 2, 80);

  let startX = width * 0.1;
  dashboardCard(startX, 180, "TOTAL VOLUME", "₹199L CR");
  dashboardCard(startX + width * 0.27, 180, "SUCCESS RATE", "99.98%");
  dashboardCard(startX + width * 0.54, 180, "GLOBAL BANKS", "620+");

  // Graph Build
  let gBase = height * 0.85;
  let gWidth = width * 0.6;
  let gStart = width * 0.2;
  stroke(255, 30);
  line(gStart, gBase, gStart + gWidth, gBase);

  let data = [120, 180, 260, 340];
  let labels = ["2021", "2022", "2023", "2024"];

  for (let i = 0; i < data.length; i++) {
    let bh = lerp(0, data[i], (sin(frameCount*0.05)+1)/2);
    let bx = gStart + i * (gWidth/3) - 30;
    
    noStroke();
    // Gradient effect
    fill(0, 217, 255, 150);
    rect(bx, gBase - bh, 60, bh, 5);
    fill(0, 255, 150);
    text(labels[i], bx + 30, gBase + 25);
    text("₹" + data[i] + "B", bx + 30, gBase - bh - 10);
  }
}

function drawIndiaMap() {
  push();
  translate(width/2, height/2);
  fill(15, 30, 60, 150);
  stroke(0, 217, 255, 180);
  strokeWeight(2);
  beginShape();
  vertex(-20, -200); vertex(20, -180); vertex(40, -120);
  vertex(120, -80); vertex(150, -70); vertex(140, -40);
  vertex(100, -30); vertex(110, 20); vertex(80, 80);
  vertex(30, 200); vertex(-20, 180); vertex(-60, 120);
  vertex(-120, 60); vertex(-150, 20); vertex(-130, -30);
  vertex(-80, -80); vertex(-40, -150);
  endShape(CLOSE);
  pop();
}

function dashboardCard(x, y, title, val) {
  fill(255, 10);
  stroke(255, 40);
  rect(x, y, width * 0.25, 120, 15);
  noStroke();
  fill(0, 217, 255);
  textSize(14);
  text(title, x + (width * 0.125), y + 40);
  fill(0, 255, 150);
  textSize(32);
  text(val, x + (width * 0.125), y + 90);
}

function controlsUI() {
  fill(255, 100);
  textSize(14);
  textAlign(CENTER);
  text("SYSTEM READY: PRESS SPACE TO NAVIGATE", width / 2, height - 30);
}

function keyPressed() {
  if (key == ' ') scene = (scene + 1) % 4;
}

function mousePressed() {
  ripples.push(new Ripple(mouseX, mouseY));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vel = random(0.2, 1);
  }
  update() {
    this.y += this.vel;
    if (this.y > height) this.y = 0;
  }
  show() {
    noStroke();
    fill(0, 217, 255, 50);
    ellipse(this.x, this.y, 2);
  }
}

class Ripple {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.r = 10; this.alpha = 255;
  }
  update() { this.r += 6; this.alpha -= 5; }
  show() {
    noFill();
    stroke(0, 255, 150, this.alpha);
    strokeWeight(2);
    ellipse(this.x, this.y, this.r);
  }
}
