class Tank extends Collider{
    constructor(animations, x, y, scale, speed, collider_width, collider_height, collider_offset_X, collider_offset_Y){
        const URL = 'sprites/Tank_spritesheet.png';
        const animationArray = animations.animationList.tank;
        super(URL, animationArray, x, y, scale, speed, collider_width, collider_height, "tank", collider_offset_X, collider_offset_Y);
        
        this.spriteWidth = 780;
        this.spriteHeight = 246;
        this.maxFrame = 2;
        
        this.rockets = [];
        this.timeLimit = 100;
        this.timer = this.timeLimit;
        this.drive = true;
        this.shoot = false;
    }

    update(ctx, deltaTime, gamespeed){
        this.Xpos -= this.speed;
        this.gamespeed = gamespeed;
        super.update(ctx, deltaTime);
        this.FireRate();
        this.AnimationHandler(this.drive, this.shoot);
        this.Shoot();
        //this.updateRocketStates(ctx);
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

    /**
     * Runs a timer to control firing speed.
     */
    FireRate(){
        if(this.timer <= 0){
            this.shoot = true;
            this.timer = this.timeLimit;
        }else{
            this.timer--;
        }
    }

    /**
     * Create and launch a rocket projectile.
     */
    Shoot() {
        if (this.shoot) {
            const rocket = new Projectile(animations, this.Xpos, this.Ypos, 1, 15, 50, 50, "enemy", 0, 0);
            rocket.ownerObject = this;
            // Add rocket to global tankRockets array
            activeRockets.push(rocket);
            this.addProjectileToPhysicsObjects(rocket);
            this.shoot = false;  // Reset shooting flag
        }
    }

    /**
     * Add the rocket to physicsObjects array for collision detection.
     */
    addProjectileToPhysicsObjects(projectile) {
        physicsObjects.push(projectile);
    }

    /**
     * Update the state of rockets.
     */
    updateRocketStates(ctx) {
        for (let i = 0; i < this.rockets.length; i++) {
            this.rockets[i].update(ctx, 20, -1);
            if (this.rockets[i].Xpos < 0) { // Check if out of bounds
                this.removeProjectile(this.rockets[i]);
                this.rockets.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * Remove the rocket from physicsObjects array.
     */
    removeProjectile(projectile) {
        const index = physicsObjects.indexOf(projectile);
        if (index > -1) {
            physicsObjects.splice(index, 1);
        }
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