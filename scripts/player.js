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

        this.initialX = x;
        this.initialY = y;

        this.onLadder = false;
        this.shoot = false;
        this.inAir = false;
        this.jumpForce = this.speed - this.speed/8;
        this.jumpHeight = 15;
        this.timer = this.jumpHeight;
        this.groundHeightPosition = 420;

        this.frameInterval = 200; // Interval in milliseconds for player
    }

    update(ctx, range, deltaTime, gamespeed, hurt){
        this.input.update();
        this.movement(range-100, gamespeed);
        if(hurt){
            this.animationState = 7;    // Hurt animation state
            this.maxFrame = 2;
        }else{
            this.AnimationHandler();
        }
        super.update(ctx, deltaTime);
        this.updateRocketStates(range);
        this.shootRockets();
    }

    gravity(){
        //console.log(this.timer);
        if(this.Ypos < this.groundHeightPosition && this.timer === 0){
            this.Ypos+= (9.8 + this.timer);
        }else{
            this.inAir = false;
        }
        if(this.Ypos >= this.groundHeightPosition){
            this.timer = this.jumpHeight;
            this.inAir = false;
        }
        if(!this.input.up){
            this.timer = 0;
        }
    }

    movement(limit, gamespeed){
        this.gravity();
        if(this.input.up && this.timer > 0){
            this.jump();
            this.inAir = true;
        }
        if(this.input.right && this.Xpos<limit){
            this.Xpos += this.speed;
        }else{
            //match backwards speed to pathway image scrollspeed (0.6 * gamespeed)
            this.Xpos -= 0.6 * gamespeed;
        }
        if(this.Xpos < 0){
            this.Xpos = 0;
        }
    }

    jump(){
        //if !inAir start timer
        if(!this.inAir){
            this.Ypos -= (this.jumpForce + this.timer);    //apply jump force
            this.timer--;                   //iterate timer down
        }
    }

    updateRocketStates(range){
        for(let i=0; i<this.rockets.length; i++){
            this.rockets[i].update(ctx, 20, 1);
            if(this.rockets[i].Xpos > range){
                this.removeProjectile(this.rockets[i]);
                this.rockets.splice(i, 1);
                i--;
            }
        }
    }

    shootRockets() {
        if (this.input.shift && !this.shiftPressed) {
            let newRocket = new Projectile(animations, this.Xpos+(this.spriteWidth*2), this.Ypos + (this.spriteHeight), 1, 20, 50, 50, "player");
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
        // Update animation state based on key inputs
        if (this.input.down) {
            this.animationState = 6;    // Sliding animation state
            this.maxFrame = 1;
        } else if (this.inAir) {
            this.animationState = 4;    // Jumping animation state
            this.maxFrame = 1;
        } else if (!this.input.right && this.Xpos > 0) {
            this.animationState = 0;    // Standing animation state
            this.maxFrame = 1;
        } else {
            this.animationState = 2;    // Running animation state
            this.maxFrame = 6;
        }
    }

    reset(){
        this.Xpos = this.initialX;
        this.Ypos = this.initialY;
        this.rockets = [];
        this.shoot = false;
        this.inAir = false;
        this.timer = this.jumpHeight;
    }

    //draws a static player hurt animation for freeze frame
    drawHurt(ctx){
        this.frameX = 8;
        this.frameY = 0;
        ctx.drawImage(
            this.objectImage, this.frameX * this.spriteWidth, 
            this.frameY * this.spriteHeight, this.spriteWidth, 
            this.spriteHeight, 
            this.Xpos, this.Ypos, 
            this.spriteWidth*this.scale, this.spriteHeight*this.scale
        );
    }
}