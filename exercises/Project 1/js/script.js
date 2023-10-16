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

let meteor = {
  x: 0,
  y: 0,
  img: 0,
  diff: 0,
  vx: 0,
  vy: 2,
  speed: 3,
};

/**
 * Description of preload
 */
function preload() {
  meteor.img = loadImage("assets/images/meteor.png");
}

/**
 * Description of setup
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  meteor.x = windowWidth / 2 - 60;
  meteor.y = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/**
 * Description of draw()
 */
function draw() {
  //here ill have the different stages, changing depending on the outcomes

  meteor.diff = dist(meteor.x, meteor.y, mouseX, mouseY); //this is used for the background gradient

  background(map(meteor.diff, 0, 1000, 255, 0), 0, 0); //red colour

  image(meteor.img, meteor.x, meteor.y); //this is the image, moving depending on x and y coords.
  
  move();
}

function move() {
  //move x and y of circles
  meteor.x = meteor.x + meteor.vx;
  meteor.y = meteor.y + meteor.vy;      //trying to make this move toward the mouse but idek....
}
