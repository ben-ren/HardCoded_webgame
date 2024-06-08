class Player extends Collider{
    objectImage = new Image();
    input = new InputManager();
    animations = new AnimationsList();
    
    constructor(x, y, scale, speed){
        super();
        this.objectImage.src = 'sprites/Character_SpriteSheet_Reallign.png';
        this.Xpos = x;
        this.Ypos = y;
        this.scale = scale
        this.spriteWidth = 42;
        this.spriteHeight = 42;
        this.maxFrame = 6;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.animationState = 0;

        this.onLadder = false;
        this.shoot = false;
        this.inAir = false;

        this.frameInterval = 200; // Interval in milliseconds for player
        this.frameTimer = 0;
    }

    update(ctx, deltaTime){
        this.input.update();
        this.FrameStateAnimator(deltaTime);
        this.AnimationHandler();
        this.draw(ctx, this.Xpos, this.Ypos, this.scale, this.scale)
    }

    FrameStateAnimator(deltaTime){
        if(this.frameTimer > this.frameInterval){
            if(this.frame < this.maxFrame){
                this.frameX = this.animations.animationList.player[this.animationState].X[this.frame];
                this.frameY = this.animations.animationList.player[this.animationState].Y[this.frame];
                this.frame++;
            }else{
                this.frame = 0;
            }
            this.frameTimer = 0;
        }else{
            this.frameTimer += deltaTime;
        }
    }

    AnimationHandler(){
        // Update animation state based on key inputs
        if (this.input.down) {
            this.animationState = 6; // Running animation state
            this.maxFrame = 1;
        } else if (this.input.up) {
            this.animationState = 4; // Jumping animation state
            this.maxFrame = 1;
            this.inAir = true;
        } else if (this.input.right) {
            this.animationState = 2; // Sliding animation state
            this.maxFrame = 6;
        } else {
            this.animationState = 0;
            this.maxFrame = 1;
        }
        if(!this.input.up){
            this.inAir = false;
        }
    }

    /*
        ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        sx, sy is the cutout position from top-right corner. 
        sw, sh is the height and width of the cutout.
    */
    draw(ctx, x, y, scaleX, scaleY){
        ctx.drawImage(this.objectImage, this.frameX * this.spriteWidth, 
        this.frameY * this.spriteHeight, this.spriteWidth, 
        this.spriteHeight, 
        x, y, 
        this.spriteWidth*scaleX, this.spriteHeight*scaleY);
    }
}