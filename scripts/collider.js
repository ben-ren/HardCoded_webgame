class Collider extends GameObject{
    constructor(URL, animationArray, x, y, scale, speed, width, height, colliderFlag){
        super(URL, animationArray, x, y, scale, speed);
        this.w = width * scale;
        this.h = height * scale;
        this.colliderFlag = colliderFlag;
    }

    //parse in current object's position & dimensions
    update(ctx, speed){
        super.update(ctx, speed);
        //this.DrawBox(ctx);
    }

    InCollider(col){
        // Check if one rectangle is to the left of the other
        if (this.Xpos + this.w < col.Xpos || col.Xpos + col.w < this.Xpos) {
            return false;
        }
        // Check if one rectangle is above the other
        if (this.Ypos + this.h < col.Ypos || col.Ypos + col.h < this.Ypos) {
            return false;
        }
        // If neither of the above, the rectangles must be intersecting
        return true;
    }

    // Draw bounding box for debugging
    DrawBox(ctx){
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.Xpos, this.Ypos, this.w, this.h);
    }
}