class UserInterface{
    constructor(kills, lives){
        this.kills = kills;
        this.lives = lives
    }

    update(ctx, kills, lives, CANVAS_WIDTH){
        this.kills = kills;
        this.lives = lives
        ctx.font = "30px Arial";
        ctx.fillText("lives: " + lives, CANVAS_WIDTH*0.05, 40);
        let x = CANVAS_WIDTH - (CANVAS_WIDTH*0.1)
        ctx.fillText("kills: " + kills, x, 40);
    }

    draw(ctx, x, y, width, height){
        ctx.drawImage(this.image, x, y, width, height);
    }
}