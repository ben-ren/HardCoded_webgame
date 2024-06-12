class Explosion extends GameObject{
    constructor(x, y){
        const URL = 'sprites/puff.png'
        super(URL, animations.animationList.puff, x, y, 1, 1);
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.maxFrame = 5;
    }
    update(ctx, deltaTime){
        super.update(ctx, deltaTime);
    }
}