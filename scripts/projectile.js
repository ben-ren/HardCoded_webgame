class Projectile extends Collider{
    constructor(animations, x, y, scale, speed, collider_width, collider_height, owner, collider_offset_X, collider_offset_Y){
        const URL = 'sprites/rocket.png';
        const animationArray = animations.animationList.rocket;
        super(URL, animationArray, x, y, scale, speed, collider_width, collider_height, "rocket", collider_offset_X, collider_offset_Y);

        this.spriteWidth = 50;
        this.spriteHeight = 50;
        this.maxFrame = 3;
        this.owner = owner;
        this.ownerObject = null;
    }

    update(ctx, deltaTime, direction){
        this.Xpos += this.speed * direction;
        this.scaleX = direction;
        super.update(ctx, deltaTime);
    }
}