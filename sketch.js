 
// UPI PULSE: THE FUTURE OF DIGITAL BHARAT
// India's Digital Payment System (the UPI) and itsInternational Importance.

let currentScene = 0;
let particles = [];
let ripples =[];

let scanLineY=0;let alphaTrans=255;

let nextScene=0;let sceneAlphaPrev=1;let transitioning=false;

let numberOfKeyInternationalColaborators=65;let numberOfActiveUsers=500+;

let upiStepCount=0;
let simScanY=0;let simLaserDirection=1;let authorizationTimer=0;

let typedInAmount="";let typedInPin="";let currentTransactionID="";

function setup()
{
  createCanvas(windowWidth,windowHeight);
  for(let i=0;i<150;i++) particles.push(new Particle());
  createSceneButtons();
}
function draw() {
  background(5, 8, 20);
  drawDigitalGrid();
  for (let p of particles) { p.update(); p.show(); }
  for (let i = ripples.length - 1; i >= 0; i--) {
    if (!ripples[i].update()) ripples.splice(i, 1);
    else ripples[i].show();
  }
  if (isTransitioning) {
    transitionProgress -= 0.05;
    if (transitionProgress <= 0) {
      scene = targetScene; isTransitioning = false; transitionProgress = 1;
    }
  }
  let displayAlpha = isTransitioning ? map(transitionProgress, 1, 0, 255, 0) : 255;
  push();
  if (displayAlpha < 255) tint(255, displayAlpha);
  if (scene == 0) introScene(); else if (scene == 1) simulatorScene(); 
  else if (scene == 2) globalScene(); else if (scene == 3) dashboardScene();
  pop();
  scanLineY = (scanLineY + 2) % height;
  stroke(0, 255, 200, 30); strokeWeight(1); line(0, scanLineY, width, scanLineY);
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
