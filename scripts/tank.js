class Tank extends Collider{
    constructor(animations, x, y, scale, speed, collider_width, collider_height){
        const URL = 'sprites/Tank_spritesheet.png';
        const animationArray = animations.animationList.tank;
        super(URL, animationArray, x, y, scale, speed, collider_width, collider_height, "tank");
        
        this.spriteWidth = 780;
        this.spriteHeight = 246;
        this.maxFrame = 2;
        
    }

    update(ctx, deltaTime, gamespeed){
        this.Xpos -= this.speed;
        this.gamespeed = gamespeed;
        super.update(ctx, deltaTime);
        this.AnimationHandler(true, false);
    }

    draw(ctx, x, y, scaleX, scaleY){
        ctx.drawImage(this.objectImage, 1 * this.spriteWidth, 
            this.frameY * this.spriteHeight, this.spriteWidth, 
            this.spriteHeight, 
            x, y, 
            this.spriteWidth*scaleX, this.spriteHeight*scaleY);
        ctx.drawImage(this.objectImage, 0 * this.spriteWidth, 
            this.frameX * this.spriteHeight, this.spriteWidth, 
            this.spriteHeight, 
            x, y, 
            this.spriteWidth*scaleX, this.spriteHeight*scaleY);
    }

    //Determine's which tank animations are being run
    AnimationHandler(drive, shoot){
        let state = (drive ? 2 : 0) + (shoot ? 1 : 0);

        switch(state){
            case 0:
                //console.log("nothing");
                this.animationState = 0;
                this.maxFrame = 1;
                break;
            case 1:
                //console.log("shoot");
                this.animationState = 1;
                this.maxFrame = 4;
                break;
            case 2:
                //console.log("drive");
                this.animationState = 2;
                this.maxFrame = 2;
                break;
            case 3:
                //console.log("run and gun");
                this.animationState = 3;
                this.maxFrame = 4;
                break; 
       }
    }
}