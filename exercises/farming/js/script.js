/**
Daniel Gonzalez
cART-253

REQUIREMENTS:
- user controlled shape/image
- user interaction with other objects (attract, repel, etc) be sure to use for loops!
- objects must vary in size, colour, or size (add variants as well)
- at least 2 alternate endings
- 

farmer getting sheep and putting in farm

farmer is user, image rotates depending on the direction

preset amount of sheep (10) with varying colour and size

sheep repel from farmer, but if youre fast (press shift to boost for quick moment) you can grab.

get close enough and you capture sheep, they follow you to the farm when youre done.


----------------------------------------
step 1: setup farmer movement and image
farmer is controlled by wasd, shift for boost (2 second cooldown)










 */

"use strict";

/**
 * Description of preload
 */
function preload() {
  let farmerImage = loadImage("assets/images/farmer.png");
}

/**
 * Description of setup
 */
function setup() {
  createCanvas(windowWidth, windowHeight);

  //bg = loadImage("assets/images/grass.png");
}

function windowResized() {
  //resize canvas when window is resized
  resizeCanvas(windowWidth, windowHeight);
}

/**
 * Description of draw()
 */
function draw() {
  background(loadImage("assets/images/grass.png"));


}
