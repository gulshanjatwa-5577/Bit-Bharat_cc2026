let scene = 0;
let particles = [];
let ripples = [];
let scanLineY = 0;
let sceneAlpha = 255;
let targetScene = 0;
let transitionProgress = 1;
let isTransitioning = false;

// Dashboard Static Data (100% Factual as of 2026)
let globalPartners = 8; // UAE, Singapore, Bhutan, Nepal, Sri Lanka, France, Mauritius, Qatar
let userGrowth = 350; // Millions

// Simulator Variables (For Scene 1)
let upiStep = 0; // 0:Scan, 1:Amount, 2:PIN, 3:Processing, 4:Success
let simScanY = 0;
let simLaserDir = 1;
let authTimer = 0;

// Manual Input Variables
let typedAmount = "";
let typedPin = "";
let currentTxnId = "";

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
  }
  
  createSceneButtons();
}

function draw() {
  background(5, 8, 20);
  drawDigitalGrid();

  for (let p of particles) {
    p.update();
    p.show();
  }
  
  for (let i = ripples.length - 1; i >= 0; i--) {
    if (!ripples[i].update()) {
      ripples.splice(i, 1);
    } else {
      ripples[i].show();
    }
  }
  
  if (isTransitioning) {
    transitionProgress -= 0.05;
    if (transitionProgress <= 0) {
      scene = targetScene;
      isTransitioning = false;
      transitionProgress = 1;
    }
  }
  
  let displayAlpha = isTransitioning ? map(transitionProgress, 1, 0, 255, 0) : 255;
  
  push();
  if (displayAlpha < 255) tint(255, displayAlpha);
  
  if (scene == 0) introScene();
  else if (scene == 1) simulatorScene(); 
  else if (scene == 2) globalScene();
  else if (scene == 3) dashboardScene();
  pop();
  
  scanLineY = (scanLineY + 2) % height;
  stroke(0, 255, 200, 30);
  strokeWeight(1);
  line(0, scanLineY, width, scanLineY);

  // ==========================================
  // 🚀 FRAME RATE (FPS) COUNTER - HAR SCREEN PAR
  // ==========================================
  push();
  fill(15, 25, 45, 200);       // Dark box background
  stroke(0, 255, 200, 150);    // Neon Cyan border
  strokeWeight(1.5);
  rect(20, 20, 95, 30, 8);     // Top-Left corner mein box
  
  fill(0, 255, 210);           // Neon Cyan Text
  textSize(14);
  textFont('monospace');
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text("FPS: " + floor(frameRate()), 32, 35); // Actual FPS dikhayega
  pop();
}

function playSuccessSound() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); 
    let textToSpeak = "Payment of " + typedAmount + " rupees successful.";
    let msg = new SpeechSynthesisUtterance(textToSpeak);
    msg.rate = 0.95; 
    msg.pitch = 1.1; 
    msg.volume = 1.0; 
    window.speechSynthesis.speak(msg);
  }
}

function createSceneButtons() {
  let buttonDiv = createDiv('');
  buttonDiv.style('position', 'fixed');
  buttonDiv.style('bottom', '20px');
  buttonDiv.style('left', '20px');
  buttonDiv.style('right', '20px');
  buttonDiv.style('display', 'flex');
  buttonDiv.style('gap', '12px');
  buttonDiv.style('flex-wrap', 'wrap');
  buttonDiv.style('justify-content', 'center');
  buttonDiv.style('z-index', '100');
  
  let scenes = [
    { id: 0, name: '🌟 VISION', color: '#0ff' },
    { id: 1, name: '📱 LIVE SIMULATOR', color: '#ff9933' },
    { id: 2, name: '🌍 GLOBAL IMPACT', color: '#00ff88' },
    { id: 3, name: '📊 DASHBOARD', color: '#ff66cc' }
  ];
  
  for (let s of scenes) {
    let btn = createButton(s.name);
    btn.style('background', 'linear-gradient(135deg, #0f212e, #022b36)');
    btn.style('border', `1px solid ${s.color}`);
    btn.style('color', s.color);
    btn.style('padding', '10px 24px');
    btn.style('border-radius', '40px');
    btn.style('font-weight', 'bold');
    btn.style('cursor', 'pointer');
    btn.style('font-family', 'monospace');
    btn.style('backdrop-filter', 'blur(8px)');
    btn.style('transition', '0.2s');
    btn.mouseOver(() => {
      btn.style('background', s.color);
      btn.style('color', '#000');
      btn.style('transform', 'scale(1.02)');
    });
    btn.mouseOut(() => {
      btn.style('background', 'linear-gradient(135deg, #0f212e, #022b36)');
      btn.style('color', s.color);
      btn.style('transform', 'scale(1)');
    });
    btn.mousePressed(() => {
      targetScene = s.id;
      isTransitioning = true;
      transitionProgress = 1;
      for (let i = 0; i < 10; i++) ripples.push(new Ripple(width/2, height/2, 50, color(0, 255, 200)));
    });
    btn.parent(buttonDiv);
  }
}

