class Dragonfly{
    objectImage = new Image();
    animations = new AnimationsList();

    constructor(x, y){
        this.objectImage.src = 'sprites/dragonfly_spritesheet.png';
        this.Xpos = x;
        this.Ypos = y;
        this.spriteWidth = 333;
        this.spriteHeight = 300;
        this.maxFrame = 4;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.animationState = 0;

        this.frameInterval = 10; // Interval in milliseconds
        this.frameTimer = 0;
    }

    update(ctx, sX, sY, deltaTime){
        this.FrameStateAnimator(deltaTime);
        this.draw(ctx, this.Xpos, this.Ypos, sX, sY);
    }

    FrameStateAnimator(deltaTime){
        if(this.frameTimer > this.frameInterval){
            if(this.frame < this.maxFrame){
                this.frameX = this.animations.animationList.dragonfly[this.animationState].X[this.frame];
                this.frameY = this.animations.animationList.dragonfly[this.animationState].Y[this.frame];
                this.frame++;
            }else{
                this.frame = 0;
            }
            this.frameTimer = 0;
        }else{
            this.frameTimer += deltaTime;
        }
    }

    draw(ctx, x, y, scaleX, scaleY){
        ctx.drawImage(this.objectImage, this.frameX * this.spriteWidth, 
        this.frameY * this.spriteHeight, this.spriteWidth, 
        this.spriteHeight, 
        x, y, 
        this.spriteWidth*scaleX, this.spriteHeight*scaleY);
    }
}