"use strict";

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

  // Check if the meteor touches the bottom of the page and respawn if it does.
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


    //here i want to make a check funtion when the meteor hits any of the walls.
    //if the meteor hits a wall, then spawn a new meteor. make sure it doesnt mess up the spawning, meaning if y = 0, then it respawns at y = 0 and get weird.


  // Normalize the direction vector to get a unit vector.
  if (meteor.y === 0) {
    //only resets vs and vy when meteor is at the top of the page, not when the meteor is respawned. PAIN
    //this makes the meteor only work on the positions 0, 1, and 2. needs to be organized to put into spawn meteor thus updates every respawn.
    meteor.initialVx = (dx / magnitude) * meteor.speed; //this will then make vx and vy follow said line that was calculated above.
    meteor.initialVy = (dy / magnitude) * meteor.speed;
  }
  meteor.vx = meteor.initialVx;     //this runs in draw, meaning that vx and vy will only change when the above is true. needs to change 
  meteor.vy = meteor.initialVy;
}

function spawnMeteor() {
  meteor.meteorPos = random(0, 11);
  meteor.x = meteor.randPosX[2]; // Start at the center of the canvas
  meteor.y = meteor.randPosY[2];
  print("reset!");
  calculateMeteorDirection();
}