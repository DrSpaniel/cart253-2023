/**
 * project 1: bullet hell
 * Daniel Gonzalez
 *
 * this project is about a game where you have to avoid the obstacles, similar to "bullet hell" style games.
 *
 * the cursor is the spaceship, and meteors will be flying all over the screen. if the cursor touches the meteors, the game is over.
 *

meteors can come from 16 different points at the borders.
they will move toward where the mouse just was, then keep flying past the screen.
after every 5 seconds, the meteors will fly faster, and will be more of them.
if the mouse/ship touches one of the meteors, then then the scene changes to game over!

there are 5 possible stages:
title, game, over, shipChange, and leaderboard

currently, i am working on game functionality over everything else.

to start game functionality, i am working on getting the asteroid image to move toward the mouse and keep flying by.







 */

//making 2 arrays, with both predetermined x and y coords to choose from that the meteors can spawn from

"use strict";
let img;
let x;
let y;

let diff = 0;

/**
 * Description of preload
 */
function preload() {
  img = loadImage("assets/images/meteor.png");
}

/**
 * Description of setup
 */
function setup() {
  createCanvas(windowWidth, windowHeight);

  x = windowWidth/2 - 60;
  y = windowHeight/2 - 60;
 
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/**
 * Description of draw()
 */
function draw() {
  //here ill have the different stages, changing depending on the outcomes


  diff = dist(x, y, mouseX, mouseY); //this is used for the background gradient

  background(map(diff, 0, 1000, 255, 0), 0, 0); //red colour

  image(img, x, y); //this is the image, moving depending on x and y coords.

  

}
