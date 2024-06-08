class GameObject extends Collider{
    objectImage = new Image();

    constructor(URL, animationArray, x, y, scale, speed){
        super();
        this.objectImage.src = URL;
        this.imageLoaded = false; // Track if the image is loaded
        this.objectImage.onload = () => {
            this.imageLoaded = true;
        };
        this.Xpos = x;
        this.Ypos = y;
        this.scale = scale

        this.animationArray = animationArray;
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.maxFrame = 4;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.animationState = 0;

        this.frameInterval = 10; // Interval in milliseconds
        this.frameTimer = 0;
        this.speed = speed;
    }

    update(ctx, deltaTime){
        // this.Xpos += Math.random() * 5 - (this.speed);
        // this.Ypos += Math.random() * 3 - 1.5;
        this.FrameStateAnimator(this.animationArray, deltaTime);
        if (this.imageLoaded) {
            this.draw(ctx, this.Xpos, this.Ypos, this.scale, this.scale);
        }
    }

    FrameStateAnimator(animationArray, deltaTime){
        if(this.frameTimer > this.frameInterval){
            if(this.frame < this.maxFrame){
                this.frameX = animationArray[this.animationState].X[this.frame];
                this.frameY = animationArray[this.animationState].Y[this.frame];
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