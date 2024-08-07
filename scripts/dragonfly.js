class Dragonfly extends Collider{
    constructor(animations, x, y, scale, speed, collider_width, collider_height, collider_offset_X, collider_offset_Y){
        const URL = 'sprites/dragonfly_spritesheet.png';
        const animationArray = animations.animationList.dragonfly;
        super(URL, animationArray, x, y, scale, speed, collider_width, collider_height, "dragonfly", collider_offset_X, collider_offset_Y);

        this.spriteWidth = 333;
        this.spriteHeight = 300;
        this.maxFrame = 4;
    }

    update(ctx, deltaTime, gamespeed){
        if(gamespeed > 0){
            this.Xpos += Math.random() * 5 - (this.speed);
            this.Ypos += Math.random() * 3 - 1.5;
            this.move();
        }
        this.gamespeed = gamespeed;
        super.update(ctx, deltaTime);
    }

    move(){
        this.Xpos -= this.speed;
    }
}