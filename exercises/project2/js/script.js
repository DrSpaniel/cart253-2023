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

//image declarations
let bg;
let s1;

let felt;
let pins;
let basket;
let placeSound;

class Item {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
  }
}

//scene declaration
let scene = "title";

/**
 * Description of setup
 */
function setup() {
  createCanvas(heightCheck(), heightCheck()); //autosize
  bg = loadImage("assets/images/bg.jpg");
  s1 = loadImage("assets/images/s1.png");
  placeSound = loadSound("assets/sounds/place.wav");

  felt = new Item(
    width - width / 6 - 25, //x)
    height / 2 - 25, //y
    loadImage("assets/images/felt.png") //img
  );
  pins = new Item(
    width / 6 - 25, //x
    height - height / 3 - 25, //y
    loadImage("assets/images/pins.png") //img
  );
  
  basket = new Item(
    width/2 - 75, //x
    height - height/8 - 60, //y
    loadImage("assets/images/basket.png") //img
  )

}

function heightCheck() {
  //make sure the square fits in the window
  if (windowHeight > windowWidth) {
    return windowWidth;
  } else {
    return windowHeight;
  }
}

function windowResized() {
  //resize canvas when window is resized
  resizeCanvas(heightCheck(), heightCheck());
}

/**
 * Description of draw()
 */
function draw() {
  if (scene === "title") {
    title();
  } else if (scene === "scene1") {
    scene1();
  } else if (scene === "gameover") {
    gameover();
  }
}

function title() {
  // Title screen
  background(255, 0, 0); // Set the background color to dark blue (RGB values).
  fill(255); // Set the fill color to white
  textAlign(CENTER, CENTER);
  textSize(60);
  text("red square simulator!", width / 2, height / 4); //title, make it better
  textSize(29);
  text("click to start.", width / 2, (3 * height) / 4);
  textSize(8);
  text("drspaniel.com", width / 8, (7 * height) / 8); //shameless plug
  textSize(20);
  text(":)", width / 2, (2.5 * height) / 4);

  if (mouseIsPressed) {
    // If the mouse is clicked, transition to the simulation scene
    scene = "scene1";
  }
}

function scene1() {
  background(s1);

  image(basket.img, basket.x, basket.y); //basket on bottom shelf
  image(felt.img, felt.x, felt.y); //felt on right shelf
  image(pins.img, pins.x, pins.y); //pins on left shelf
  

  if (mouseIsPressed) {
    if (
      //if mouse is in felt area
      mouseX > felt.x &&
      mouseX < felt.x + felt.img.width &&
      mouseY > felt.y &&
      mouseY < felt.y + felt.img.height
    ) {
      felt.x = mouseX - felt.img.width / 2;
      felt.y = mouseY - felt.img.height / 2;
    } else if (
      mouseX > pins.x &&
      mouseX < pins.x + pins.img.width &&
      mouseY > pins.y &&
      mouseY < pins.y + pins.img.height
    ) {
      pins.x = mouseX - pins.img.width / 2;
      pins.y = mouseY - pins.img.height / 2;
    }

    //print mouseX and mouseY
    print("mouseX: ");
    print(mouseX);
    print("mouseY: ");
    print(mouseY);
  }

  if (
    //if felt is within the basket area, dissapear
    felt.x > basket.x &&
    felt.x < basket.x + basket.img.width &&
    felt.y > basket.y &&
    felt.y < basket.y + basket.img.height
    //or if pins are within the basket area, dissapear
  ) {
    placeSound.play();
    felt.x = -100;
    felt.y = -100;
  }else if(
    pins.x > basket.x &&
    pins.x < basket.x + basket.img.width &&
    pins.y > basket.y &&
    pins.y < basket.y + basket.img.height
  ){
    placeSound.play();
    pins.x = -100;
    pins.y = -100;
  }
}

function gameover() {
  background(0, 34, 88); // Set the background color to dark blue (RGB values).
  fill(255); // Set the fill color to white
  textAlign(CENTER, CENTER);
  textSize(48);
  text("done", width / 2, height / 2);

  textSize(24);
  text("Click to Restart", width / 2, (2.5 * height) / 4); // Restart button

  if (mouseIsPressed) {
    // If the mouse is clicked, transition to the simulation scene and restart the simulation
    scene = "simulation";
  }
}
