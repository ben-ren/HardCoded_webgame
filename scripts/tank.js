class Tank{
    objectImage = new Image();
    animations = new AnimationsList();

    constructor(x, y){
        this.objectImage.src = 'sprites/Tank_spritesheet.png';
        this.Xpos = x;
        this.Ypos = y;
        this.spriteWidth = 780;
        this.spriteHeight = 246;
        this.maxFrame = 2;
        this.frame = 0;
        this.frameTreads = 0;
        this.frameGun = 0;
        this.animationState = 0;

        this.frameInterval = 10; // Interval in milliseconds
        this.frameTimer = 0;
    }

    update(ctx, sX, sY, deltaTime){
        this.FrameStateAnimator(deltaTime);
        this.AnimationHandler();
        this.draw(ctx, this.Xpos, this.Ypos, sX, sY);
    }

    FrameStateAnimator(deltaTime){
        if(this.frameTimer > this.frameInterval){
            if(this.frame < this.maxFrame){
                this.frameTreads = this.animations.animationList.tank[this.animationState].treads[this.frame];
                this.frameGun = this.animations.animationList.tank[this.animationState].gun[this.frame];
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
        ctx.drawImage(this.objectImage, 1 * this.spriteWidth, 
            this.frameGun * this.spriteHeight, this.spriteWidth, 
            this.spriteHeight, 
            x, y, 
            this.spriteWidth*scaleX, this.spriteHeight*scaleY);
        ctx.drawImage(this.objectImage, 0 * this.spriteWidth, 
            this.frameTreads * this.spriteHeight, this.spriteWidth, 
            this.spriteHeight, 
            x, y, 
            this.spriteWidth*scaleX, this.spriteHeight*scaleY);
    }

    //Determine's which tank animations are being run
    AnimationHandler(){
        var drive = true;
        var shoot = false;
        let state = (drive ? 2 : 0) + (shoot ? 1 : 0);

        switch(state){
            case 0:
                console.log("nothing");
                this.animationState = 0;
                this.maxFrame = 1;
                break;
            case 1:
                console.log("shoot");
                this.animationState = 1;
                this.maxFrame = 4;
                break;
            case 2:
                console.log("drive");
                this.animationState = 2;
                this.maxFrame = 2;
                break;
            case 3:
                console.log("run and gun");
                this.animationState = 3;
                this.maxFrame = 4;
                break; 
       }
    }
}