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

 
