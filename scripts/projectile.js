class Projectile extends Collider{
    constructor(animations, x, y, scale, speed, collider_width, collider_height, owner){
        const URL = 'sprites/rocket.png';
        const animationArray = animations.animationList.rocket;
        super(URL, animationArray, x, y, scale, speed, collider_width, collider_height, "rocket");

        this.spriteWidth = 50;
        this.spriteHeight = 50;
        this.maxFrame = 3;
        this.owner = owner;
    }

    update(ctx, deltaTime, direction){
        this.Xpos += this.speed * direction;
        super.update(ctx, deltaTime);
    }
}