//let gamespeed = 30;

class Layer{
    constructor(image, speedModifier, gamespeed){
        this.gamespeed = gamespeed;
        this.x = 0;
        this.y = 0;
        this.width = 3753;
        this.height = 600;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = this.gamespeed * this.speedModifier;
    }

    update(gamespeed){
        this.speed = gamespeed * this.speedModifier;
        if(this.x <= -this.width){
            this.x = 0;
        }
        this.x = Math.floor(this.x - this.speed);
    }

    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}