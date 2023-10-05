/**
 * Title of Project
 * Author Name
 *
 * This is a template. You must fill in the title, author,
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
 */
function preload() {}

/**
 * Description of setup
 */
function setup() {
  createCanvas(600, 600);

  circleSetup();
}

/**
 * Description of draw()
 */
function draw() {
  if (state === "title") {
    title();
  } else if (state === "simulation") {
    simulate();
  } else if (state === "love") {
    love();
  } else if (state === "sadness") {
    sadness();
  }
}

function simulate() {
  background(0);
  move();
  checkOffScreen();
  checkOverlap();
  display();
}

function title() {
  push();
  textSize(64);
  fill(200, 100, 100);
  textAlign(CENTER, CENTER);
  text("LOVE SIMULATOR", width / 2, height / 2);
  pop();
}

function love() {}

function sadness() {}

/*GLOBAL VARIABLES*/

let circle1 = {
  x: undefined,
  y: 200,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3,
};

let circle2 = {
  x: undefined,
  y: 200,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3,
};

let state = "title"; //can be title, simulation, love, sadness

/*FUNCTIONS*/

function circleSetup() {
  //position circles seperately
  circle1.x = random(0, width / 2);
  circle2.x = random(width / 2, width);

  circle1.y = random(0, width / 2);
  circle2.y = random(width / 2, width);

  //start circles moving in a random direction
  circle1.vx = random(-circle1.speed, circle1.speed);
  circle2.vx = random(-circle2.speed, circle2.speed);
  circle1.vy = random(-circle1.speed, circle1.speed);
  circle2.vy = random(-circle2.speed, circle2.speed);
}

function move() {
  //move x and y of circles
  circle1.x = circle1.x + circle1.vx;
  circle1.y = circle1.y + circle1.vy;

  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;
}

function checkOffScreen() {
  //check if circles have gone offscreen
  if (
    circle1.x < 0 ||
    circle1.x > width ||
    circle1.y < 0 ||
    circle1.y < height ||
    circle2.x < 0 ||
    circle2.x > width ||
    circle2.y < 0 ||
    circle2.y > height
  ) {
    //SAD ENDING
  }
}

function checkOverlap() {
  //check if circles overlap

  let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);

  if (d < circle1.size / 2 + circle2.size / 2) {
    //HAPPY ENDING
    //noLoop();
  }
}

function display() {
  ellipse(circle1.x, circle1.y, circle1.size);
  ellipse(circle2.x, circle2.y, circle2.size);
}

function mousePressed() {
  if (state === "title") {
    state = "simulation";
  }
}