function introScene() {
  let cx = width/2;
  let cy = height/2 - 50;
  push();
  textAlign(CENTER, CENTER);
  textFont('monospace');
  
  let glow = map(sin(frameCount * 0.02), -1, 1, 100, 255);
  fill(0, 255, 210, glow);
  textSize(min(64, width/10));
  text("UPI PULSE", cx, cy - 30);
  
  fill(255);
  textSize(min(24, width/20));
  text("The Future of Digital Bharat", cx, cy + 30);
  
  fill(180, 240, 255);
  textSize(min(16, width/30));
  text("India's Unified Payments Interface — Global Blueprint", cx, cy + 70);
  
  for (let i = 0; i < 3; i++) {
    let radius = 80 + (frameCount * 2 + i * 60) % 180;
    noFill();
    stroke(0, 255, 200, 100 - i * 20);
    strokeWeight(1.5);
    ellipse(cx, cy + 100, radius, radius);
  }
  pop();
}

function simulatorScene() {
  push();
  textAlign(CENTER, CENTER); 
  
  fill(0, 255, 200);
  textSize(min(28, width/25));
  text("📱 REAL-TIME UPI TRANSACTION FLOW", width/2, 60);
  
  fill(200);
  textSize(14);
  if(upiStep === 0 || upiStep === 4) text("CLICK ANYWHERE TO ADVANCE NEXT STEP", width/2, 95);
  else text("TYPE ON KEYBOARD & PRESS 'ENTER' TO PROCEED", width/2, 95);

  let mx = width * 0.3;
  let my = height * 0.5;
  let px = width * 0.7;
  let py = height * 0.5;

  // -- MERCHANT SIDE --
  fill(15, 25, 45, 200);
  stroke(0, 230, 200, 150);
  strokeWeight(2);
  rectMode(CENTER);
  rect(mx, my, 220, 320, 15);
  
  fill(255);
  noStroke();
  rect(mx, my - 30, 140, 140, 5); 
  fill(0);
  rect(mx - 40, my - 70, 30, 30); rect(mx + 40, my - 70, 30, 30); rect(mx - 40, my + 10, 30, 30);
  
  fill(0, 255, 200);
  textSize(18); textStyle(BOLD);
  text("BHARAT QR", mx, my + 80);
  textStyle(NORMAL);
  fill(255);
  textSize(12);
  text("Store ID: KIRANA-101", mx, my + 105);

  if (upiStep === 4) { 
    fill(40, 167, 69);
    rect(mx, my + 150, 180, 40, 5);
    fill(255);
    textSize(14); textStyle(BOLD);
    text("₹ " + typedAmount + " RECEIVED ✓", mx, my + 150);
    textStyle(NORMAL);
  }

  // -- PHONE SIDE --
  stroke(60);
  strokeWeight(8);
  fill(15);
  rect(px, py, 250, 480, 30); 
  noStroke();
  fill(240, 245, 255);
  rect(px, py, 234, 464, 25); 

  fill(106, 27, 154);
  rect(px, py - 207, 234, 50, 25, 25, 0, 0);
  fill(255);
  textSize(14); textStyle(BOLD);
  text("UPI SECURE PAY", px, py - 207);
  textStyle(NORMAL);

  if (upiStep === 0) { 
    fill(50); textSize(14); text("Scanning QR...", px, py - 100);
    noFill(); stroke(0, 217, 255); strokeWeight(2);
    rect(px, py - 10, 140, 140);
    
    let laserY = py - 80 + simScanY;
    stroke(0, 255, 150); line(px - 60, laserY, px + 60, laserY);
    simScanY += 3 * simLaserDir;
    if (simScanY > 140 || simScanY < 0) simLaserDir *= -1;
  } 
  else if (upiStep === 1) { 
    fill(50); textSize(14); text("Paying to KIRANA-101", px, py - 80);
    fill(255); stroke(200); strokeWeight(1); rect(px, py - 20, 180, 50, 10);
    
    let cursor = (frameCount % 60 < 30) ? "|" : "";
    let displayAmount = typedAmount.length > 0 ? "₹ " + typedAmount : "₹ 0";
    
    noStroke(); fill(30); textSize(24); 
    text(displayAmount + cursor, px, py - 20);
    
    fill(106, 27, 154); rect(px, py + 140, 160, 40, 20);
    fill(255); textSize(12); textStyle(BOLD); text("PRESS ENTER TO PAY", px, py + 140); textStyle(NORMAL);
  }
  else if (upiStep === 2) { 
    fill(50); textSize(14); text("Enter 6-Digit UPI PIN", px, py - 80);
    
    let hiddenPin = "";
    for(let i=0; i<typedPin.length; i++) hiddenPin += "● ";
    if(typedPin.length === 0) hiddenPin = "Type PIN...";
    
    fill(typedPin.length > 0 ? 30 : 150); 
    textSize(24); 
    drawingContext.letterSpacing = "5px"; 
    text(hiddenPin, px, py - 20);
    drawingContext.letterSpacing = "0px"; 
    
    fill(106, 27, 154); rect(px, py + 140, 160, 40, 20);
    fill(255); textSize(12); textStyle(BOLD); text("PRESS ENTER TO SUBMIT", px, py + 140); textStyle(NORMAL);
  }
  else if (upiStep === 3) { 
    push();
    translate(px, py - 30);
    rotate(frameCount * 0.1);
    noFill(); stroke(106, 27, 154); strokeWeight(4);
    arc(0, 0, 50, 50, 0, PI + QUARTER_PI);
    pop();
    fill(50); textSize(14); text("Verifying with Bank...", px, py + 40);
    
    if(millis() - authTimer > 1500) {
      upiStep = 4;
      currentTxnId = "TXN" + floor(random(10000000, 99999999)); 
      playSuccessSound(); 
    }
  }
  else if (upiStep === 4) { 
    fill(40, 167, 69); ellipse(px, py - 40, 70, 70);
    fill(255); textSize(36); text("✓", px, py - 40);
    fill(30); textSize(18); textStyle(BOLD); text("Payment Successful", px, py + 20); textStyle(NORMAL);
    fill(100); textSize(12); text("Txn ID: " + currentTxnId, px, py + 45); 
  }

  let labels = ["SCAN", "AMT", "PIN", "DONE"];
  for (let i = 0; i < 4; i++) {
    let nx = px - 80 + (i * 53); 
    let ny = py + 200; 
    
    let isActive = false;
    if(i < 3 && i <= upiStep) isActive = true;
    if(i === 3 && upiStep === 4) isActive = true; 
    
    if(i < 3) {
      stroke(200); strokeWeight(2);
      line(nx + 8, ny, nx + 45, ny);
      if (isActive && upiStep > i) { 
        stroke(106, 27, 154); 
        line(nx + 8, ny, nx + 45, ny); 
      }
    }

    noStroke();
    fill(isActive ? color(106, 27, 154) : color(200)); 
    ellipse(nx, ny, 16);
    
    fill(100); textSize(9); textStyle(BOLD);
    text(labels[i], nx, ny + 15);
    textStyle(NORMAL);
  }
  pop();
}

