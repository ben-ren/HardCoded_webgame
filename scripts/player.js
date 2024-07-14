class Player extends Collider{
    input = new InputManager();
    rockets = [];
    shiftPressed = false;
    
    constructor(animations, x, y, scale, speed, collider_width, collider_height){
        const URL = 'sprites/Character_SpriteSheet_Reallign.png';
        const animationArray = animations.animationList.player;
        super(URL, animationArray, x, y, scale, speed, collider_width, collider_height);

        this.spriteWidth = 42;
        this.spriteHeight = 42;
        this.maxFrame = 6;

        this.onLadder = false;
        this.shoot = false;
        this.inAir = false;

        this.frameInterval = 200; // Interval in milliseconds for player
    }

    update(ctx, CANVAS_WIDTH, deltaTime){
        this.input.update();
        this.AnimationHandler();
        super.update(ctx, deltaTime);
        for(let i=0; i<this.rockets.length; i++){
            this.rockets[i].update(ctx, 20);
            if(this.rockets[i].Xpos > CANVAS_WIDTH){
                this.rockets.splice(i, 1);
                i--;
            }
        }
        this.shootRockets();
    }

    shootRockets() {
        if (this.input.shift && !this.shiftPressed) {
            this.rockets.push(new Projectile(animations, this.Xpos+(this.spriteWidth*2), this.Ypos + (this.spriteHeight), 1, 20, 50, 50));
        }
        this.shiftPressed = this.input.shift;
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