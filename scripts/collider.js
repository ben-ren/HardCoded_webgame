class Collider extends GameObject{
    constructor(URL, animationArray, x, y, scale, speed, width, height, colliderFlag){
        super(URL, animationArray, x, y, scale, speed);
        this.w = width;
        this.h = height;
        this.colliderFlag = colliderFlag;
    }

    //parse in current object's position & dimensions
    update(ctx, speed){
        super.update(ctx, speed);
    }

    InCollider(col){
        if(this.Xpos == col.Xpos || this.Ypos == col.Ypos){
            return true;
        }
        let col_X_width = col.Xpos + col.w;
        let col_Y_height = col.Ypos + col.h;
        let this_X_width = this.Xpos + this.w;
        let this_Y_height = this.Ypos + this.h;
        let InX = false;
        let InY = false;

        let X_in_box = this.Xpos > col.Xpos && this.Xpos < col_X_width;
        let width_in_box = this_X_width > col.Xpos && this_X_width < col_X_width;
        let y_in_box = this.Ypos > col.Ypos && this.Ypos < col_Y_height;
        let height_in_box = this_Y_height > col.Ypos && this_Y_height < col_Y_height;

        if(X_in_box || width_in_box){
            InX = true;
        }
        if(y_in_box || height_in_box){
            InY = true;
        }

        return InX && InY;
    }
}