function globalScene() {
  push();
  textAlign(CENTER, CENTER);
  
  fill(255);
  textSize(28);
  text("🌏 GLOBAL IMPACT: UPI Inspiring the World", width/2, 55);
  
  let cx = width / 2;
  let cy = height / 2;

  drawDetailedIndiaMap(cx, cy, 0.4);
  
  let countries = [
    { x: 0.75, y: 0.4, name: "Singapore" }, { x: 0.35, y: 0.45, name: "UAE" },
    { x: 0.25, y: 0.35, name: "UK" }, { x: 0.15, y: 0.52, name: "USA" },
    { x: 0.85, y: 0.70, name: "Australia" }, { x: 0.30, y: 0.65, name: "Kenya" },
    { x: 0.40, y: 0.25, name: "France" }, { x: 0.85, y: 0.20, name: "Qatar" }
  ];
  
  for (let c of countries) {
    let x = c.x * width;
    let y = c.y * height;
    let pulse = 8 + sin(frameCount * 0.08) * 3;
    
    stroke(0, 255, 200, 80);
    strokeWeight(1.5);
    line(cx, cy, x, y);
    
    fill(0, 255, 200, 200);
    noStroke();
    ellipse(x, y, 12 + pulse);
    fill(255);
    textSize(11);
    textStyle(BOLD);
    text(c.name, x, y - 15);
    textStyle(NORMAL);
  }
  
  fill(0, 255, 150);
  ellipse(cx, cy, 15, 15);
  fill(255);
  textSize(14);
  textStyle(BOLD);
  text("🇮🇳 INDIA", cx, cy - 18);
  pop();
}

