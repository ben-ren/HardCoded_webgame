class Dragonfly extends Collider{
    constructor(animations, x, y, scale, speed, collider_width, collider_height){
        const URL = 'sprites/dragonfly_spritesheet.png';
        const animationArray = animations.animationList.dragonfly;
        super(URL, animationArray, x, y, scale, speed, collider_width, collider_height);

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