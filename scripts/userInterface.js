class UserInterface{
    constructor(kills, lives){
        this.kills = kills;
        this.lives = lives
        this.resetbool = false;
    }

    update(ctx, kills, lives, CANVAS_WIDTH, CANVAS_HEIGHT, gamespeed){
        this.kills = kills;
        this.lives = lives
        ctx.font = "30px Arial";
        ctx.fillText("lives: " + lives, CANVAS_WIDTH*0.05, 40);
        let x = CANVAS_WIDTH - (CANVAS_WIDTH*0.1)
        ctx.fillText("kills: " + kills, x, 40);
        let y = CANVAS_HEIGHT - (CANVAS_HEIGHT*0.1)
        let x2 = CANVAS_WIDTH - (CANVAS_WIDTH*0.2)
        ctx.fillText("gamespeed: " + gamespeed, x2, y);
    }

    draw(ctx, x, y, width, height){
        ctx.drawImage(this.image, x, y, width, height);
    }

    endGameCard(ctx, CANVAS_WIDTH, CANVAS_HEIGHT){
        // Set text properties
        ctx.font = "60px Arial";
        ctx.textAlign = "center";
        ctx.lineWidth = 5; // Thickness of the outline

        // Calculate text positions
        let newYTop = CANVAS_HEIGHT / 2 - CANVAS_HEIGHT * 0.1;
        let newYBottom = CANVAS_HEIGHT / 2 + CANVAS_HEIGHT * 0.1;

        // Set outline style and draw outline
        ctx.strokeStyle = "black";
        ctx.strokeText("Game Over!", CANVAS_WIDTH / 2, newYTop);
        ctx.strokeText("Total Kills: " + this.kills, CANVAS_WIDTH / 2, newYBottom);

        // Set fill style and draw fill
        ctx.fillStyle = "white";
        ctx.fillText("Game Over!", CANVAS_WIDTH / 2, newYTop);
        ctx.fillText("Total Kills: " + this.kills, CANVAS_WIDTH / 2, newYBottom);
        
    }
}