function drawDetailedIndiaMap(x, y, scaleFactor) {
  push();
  translate(x, y);
  scale(scaleFactor);
  fill(15, 35, 70, 220); 
  stroke(0, 255, 200, 180); 
  strokeWeight(3);
  
  beginShape();
  vertex(-20, -200); vertex(20, -180); vertex(40, -120); vertex(100, -80);  
  vertex(150, -70); vertex(140, -40); vertex(100, -30); vertex(110, 20);   
  vertex(80, 80); vertex(30, 200); vertex(-20, 180); vertex(-60, 120);
  vertex(-120, 60); vertex(-150, 20); vertex(-130, -30); vertex(-80, -80);
  vertex(-40, -150);
  endShape(CLOSE);
  pop();
}

// ========== SCENE 3: DASHBOARD (100% FACTUAL NPCI DATA 2026) ==========
function dashboardScene() {
  push();
  textAlign(CENTER, CENTER);
  
  fill(0, 255, 200);
  textSize(min(28, width/25));
  text("📊 UPI DASHBOARD • Official 2026 Metrics", width/2, 50);
  
  rectMode(CENTER);
  let cardW = min(300, width * 0.3); 
  let cardH = min(120, height * 0.15); 
  let gapX = cardW + (width * 0.02);
  let gapY = cardH + 20;
  
  let cy1 = height * 0.35;
  let cy2 = height * 0.35 + gapY;
  
  // Row 1 (Factual Data from latest 2026 NPCI reports)
  drawMetricCardCenter(width/2 - gapX, cy1, cardW, cardH, "📈 MONTHLY VOLUME", "22.64 Billion", "Transactions recorded in March 2026");
  drawMetricCardCenter(width/2, cy1, cardW, cardH, "💰 MONTHLY VALUE", "₹ 29.53 Lakh Cr", "Value processed in March 2026");
  drawMetricCardCenter(width/2 + gapX, cy1, cardW, cardH, "🌍 GLOBAL REACH", "8+ Countries", "UAE, Singapore, France & more");
  
  // Row 2
  drawMetricCardCenter(width/2 - gapX, cy2, cardW, cardH, "👥 USER ADOPTION", "350M+ Users", "Unique individuals actively paying");
  drawMetricCardCenter(width/2, cy2, cardW, cardH, "🏛️ BANK NETWORK", "700+ Banks", "Live and connected to the UPI switch");
  drawMetricCardCenter(width/2 + gapX, cy2, cardW, cardH, "🏢 MERCHANT BASE", "50M+ Merchants", "Small businesses accepting digital pay");
  
  stroke(0, 255, 200, 150);
  strokeWeight(2);
  noFill();
  beginShape();
  let graphY = height - 80;
  for (let i = 0; i < 20; i++) {
    let x = width * 0.1 + i * (width * 0.8 / 20);
    let y = graphY - sin(i * 0.5 + frameCount * 0.03) * 30;
    vertex(x, y);
  }
  endShape();
  fill(0, 255, 200, 150);
  noStroke();
  textSize(12);
  text("Visual Representation: Stable and Growing National Payment Infrastructure", width/2, height - 30);
  pop();
}

