/**
 * red square simulator
 * Daniel Gonzalez
 *
 * god
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
let felt1; //too lazy to rename ugh
let felt2;
let felt3;
let felt4;
let felt5;
let felt6;

//scene3
let bag;
let p1;
let p2;
let p3;
let p4;

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

  s2 = loadImage("assets/images/scene2/table.png");

  felt1 = new Item(
    width / 8, //x
    height / 4, //y
    loadImage("assets/images/scene2/felt1.png") //img
  );
  felt2 = new Item(
    width + 10, //x
    0, //y
    loadImage("assets/images/scene2/felt2.png") //img
  );
  felt3 = new Item(
    width + 10, //x
    0, //y
    loadImage("assets/images/scene2/felt3.png") //img
  );
  felt4 = new Item(
    width + 10, //x
    0, //y
    loadImage("assets/images/scene2/felt4.png") //img
  );
  felt5 = new Item(
    width + 10, //x
    0, //y
    loadImage("assets/images/scene2/felt5.png") //img
  );
  felt6 = new Item(
    width + 10, //x
    0, //y
    loadImage("assets/images/scene2/felt6.png") //img
  );

  //*****SCENE 2*****//

  s3 = loadImage("assets/images/scene3/s3.png");

  bag = new Item(
    width / 6, //x
    (1.8 * height) / 4, //y
    loadImage("assets/images/scene3/bag.png") //img
  );

  p1 = new Item(
    (2 * width) / 4, //x
    height / 4, //y
    loadImage("assets/images/scene3/p1.png") //img
  );

  p2 = new Item(
    width + 10, //x
    0, //y
    loadImage("assets/images/scene3/p2.png") //img
  );

  p3 = new Item(
    width + 10, //x
    0, //y
    loadImage("assets/images/scene3/p3.png") //img
  );

  p4 = new Item(
    width + 10, //x
    0, //y
    loadImage("assets/images/scene3/p4.png") //img
  );

  // template = new Item(
  // //x
  // //y
  // //img
  // );
}

function debugClick() {
  if (mouseIsPressed) {
    //print mouseX and mouseY
    print("mouseX: ");
    print(mouseX);
    print("mouseY: ");
    print(mouseY);
  }
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
  debugClick();
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
    scene = "scene1";
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
    count++; //count to 2
    pins.x = -100;
    pins.y = -100;
  }

  if (count === 2) {
    scene = "scene2";
    count = 0;
  }
}

function scene2() {
  //cut squares
  //set background
  background(s2);

  textSize(45);

  if (count < 5) {
    cursor("assets/images/scene2/scissors.png"); //set cursor to scissors

    textSize(29);
    text("click the blue lines to cut.", width / 2, height / 6); //title, make it better
  } else {
    textSize(29);
    text("congrats!!", width / 2, height / 6); //title, make it better
    text("click to continue!", width / 2, (5 * height) / 6); //title, make it better
    if (mouseIsPressed) {
      //in the line below, make the cursor default
      cursor(ARROW);
      scene = "scene3";
      count = 0;
    }
  }

  //set items
  image(felt1.img, felt1.x, felt1.y); //felt on table
  image(felt2.img, felt2.x, felt2.y); //felt on table, cut once
  image(felt3.img, felt3.x, felt3.y); //felt on table, cut twice
  image(felt4.img, felt4.x, felt4.y); //felt on table, cut thrice
  //set behaviour

  //if user clicks in predetermined bounds of felt1, cut. also vertically crop the felt1.img by the mouse position
  //cutting means replacing the cropped portion with a slice.
  //debugClick();
  if (mouseIsPressed) {
    print(count);

    if (count == 0) {
      if (
        mouseX > 440 &&
        mouseX < 520 &&
        mouseY > felt1.y &&
        mouseY < felt1.y + 340
      ) {
        felt1.img = felt2.img;
        count = 1;
      }
    }

    if (count == 1) {
      if (
        mouseX > 311 &&
        mouseX < 400 &&
        mouseY > felt1.y &&
        mouseY < felt1.y + 340
      ) {
        felt1.img = felt3.img;
        count = 2;
      }
    }

    if (count == 2) {
      if (
        mouseX > 142 &&
        mouseX < 221 &&
        mouseY > felt1.y &&
        mouseY < felt1.y + 340
      ) {
        print("hooray!");
        felt1.img = felt4.img;
        count = 3;
      }
    }

    if (count == 3) {
      //begin horiz cut
      if (
        mouseX > felt1.x &&
        mouseX < felt1.x + 530 &&
        mouseY > 365 &&
        mouseY < 423
      ) {
        print("hooray!");
        felt1.img = felt5.img;
        count = 4;
      }
    }
    if (count == 4) {
      if (
        mouseX > felt1.x &&
        mouseX < felt1.x + 530 &&
        mouseY > 246 &&
        mouseY < 296
      ) {
        print("hooray!");
        felt1.img = felt6.img;
        count = 5;
      }
    }
  }
}

function scene3() {
  //give squares to protestors
  //set background
  background(s3);

  debugClick();


  //set items
  image(bag.img, bag.x, bag.y);
  image(p1.img, p1.x, p1.y);
  //set behaviour

  if (mouseIsPressed === true) {
    if (
      mouseX > bag.x &&
      mouseX < bag.x + 250 &&
      mouseY > bag.y &&
      mouseY < bag.y + 480
    ) {
      print("yay!")
      cursor("assets/images/scene3/closedhand.png");
    }



  }else if (mouseIsPressed === false){
    cursor("assets/images/scene3/openhand.png");
  }


  //when clicking on bag, change cursor to grabbing squares
  //when let go on protestors, change hand to let go hand

  //set end state

  //end state when count reaches 5, giving all protestors a square.
}

function scene4() {
  //protest!!!
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
