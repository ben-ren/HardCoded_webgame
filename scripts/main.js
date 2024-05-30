// https://www.youtube.com/watch?v=GFO_txvwK_c
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); //could also parse in 'webgl'
const CANVAS_WIDTH = canvas.width = 1200;
const CANVAS_HEIGHT = canvas.height = 600;

let gameFrame = 0;
let gamespeed = 20;
const staggerFrames = 5;

//objects
const player = new Player();
const background = new Background(gamespeed);
const dragonfly = new Dragonfly();
const tank = new Tank();

function animate(){
    
    if(gameFrame % staggerFrames === 0){
        ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        background.LoadLayers(ctx, gamespeed);
        player.update(ctx, 0, 0, 3, 3, 200);
        dragonfly.update(ctx, 100, 100, .5, .5, 90);
        tank.update(ctx, 700, 450, .5, .5, 30);
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