class EntitySpawner{
    constructor(enemyCount, xRange, yRange, createEntityFunction, ...params){
        this.createEntityFunction = createEntityFunction;
        this.params = params;
        this.enemiesArray = [];
        this.xRange = xRange;
        this.yRange = yRange;
        this.enemyCount = enemyCount
        for(let i=0; i<this.enemyCount; i++){
            this.addNewEntity();
        }
    }

    randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    addNewEntity(){
        let x = this.randomInRange(this.xRange[0], this.xRange[1]);
        let y = this.randomInRange(this.yRange[0], this.yRange[1]);
        let entity = new this.createEntityFunction(...this.params);
        entity.Xpos = x;
        entity.Ypos = y;
        this.enemiesArray.push(entity);
    }

    reset(){
        this.enemiesArray.length = 0; // Clear enemies array
        for (let i = 0; i < this.enemyCount; i++) {
            this.addNewEntity();
        }
    }

    update(ctx, deltaTime, gamespeed){
        this.enemiesArray.forEach(entity => {
            entity.update(ctx, deltaTime, gamespeed);
        });
    }
}