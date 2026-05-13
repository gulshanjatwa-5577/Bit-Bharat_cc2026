 
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
