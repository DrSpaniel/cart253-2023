let scene = "title"; // Initial scene is set to "title"
let meteorSpawnInterval; // Interval ID for spawning meteors
let timer = 0; // Timer variable
let isTimerRunning = false; // Variable to track if the timer is running
let oldTimer = 0;

class Meteor {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.img = 0;
    this.vx = 0;
    this.vy = 0;
    this.initialVx = 0;
    this.initialVy = 0;
    this.speed = 3;
    this.meteorPos = 0;
    this.randPosX = [
      // Predetermined locations for meteor.x
      windowWidth / 4,
      windowWidth / 2,
      (3 * windowWidth) / 4,
      windowWidth,
      windowWidth,
      windowWidth,
      (3 * windowWidth) / 4,
      windowWidth / 2,
      windowWidth / 4,
      0,
      0,
      0,
    ];
    this.randPosY = [
      // Meteor.y preset coordinates
      0,
      0,
      0,
      height / 4,
      height / 2,
      (3 * height) / 4,
      height,
      height,
      height,
      (3 * height) / 4,
      height / 2,
      height / 4,
    ];
    this.img = loadImage("assets/images/meteor.png");
    this.spawnMeteor();
  }

  move() {
    // Update the meteor's position based on its velocity.
    this.x += this.vx;
    this.y += this.vy;
  }

  calculateDirection() {
    // Calculate the direction vector from the meteor to the mouse's last location.
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const magnitude = dist(mouseX, mouseY, this.x, this.y);

    // Normalize the direction vector to get a unit vector.
    if (this.vx === 0 && this.vy === 0) {
      //only when the meteor is spawned will it change.
      this.initialVx = (dx / magnitude) * this.speed;
      this.initialVy = (dy / magnitude) * this.speed;
    }
    this.vx = this.initialVx;
    this.vy = this.initialVy;
  }

  spawnMeteor() {
    this.meteorPos = Math.floor(random(0, 11));
    this.x = this.randPosX[this.meteorPos]; //sets predetermined locations for meteor
    this.y = this.randPosY[this.meteorPos];
    this.initialVx = 0;
    this.initialVy = 0;
    print("reset!"); //debug
    this.calculateDirection();
  }
}

let meteors = []; // Array to hold meteor objects

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  mouseX = width / 2;
  mouseY = height / 2;
  meteor = new Meteor(); // Create the initial meteor object
}

function spawnNewMeteor() {
  meteors.push(new Meteor()); // Create a new meteor and add it to the array
}

function draw() {
  if (scene === "title") {
    // Title screen
    background(0, 34, 88); // Set the background color to dark blue (RGB values).
    fill(255); // Set the fill color to white
    textAlign(CENTER, CENTER);
    textSize(60);
    text("Space!", width / 2, height / 4);
    textSize(29);
    text("click to start.", width / 2, (3 * height) / 4);
    textSize(8);
    text("drspaniel.com", width / 8, (7 * height) / 8); //shameless plug

    if (mouseIsPressed) {
      // If the mouse is clicked, transition to the simulation scene
      scene = "simulation";
      startMeteorSpawnInterval(); // Start spawning meteors
      isTimerRunning = !isTimerRunning;
    }
  } else if (scene === "simulation") {
    background(0, 34, 88); // Set the background color to dark blue (RGB values).

    // Update and display the timer
    if (isTimerRunning) {
      timer = millis() - oldTimer;
      print("timer:" + timer);
      print("oldTimer:" + oldTimer);
    }
    textSize(16);
    fill(255);
    textAlign(RIGHT, TOP);
    text("Time: " + nf(timer/1000, 0, 2), width - 100, 10);

    for (let i = meteors.length - 1; i >= 0; i--) {
      const meteor = meteors[i]; // Get the current meteor object from the array.

      image(meteor.img, meteor.x - 32, meteor.y - 32); // Display the meteor's image at its current position with an offset to center it.

      meteor.calculateDirection(); // Calculate the direction of the meteor's movement based on the mouse position.

      meteor.move(); // Update the meteor's position based on its velocity.

      if (
        meteor.y > height ||
        meteor.y < 0 ||
        meteor.x > width ||
        meteor.x < 0
      ) {
        meteors.splice(i, 1); // Remove meteors that go off-screen from the array.
      }
      if (dist(meteor.x, meteor.y, mouseX, mouseY) < 55) {
        //64 to account of radius of both meteor and ship. probably janky.
        // If the mouse touches a meteor, transition to the "end" scene
        scene = "end";
        clearInterval(meteorSpawnInterval); // Stop spawning meteors
        isTimerRunning = !isTimerRunning;
      }
    }
  } else if (scene === "end") {
    background(0, 34, 88); // Set the background color to dark blue (RGB values).
    fill(255); // Set the fill color to white
    textAlign(CENTER, CENTER);
    textSize(48);
    text("DEAD.", width / 2, height / 2);

    textSize(24);
    text("Time: " + nf(timer/1000, 0, 2) + "s", width / 2, (3 * height) / 4) ; // Display the elapsed time

    textSize(24);
    text("Click to Restart", width / 2, (2.5 * height) / 4); // Restart button

    if (mouseIsPressed) {
      // If the mouse is clicked, transition to the simulation scene and restart the simulation
      scene = "simulation";
      startMeteorSpawnInterval(); // Start spawning meteors
      meteors = [];
      oldTimer = timer;  //this wont work, since millis counts even when timer is 
      isTimerRunning = !isTimerRunning;   //resumes counting
    
    }
  } else if (scene === "board") {
    //WIP, this will be a leaderboard to submit results. title page will have a list

    background(0); // Set the background color to black
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function startMeteorSpawnInterval() {
  meteorSpawnInterval = setInterval(spawnNewMeteor, 200); // Start spawning meteors
}
