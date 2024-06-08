// https://www.youtube.com/watch?v=GFO_txvwK_c
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); //could also parse in 'webgl'
const CANVAS_WIDTH = canvas.width = 1200;
const CANVAS_HEIGHT = canvas.height = 600;

let gameFrame = 0;
let gamespeed = 20;
const staggerFrames = 5;

const explosions = [];

//objects
const animations = new AnimationsList();
//const gameobject = new GameObject('sprites/puff.png', animations.animationList.puff, 100, 100, 1, 0);
const player = new Player(animations, 0, 0, 3, 1);
const background = new Background(gamespeed);
const dragonflySpawner = new EntitySpawner(
    10, [200, 1000], [0, 300], Dragonfly, animations, 0, 0, .3, 2.5
);
const tankSpawner = new EntitySpawner(
    4, [900, 2000], [450,450], Tank, animations, 0, 0, .4, 2
);

function animate(){if(gameFrame % staggerFrames === 0){
        ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        background.LoadLayers(ctx, gamespeed);
        player.update(ctx, 200);
        dragonflySpawner.update(ctx, 90);
        tankSpawner.update(ctx, 30);
    }

    gameFrame++;
    requestAnimationFrame(animate);
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