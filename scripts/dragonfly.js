class Dragonfly extends GameObject{
    constructor(animations, x, y, scale, speed){
        const URL = 'sprites/dragonfly_spritesheet.png';
        const animationArray = animations.animationList.dragonfly;
        super(URL, animationArray, x, y, scale, speed);

        this.spriteWidth = 333;
        this.spriteHeight = 300;
        this.maxFrame = 4;
    }

    update(ctx, deltaTime){
        this.Xpos += Math.random() * 5 - (this.speed);
        this.Ypos += Math.random() * 3 - 1.5;
        super.update(ctx, deltaTime);
    }
}