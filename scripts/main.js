// https://www.youtube.com/watch?v=GFO_txvwK_c
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); //could also parse in 'webgl'
const CANVAS_WIDTH = canvas.width = 1200;
const CANVAS_HEIGHT = canvas.height = 600;
let canvasPosition = canvas.getBoundingClientRect();

let gameFrame = 0;
let gamespeed = 10;
let kills = 0;
let lives = 5;
const staggerFrames = 5;
const timeLimit = 40;
let timer = timeLimit;
let startTimer = false;
let isPaused = true;
let gameOver = false;
let animateFrameID;

//objects
const animations = new AnimationsList();
const physicsObjects = [];
const explosions = [];

//const gameobject = new GameObject('sprites/puff.png', animations.animationList.puff, 100, 100, 1, 0);
const player = new Player(animations, 0, 400, 3, gamespeed, 30, 42);
const background = new Background(gamespeed);
const dragonflySpawner = new EntitySpawner(
    5, [CANVAS_WIDTH, 1800], [100, 280], Dragonfly, animations, 0, 0, .3, gamespeed/4, 333, 200
);
const tankSpawner = new EntitySpawner(
    3, [CANVAS_WIDTH, 2000], [480,480], Tank, animations, 0, 0, .3, gamespeed/2, 520, 246
);
const UI = new UserInterface(kills, lives);

//Store all objects that inherit from Collider into physicsObject array
physicsObjects.push(player);
dragonflySpawner.enemiesArray.forEach(entity => physicsObjects.push(entity));
tankSpawner.enemiesArray.forEach(entity => physicsObjects.push(entity));

/**
 * TODO
 * ====
 * Tank projectile shoot
 * Tank projectile collision logic
 * Tank firing animation trigger
 * Player hair animation
 */

/**
 * Animate's the scene
 */ 
function animate(){
    if(isPaused) return;

    if(gameFrame % staggerFrames === 0){
        renderScene();
    }
    gameFrame++;

    if(!(lives <= 0)){
        animationFrameID = requestAnimationFrame(animate);
    }else{
        gameOver = true; 
    }

    if(gameOver){
        gameOverScreen();   
    }
}

