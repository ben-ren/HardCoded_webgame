class Collider extends GameObject{
    constructor(URL, animationArray, x, y, scale, speed, width, height, colliderFlag, collider_offset_X, collider_offset_Y){
        super(URL, animationArray, x, y, scale, speed);
        this.w = width * scale;
        this.h = height * scale;
        this.colliderFlag = colliderFlag;
        this.offset_X = collider_offset_X;
        this.offset_Y = collider_offset_Y;
    }

    //parse in current object's position & dimensions
    update(ctx, speed){
        super.update(ctx, speed);
        //this.DrawBox(ctx);
    }

    InCollider(col){
        const newXpos = this.Xpos + this.offset_X;
        const newXcol = col.Xpos + col.offset_X;
        const newYpos = this.Ypos + this.offset_Y;
        const newYcol = col.Ypos + col.offset_Y;
        // Check if one rectangle is to the left of the other
        if (newXpos + this.w < newXcol || newXcol + col.w < newXpos) {
            return false;
        }
        // Check if one rectangle is above the other
        if (newYpos + this.h < newYcol || newYcol + col.h < newYpos) {
            return false;
        }
        // If neither of the above, the rectangles must be intersecting
        return true;
    }

    // Draw bounding box for debugging
    DrawBox(ctx){
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.Xpos + this.offset_X, this.Ypos + this.offset_Y, this.w, this.h);
    }
}