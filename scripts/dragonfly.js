class Dragonfly{
    objectImage = new Image();
    animations = new AnimationsList();

    constructor(){
        this.objectImage.src = 'sprites/dragonfly_spritesheet.png';
        this.spriteWidth = 333;
        this.spriteHeight = 300;
        this.maxFrame = 4;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.animXArray = this.animations.animationList.dragonfly[0].X;
        this.animYArray = this.animations.animationList.dragonfly[0].Y;
        this.animationState = 0;

        this.frameInterval = 10; // Interval in milliseconds
        this.frameTimer = 0;
    }

    update(ctx, x, y, sX, sY, deltaTime){
        if(this.frameTimer > this.frameInterval){
            if(this.frame < this.maxFrame){
                this.frameX = this.animations.animationList.dragonfly[0].X[this.frame];
                this.frameY = this.animations.animationList.dragonfly[0].Y[this.frame];
                this.frame++;
            }else{
                this.frame = 0;
            }
            this.frameTimer = 0;
        }else{
            this.frameTimer += deltaTime;
        }
        this.draw(ctx, x, y, sX, sY);
    }

    draw(ctx, x, y, scaleX, scaleY){
        ctx.drawImage(this.objectImage, this.frameX * this.spriteWidth, 
        this.frameY * this.spriteHeight, this.spriteWidth, 
        this.spriteHeight, 
        x, y, 
        this.spriteWidth*scaleX, this.spriteHeight*scaleY);
    }
}