function gameOverScreen(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    background.LoadLayers(ctx, 0);
    dragonflySpawner.update(ctx, 0, 0);
    tankSpawner.update(ctx, 0, 0);
    player.drawHurt(ctx);
    UI.endGameCard(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
}

/**
 * render's the scene objects
 */
function renderScene(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    background.LoadLayers(ctx, gamespeed);
    player.update(ctx, CANVAS_WIDTH, 200, gamespeed, startTimer);
    dragonflySpawner.update(ctx, 90, gamespeed/2);
    tankSpawner.update(ctx, 30, gamespeed/2);
    //loops through stored explosions as they happen.
    for(let i = 0; i< explosions.length; i++){
        explosions[i].update(ctx, 20);
        //delete's explosion object after reaching end of animation.
        if(explosions[i].frame == explosions[i].maxFrame){
            explosions.splice(i, 1);
            i--;
        }
    }
    //loop through all physicsObjects and run update and collision check
    for (let i = 0; i < physicsObjects.length; i++) {
        for (let j = i + 1; j < physicsObjects.length; j++) {
            if (physicsObjects[i].InCollider(physicsObjects[j])) {
                collisionLogic(i, j);
            }
        }
    }

    HandleEnemies();

    UI.update(ctx, kills, lives, CANVAS_WIDTH, CANVAS_HEIGHT, gamespeed);   //update user interface
    HurtTimer();
    //remove destroyed objects
    removeDestroyedObjects();
}

/**
 * Handle's enemy spawns & removal
 */
function HandleEnemies(){
    // Remove enemies that leave the canvas (x position < 0)
    dragonflySpawner.enemiesArray.forEach((entity, index) => {
        if (entity.Xpos < -CANVAS_WIDTH * 0.1) {
            // Remove from physicsObjects array
            const physicsIndex = physicsObjects.indexOf(entity);
            if (physicsIndex > -1) {
                physicsObjects.splice(physicsIndex, 1);
            }
            // Remove from the enemies array
            dragonflySpawner.enemiesArray.splice(index, 1);
        }
    });

    tankSpawner.enemiesArray.forEach((entity, index) => {
        if (entity.Xpos < -CANVAS_WIDTH * 0.1) {
            // Remove from physicsObjects array
            const physicsIndex = physicsObjects.indexOf(entity);
            if (physicsIndex > -1) {
                physicsObjects.splice(physicsIndex, 1);
            }
            // Remove from the enemies array
            tankSpawner.enemiesArray.splice(index, 1);
        }
    });

    // Add new entities if enemiesArray.length is less than EntitySpawner.enemyCount
    while (dragonflySpawner.enemiesArray.length < dragonflySpawner.enemyCount) {
        dragonflySpawner.addNewEntity();
        const newEntity = dragonflySpawner.enemiesArray[dragonflySpawner.enemiesArray.length - 1];
        physicsObjects.push(newEntity); // Add to physicsObjects array
    }

    while (tankSpawner.enemiesArray.length < tankSpawner.enemyCount) {
        tankSpawner.addNewEntity();
        const newEntity = tankSpawner.enemiesArray[tankSpawner.enemiesArray.length - 1];
        physicsObjects.push(newEntity); // Add to physicsObjects array
    }
}

/**
 *  Handles collision logic
 */
function collisionLogic(index1, index2){
    const obj1 = physicsObjects[index1];
    const obj2 = physicsObjects[index2];

    //on collision start timer if timer isn't 0 disable collision
    //add damage frames and animation
    if(obj1.colliderFlag === "player" && !(obj2.colliderFlag === "rocket") && timer >= timeLimit){
        console.log("player hit");
        //remove player life
        lives--;
        startTimer = true;
    }
    if(obj2.colliderFlag === "rocket" && (
        obj1.colliderFlag === "tank" || obj1.colliderFlag === "dragonfly"
    )){
        //console.log(`destroy ${obj2.colliderFlag} & ${obj1.colliderFlag}`);
        obj1.destroyed = true;
        obj2.destroyed = true;
        createExplosion(obj2.Xpos, obj2.Ypos, 50);
        //add to player kills
        kills++;
        gamespeed+=0.1;
    }
    //console.log(`Collision detected between ${obj1.colliderFlag} and ${obj2.colliderFlag}`);
}

/**
 * centralized removal function
*/
function removeDestroyedObjects() {
    // Remove from physicsObjects array
    for (let i = physicsObjects.length - 1; i >= 0; i--) {
        if (physicsObjects[i].destroyed) {
            // Remove from physicsObjects
            physicsObjects.splice(i, 1);
        }
    }

    // Remove from dragonflySpawner.enemiesArray
    for (let i = dragonflySpawner.enemiesArray.length - 1; i >= 0; i--) {
        if (dragonflySpawner.enemiesArray[i].destroyed) {
            // Remove from dragonflySpawner.enemiesArray
            dragonflySpawner.enemiesArray.splice(i, 1);
        }
    }

    // Remove from tankSpawner.enemiesArray
    for (let i = tankSpawner.enemiesArray.length - 1; i >= 0; i--) {
        if (tankSpawner.enemiesArray[i].destroyed) {
            // Remove from tankSpawner.enemiesArray
            tankSpawner.enemiesArray.splice(i, 1);
        }
    }
}

/**
 * Stores explosion's in an array for sequential animation.
 */
function createExplosion(x, y, size){
    const xPos = x - size/2;
    const yPos = y - size/2;
    explosions.push(new Explosion(xPos, yPos));
}

/**
 * Dictates animation i-frames
 */
function HurtTimer(){
    if(startTimer){
        timer--;
    }
    if(timer < 0){
        startTimer = false;
        timer = timeLimit;
    }
}

function togglePauseResume() {
    isPaused = !isPaused;
    const pauseResumeButton = document.getElementById('pauseResumeButton');
    pauseResumeButton.textContent = isPaused ? 'Resume' : 'Pause';
  
    if (!isPaused) {
      requestAnimationFrame(animate);
    }
  }
  
  /**
   * Reset's the game's state
   */
  function resetGame() {
    // Reset game variables
    gameFrame = 0;
    kills = 0;
    lives = 5;
    gamespeed = 10;
    timer = timeLimit;
    startTimer = false;
    gameOver = false;
    physicsObjects.length = 0; // Clear the physicsObjects array
    explosions.length = 0;     // Clear the explosions array
  
    // Reset player and spawners
    player.reset();
    dragonflySpawner.reset();
    tankSpawner.reset();
  
    // Re-add player and enemies to physicsObjects
    physicsObjects.push(player);
    dragonflySpawner.enemiesArray.forEach(entity => physicsObjects.push(entity));
    tankSpawner.enemiesArray.forEach(entity => physicsObjects.push(entity));
  
    // Start the animation again
    animate();
  }

  /**
   * Load Main Menu 
   */
  function LoadMainMenu(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    // Load and draw the default image
    const defaultImage = new Image();
    defaultImage.src = 'sprites/Character_SpriteSheet_Reallign.png'; // Path to your default image

    defaultImage.onload = () => {
        // Draw the image on the canvas
        ctx.drawImage(defaultImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
  }

/**
 * load's the webpage content
 */
window.addEventListener('load', function(){ // May need to create load function if hosting on a web sever
    //Adds slider that controls active gamespeed
    const slider = document.getElementById('slider');
    slider.value = gamespeed;
    const showGameSpeed = document.getElementById('showGameSpeed');
    showGameSpeed.innerHTML = gamespeed;
    slider.addEventListener('change', function(e){
        gamespeed = e.target.value;
        showGameSpeed.innerHTML = e.target.value;
    });
    LoadMainMenu();

    // Pause/Resume button event listener
    const pauseResumeButton = document.getElementById('pauseResumeButton');
    pauseResumeButton.addEventListener('click', togglePauseResume);

    // Pause/Resume button event listener
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', resetGame);

    animate();  //runs animation
});