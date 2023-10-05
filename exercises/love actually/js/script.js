/**
looking for love project
 */

"use strict";

/**
 * Description of preload
 */
function preload() {}
//global variables

let circle1 = {
  //player obj
  x: undefined,
  y: undefined,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3,
};

let circle2 = {
  //random obj
  x: undefined,
  y: undefined,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3,
};

/**
 * Description of setup
 */
function setup() {
  createCanvas(600, 600);

  circle2.vx = random(-circle2.speed, circle2.speed);
  circle2.vy = random(-circle2.speed, circle2.speed);

  circle2.x = width / 2;
  circle2.y = width / 2;
}

//todo:
//position circle2
//set circle1 to a delayed mouse position
//set circle2 to move random direction
//check if circles overlap
//if they do, both circles morph into a heart
//make arrow keys change size of circle1

/**
 * Description of draw()
 */
function draw() {
  background(0);

  

  //move circle2
  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;

  //check if circles overlap
  let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
  if (d < circle1.size / 2 + circle2.size / 2) {
    //if they do, morph into heart
    fill(255, 100, 100);
    ellipse(width / 2, height / 2, 100, 100);
  }

  //display circles
  ellipse(circle1.x, circle1.y, circle1.size);
  ellipse(circle2.x, circle2.y, circle2.size);

  //offscreenCheck();
}

offscreenCheck();
{
  //check if circles have gone offscreen
  if (
   // circle2.x < 0 ||
    circle2.x > width ||
    //circle2.y < 0 ||
    circle2.y > height
  ) {
    //if they have, reset circles
    circle2.x = width / 2;
  }
}
