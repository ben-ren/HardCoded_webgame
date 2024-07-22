class Player extends Collider{
    input = new InputManager();
    rockets = [];
    shiftPressed = false;
    
    constructor(animations, x, y, scale, speed, collider_width, collider_height){
        const URL = 'sprites/Character_SpriteSheet_Reallign.png';
        const animationArray = animations.animationList.player;
        super(URL, animationArray, x, y, scale, speed, collider_width, collider_height, "player");

        this.spriteWidth = 42;
        this.spriteHeight = 42;
        this.maxFrame = 6;

        this.onLadder = false;
        this.shoot = false;
        this.inAir = false;
        this.jumpForce = this.speed*2;

        this.frameInterval = 200; // Interval in milliseconds for player
    }

    update(ctx, range, deltaTime){
        this.input.update();
        this.movement(range-100);
        this.AnimationHandler();
        super.update(ctx, deltaTime);
        this.updateRocketStates(range);
        this.shootRockets();
    }

    gravity(){
        if(this.Ypos < 450){
            this.Ypos+=9.8;
        }else{
            this.inAir = false;
        }
    }

    movement(limit){
        this.gravity();
        if(this.input.up){
            this.Ypos -= this.jumpForce
        }
        if(this.input.right && this.Xpos<limit){
            this.Xpos += this.speed;
        }else{
            this.Xpos -= this.speed;
        }
        if(this.Xpos < 0){
            this.Xpos = 0;
        }
    }

    updateRocketStates(range){
        for(let i=0; i<this.rockets.length; i++){
            this.rockets[i].update(ctx, 20);
            if(this.rockets[i].Xpos > range){
                this.removeProjectile(this.rockets[i]);
                this.rockets.splice(i, 1);
                i--;
            }
        }
    }

    shootRockets() {
        if (this.input.shift && !this.shiftPressed) {
            let newRocket = new Projectile(animations, this.Xpos+(this.spriteWidth*2), this.Ypos + (this.spriteHeight), 1, 20, 50, 50);
            this.rockets.push(newRocket);
            this.addProjectileToPhysicsObjects(newRocket);
        }
        this.shiftPressed = this.input.shift;
    }

    addProjectileToPhysicsObjects(projectile) {
        physicsObjects.push(projectile);
    }

    removeProjectile(projectile) {
        const index = physicsObjects.indexOf(projectile);
        if (index > -1) {
            physicsObjects.splice(index, 1);
        }
    }

    AnimationHandler(){
        if(this.input.up){
            this.inAir = true;
        }
        // Update animation state based on key inputs
        if (this.input.down) {
            this.animationState = 6; // Running animation state
            this.maxFrame = 1;
        } else if (this.inAir) {
            this.animationState = 4; // Jumping animation state
            this.maxFrame = 1;
        } else if (this.input.right) {
            this.animationState = 2; // Sliding animation state
            this.maxFrame = 6;
        } else {
            this.animationState = 0;
            this.maxFrame = 1;
        }
    }
}