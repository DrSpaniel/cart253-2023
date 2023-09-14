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
  createCanvas(640, 640);
  background(255, 255, 180);
  noStroke();

  //add circle, red to the center of the canvas
  fill(255, 0, 0);
  ellipse(320, 120, 200, 200); //coordinates of circle

  //add square, purple to the left of the circle
  fill(255, 0, 255);
  square(120, 120, 200); //coordinates of square

  //add parallelogram, blue to the right of the canvas
  fill(0, 0, 255);
  quad(420, 120, 520, 120, 420, 240, 520, 240); //coordinates of parallelogram

  //add triangle, green to the bottom of the canvas
  fill(0, 255, 0);
  triangle(300, 420, 340, 420, 320, 380);

  

}

/**
 * Description of draw()
 */
function draw() {}