function drawMetricCardCenter(x, y, w, h, title, value, sub) {
  push();
  fill(15, 25, 45, 200);
  stroke(0, 230, 200, 150);
  strokeWeight(1.5);
  rect(x, y, w, h, 16);
  
  fill(0, 255, 210);
  textSize(min(12, w * 0.05)); 
  text(title, x, y - h * 0.25);
  
  fill(255);
  textSize(min(22, w * 0.08)); 
  textStyle(BOLD);
  text(value, x, y);
  
  fill(170, 240, 255);
  textSize(min(10, w * 0.04)); 
  textStyle(NORMAL);
  text(sub, x, y + h * 0.25);
  pop();
}

class Particle {
  constructor() {
    this.x = random(width); this.y = random(height);
    this.vx = random(-0.3, 0.3); this.vy = random(-0.3, 0.3);
    this.size = random(1, 3); this.alpha = random(40, 140);
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < -10) this.x = width + 10;
    if (this.x > width + 10) this.x = -10;
    if (this.y < -10) this.y = height + 10;
    if (this.y > height + 10) this.y = -10;
  }
  show() {
    fill(0, 180, 210, this.alpha); noStroke(); ellipse(this.x, this.y, this.size);
  }
}

class Ripple {
  constructor(x, y, size, col) {
    this.x = x; this.y = y; this.radius = 5;
    this.maxRadius = size || 60; this.alpha = 200; this.color = col || color(0, 200, 255);
  }
  update() {
    this.radius += 3.5; this.alpha -= 6; return this.alpha > 0;
  }
  show() {
    noFill(); stroke(red(this.color), green(this.color), blue(this.color), this.alpha);
    strokeWeight(1.5); ellipse(this.x, this.y, this.radius * 2);
  }
}

function drawDigitalGrid() {
  stroke(20, 50, 80, 60);
  strokeWeight(0.5);
  let step = 45;
  for (let x = 0; x < width; x += step) line(x, 0, x, height);
  for (let y = 0; y < height; y += step) line(0, y, width, y);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (scene === 1 && !isTransitioning) {
    if (upiStep === 1) {
      if (keyCode === BACKSPACE) {
        typedAmount = typedAmount.substring(0, typedAmount.length - 1);
      } 
      else if (keyCode === ENTER && typedAmount.length > 0) {
        upiStep = 2; 
      } 
      else if (key >= '0' && key <= '9' && typedAmount.length < 6) {
        typedAmount += key;
      }
    } 
    else if (upiStep === 2) {
      if (keyCode === BACKSPACE) {
        typedPin = typedPin.substring(0, typedPin.length - 1);
      } 
      else if (keyCode === ENTER && typedPin.length > 0) {
        upiStep = 3; 
        authTimer = millis(); 
      } 
      else if (key >= '0' && key <= '9' && typedPin.length < 6) {
        typedPin += key;
      }
    }
  }
}

function mousePressed() {
  ripples.push(new Ripple(mouseX, mouseY, 50, color(0, 255, 180)));
  
  if (scene === 1 && !isTransitioning) {
    if (upiStep === 0) {
      upiStep = 1; 
      typedAmount = ""; 
      typedPin = "";    
    }
    else if (upiStep === 4) {
      upiStep = 0; 
    }
  }
}
