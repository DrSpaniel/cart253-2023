/**
 * project 1: bullet hell
 * Daniel Gonzalez
 *
 * this project is about a game where you have to avoid the obstacles, similar to "bullet hell" style games.
 *
 * the cursor is the spaceship, and meteors will be flying all over the screen. if the cursor touches the meteors, the game is over.
 *
 * after a certain amount of time, the meteors will start to move faster and faster, making it harder to avoid them.
 *
 * there will be a high score leaderboard which will show at the start of the game, and at the end of the game.
 *
 * the meteor images will be source in the /assets/images/meteorimgs folder. they will be randomized, and rotated randomly.
 *
 * the background will be a space background, and the cursor will be a spaceship.
 *
 */

"use strict";

/**
 * Description of preload
 */
function preload() {}

let state = "title"; //this makes the title screen show when the site is loaded


/**
 * Description of setup
 */
function setup() {
  createCanvas(windowWidth, windowHeight);

  drawShip(); //draws the spaceship, which is the cursor


}

function drawShip(){
    //draws the spaceship, which is the cursor
    cursor("assets/images/spaceship.png");
    noCursor();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/**
 * Description of draw()
 */
function draw() {
  //here ill have the different stages, changing depending on the outcomes

  if (state === "title") {
    //main screen
    print("title!");
    title();
  } else if (state === "simulate") {
    //gameplay
    print("simulate!");
    simulate();
  } else if (state === "end") {
    //kaboom! ending
    print("end!");
    end();
  } else if (state === "changeShip") {
    //low priority, changing the ship
    print("changing ship!");
    changeShip();
  } else if (state === "leaderboard") {
    //also low priority, leaderboard
    print("leaderboard!");
    leaderboard();
  }
}

function title() {

    background(0);
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Bullet Hell", width / 2, height / 2);
    
    textSize(20);
    text("press any key to start", width / 2, height / 2 + 50);
    
    if (keyIsPressed) {
        state = "simulate";
    }

}

function simulate(){
    
}

