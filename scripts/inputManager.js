class InputManager{
    constructor(){
        this.up = false;
        this.right = false;
        this.left = false;
        this.down = false;
        this.shift = false;
    }

    update(){
        this.Input();
    }

    //Handle's controller input's to determine sprite animation's
    Input(){
        
        // Change to arrow functions to retain the outer 'this' context
        window.addEventListener("keydown", (event) => {
            switch(event.key){
                case " ":
                case "w":
                case "ArrowUp":
                    // jump
                    this.up = true;
                    break;
                case "Control":
                case "ArrowDown":
                case "s":
                    // slide
                    this.down = true;
                    break;
                case "a":
                case "ArrowLeft":
                    // left
                    this.left = true;
                    break;
                case "d":
                case "ArrowRight":
                    // right
                    this.right = true;
                    break;
                case "Shift":
                    this.shift = true;
                    break;
            }
        });

        window.addEventListener("keyup", (event) => {
            switch(event.key){
                case "a":
                case "ArrowLeft":
                    // left
                    this.left = false;
                    break;
                case "d":
                case "ArrowRight":
                    // right
                    this.right = false;
                    break;
                case " ":
                case "w":
                case "ArrowUp":
                    // jump
                    this.up = false;
                    break;
                case "Control":
                case "ArrowDown":
                case "s":
                    // slide
                    this.down = false;
                    break;
                case "Shift":
                    this.shift = false;
                    break;
            }
        });
    }
}