// https://www.youtube.com/watch?v=GFO_txvwK_c
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); //could also parse in 'webgl'
const CANVAS_WIDTH = canvas.width = 1200;
const CANVAS_HEIGHT = canvas.height = 600;
let canvasPosition = canvas.getBoundingClientRect();

let gameFrame = 0;
let gamespeed = 20;
let kills = 0;
let lives = 5;
const staggerFrames = 5;
const timeLimit = 40;
let timer = timeLimit;
let startTimer = false;

//objects
const animations = new AnimationsList();
const physicsObjects = [];
const explosions = [];

//const gameobject = new GameObject('sprites/puff.png', animations.animationList.puff, 100, 100, 1, 0);
const player = new Player(animations, 0, 400, 3, gamespeed, 30, 42);
const background = new Background(gamespeed);
const dragonflySpawner = new EntitySpawner(
    6, [200, 1000], [100, 280], Dragonfly, animations, 0, 0, .3, gamespeed/4, 333, 200
);
const tankSpawner = new EntitySpawner(
    3, [900, 2000], [480,480], Tank, animations, 0, 0, .3, gamespeed/2, 520, 246
);
const UI = new UserInterface(kills, lives);

//Store all objects that inherit from Collider into physicsObject array
physicsObjects.push(player);
dragonflySpawner.enemiesArray.forEach(entity => physicsObjects.push(entity));
tankSpawner.enemiesArray.forEach(entity => physicsObjects.push(entity));

function animate(){
    if(gameFrame % staggerFrames === 0){
        ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        background.LoadLayers(ctx, gamespeed);
        player.update(ctx, CANVAS_WIDTH, 200, startTimer);
        dragonflySpawner.update(ctx, 90);
        tankSpawner.update(ctx, 30);
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

        UI.update(ctx, kills, lives, CANVAS_WIDTH);   //update user interface
        HurtTimer();
        //remove destroyed objects
        removeDestroyedObjects();
    }

    gameFrame++;
    requestAnimationFrame(animate);
}

// Handle collision logic here
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
    }
    //console.log(`Collision detected between ${obj1.colliderFlag} and ${obj2.colliderFlag}`);
}

//centralized rmoval function
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

function createExplosion(x, y, size){
    const xPos = x - size/2;
    const yPos = y - size/2;
    explosions.push(new Explosion(xPos, yPos));
}

function HurtTimer(){
    if(startTimer){
        timer--;
    }
    if(timer < 0){
        startTimer = false;
        timer = timeLimit;
    }
}

// May need to create load function if hosting on a web sever
window.addEventListener('load', function(){
    //Adds slider that controls active gamespeed
    const slider = document.getElementById('slider');
    slider.value = gamespeed;
    const showGameSpeed = document.getElementById('showGameSpeed');
    showGameSpeed.innerHTML = gamespeed;
    slider.addEventListener('change', function(e){
        gamespeed = e.target.value;
        showGameSpeed.innerHTML = e.target.value;
    });

    animate();  //runs animation
});