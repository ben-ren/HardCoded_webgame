class Player extends GameObject{
    input = new InputManager();
    
    constructor(animations, x, y, scale, speed){
        const URL = 'sprites/Character_SpriteSheet_Reallign.png';
        const animationArray = animations.animationList.player;
        super(URL, animationArray, x, y, scale, speed);

        this.spriteWidth = 42;
        this.spriteHeight = 42;
        this.maxFrame = 6;

        this.onLadder = false;
        this.shoot = false;
        this.inAir = false;

        this.frameInterval = 200; // Interval in milliseconds for player
    }

    update(ctx, deltaTime){
        this.input.update();
        this.AnimationHandler();
        super.update(ctx, deltaTime);
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
}