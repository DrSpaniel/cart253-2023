"use strict";

let meteors = []; //array to store meteor objects

let meteor = {
  x: 0,
  y: 0,
  img: 0,
  diff: 0,
  vx: 0,
  vy: 0,
  initialVx: 0,
  initialVy: 0,
  speed: 3,
  meteorPos: 0,
  randPosX: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  randPosY: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

function preload() {
  meteor.img = loadImage("assets/images/meteor.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  mouseX = width / 2;
  mouseY = height / 2;
  meteor.randPosX = [
    //this mess is all the predetermined locations the meteor.x can be in.
    windowWidth / 4,
    windowWidth / 2,
    (3 * windowWidth) / 4,
    windowWidth,
    windowWidth,
    windowWidth,
    (3 * windowWidth) / 4,
    windowWidth / 2,
    windowWidth / 4,
    0,
    0,
    0,
  ];

  meteor.randPosY = [
    //this mess is the meteor.y preset coordinates. in the meteor spawn the meteorPos is randomized between all these.
    0,
    0,
    0,
    height / 4,
    height / 2,
    (3 * height) / 4,
    height,
    height,
    height,
    (3 * height) / 4,
    height / 2,
    height / 4,
  ];

  spawnMeteor();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  //meteor.diff = dist(meteor.x, meteor.y, mouseX, mouseY);
  background(0, 34, 88); //plain colour for now

  image(meteor.img, meteor.x - 32, meteor.y - 32); //centering image so that tracking looks believable.

  calculateMeteorDirection(); // Call this function in draw to calculate direction

  moveMeteor();
  wallCheck();
}

function wallCheck() {
  // Check if the meteor touches any border
  if (meteor.y > height || meteor.y < 0 || meteor.x > width || meteor.x < 0) {
    spawnMeteor();
  }
}

function moveMeteor() {
  // Update the meteor's position based on its velocity.
  meteor.x += meteor.vx;
  meteor.y += meteor.vy;
}

function calculateMeteorDirection() {
  // Calculate the direction vector from the meteor to the mouse's last location.
  const dx = mouseX - meteor.x; //first calculate x and y coord distance..
  const dy = mouseY - meteor.y;
  const magnitude = sqrt(dx * dx + dy * dy); //then, using pythagoras, find the direct distance between meteor and mouse. linear algebra FUCK YEAH!

  if (meteor.vx === 0 && meteor.vy === 0) {
    //this can only happen when spawnmeteor is triggered
    meteor.initialVx = (dx / magnitude) * meteor.speed; //this will then make vx and vy follow said line that was calculated above.
    meteor.initialVy = (dy / magnitude) * meteor.speed;
  }
  meteor.vx = meteor.initialVx; //this runs in draw, meaning that vx and vy will only change when the above is true.
  meteor.vy = meteor.initialVy;
}

function spawnMeteor() {
  //meteor.speed++;
  meteor.meteorPos = Math.floor(random(0, 12));
  meteor.x = meteor.randPosX[meteor.meteorPos]; // Start at the center of the canvas
  meteor.y = meteor.randPosY[meteor.meteorPos];
  meteor.initialVx = 0; // Reset initialVX and initialVY when spawning a new meteor
  meteor.initialVy = 0;
  print("reset!");
  print(meteor.meteorPos);
  calculateMeteorDirection();
}
