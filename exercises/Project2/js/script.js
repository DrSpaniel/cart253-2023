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

//backgrounds
let bg;
let s1;
let s2;
let s3;
let s4;
let endscene;


//items
//scene1
let felt;
let pins;
let basket;
let placeSound;
//scene2
let felt1;    //too lazy to rename ugh
let feltslice;  //

//used to check if its time to change scene
let count = 0;

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

//*****SCENE 1*****//

  s1 = loadImage("assets/images/scene1/s1.png");
  placeSound = loadSound("assets/sounds/place.wav");

  felt = new Item(
    width - width / 6 - 25, //x
    height / 2 - 25, //y
    loadImage("assets/images/scene1/felt.png") //img
  );
  pins = new Item(
    width / 6 - 25, //x
    height - height / 3 - 25, //y
    loadImage("assets/images/scene1/pins.png") //img
  );

  basket = new Item(
    width / 2 - 75, //x
    height - height / 8 - 60, //y
    loadImage("assets/images/scene1/basket.png") //img
  );

  //*****SCENE 2*****//

  s2 = loadImage("assets/images/scene2/table.png")

  felt1 = new Item(
    //x
    //y
    //img
  )

  feltslice = new Item(
    //x
    //y
    //img
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
    scene1(); //buy red square materials
  } else if (scene === "scene2") {
    scene2(); //cut felt material
  } else if (scene === "scene3") {
    scene3(); //share pins
  } else if (scene === "scene4") {
    scene4(); //protest!
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
    scene = "scene2";
  }
}

function scene1() {
  //set background
  background(s1);


  //set items
  image(basket.img, basket.x, basket.y); //basket on bottom shelf
  image(felt.img, felt.x, felt.y); //felt on right shelf
  image(pins.img, pins.x, pins.y); //pins on left shelf


  //set behaviour
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



  //set behaviour 2
  if (
    //if felt is within the basket area, dissapear
    felt.x > basket.x &&
    felt.x < basket.x + basket.img.width &&
    felt.y > basket.y &&
    felt.y < basket.y + basket.img.height
    //or if pins are within the basket area, dissapear
  ) {
    placeSound.play();
    count++;
    felt.x = -100;
    felt.y = -100;
  } else if (
    pins.x > basket.x &&
    pins.x < basket.x + basket.img.width &&
    pins.y > basket.y &&
    pins.y < basket.y + basket.img.height
  ) {
    placeSound.play();
    count++;  //count to 2
    pins.x = -100;
    pins.y = -100;
  }

  if (count === 2){
    scene = "scene2";
    count = 0;
  }


}

function scene2(){      //cut materials with scissors
//todo art: table wood on spotlight, red felt, red strip, scissors for cursor 


      //set background
      background(s2);


      //set items


      //set behaviour
      //mouse will be set to scissors.
      //each time the user clicks on the dotted lines, the image moves to the left simulating it being cut. then a strip of it separates a little away.
  

      //set end state
      //once all cut, using count, switch to next scene.
}

function scene3(){    //give squares to protestors
      //set background
      

      //set items


      //set behaviour


      //set end state
}

function scene4(){    //protest!!!
  //set background
  

  //set items


  //set behaviour


  //set end state
}




function gameover() {
  background(0, 34, 88); // Set the background color to dark blue (RGB values).
  fill(255); // Set the fill color to white
  textAlign(CENTER, CENTER);
  textSize(48);
  text("done!!", width / 2, height / 2);

  textSize(24);
  text("Click to Restart", width / 2, (2.5 * height) / 4); // Restart button

  if (mouseIsPressed) {
    // If the mouse is clicked, transition to the simulation scene and restart the simulation
    scene = "simulation";
  }
}
