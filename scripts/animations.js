class AnimationsList{
    constructor(){
        this.animationList = {
            player: [
                {"name": "idle", "X": [0], "Y": [0]},
                {"name": "idle aim", "X": [0], "Y": [1]},
                {"name": "run", "X": [1, 2, 3, 4, 5, 6], "Y": [0, 0, 0, 0, 0, 0]},
                {"name": "run aim", "X": [1, 2, 3, 4, 5, 6], "Y": [1, 1, 1, 1, 1, 1]},
                {"name": "jump", "X": [5], "Y": [2]},
                {"name": "jump aim", "X": [6], "Y": [2]},
                {"name": "slide", "X": [7], "Y": [0]},
                {"name": "hurt", "X": [8, 8], "Y": [0, 1]},
                {"name": "hang", "X": [3], "Y": [2]},
                {"name": "hang aim", "X": [4], "Y": [2]},
                {"name": "climb", "X": [0, 3], "Y": [2, 2]},
                {"name": "climb up", "X": [1, 2, 0, 0], "Y": [2, 2, 5, 0]}
            ],
            dragonfly: [
                {"name": "fly", "X": [1, 2, 1, 0], "Y": [0, 0, 0, 0]}
            ],
            tank: [
                {"name": "stationary", "X": [0], "Y": [0]},
                {"name": "shoot", "X": [0, 0, 0, 0], "Y": [0, 1, 2, 1]},
                {"name": "drive", "X": [0, 1], "Y": [0, 0]},
                {"name": "run_and_gun", "X": [0, 1, 0, 1], "Y": [0, 1, 2, 1]},
            ],
            puff: [
                {"name": "puff", "X": [0, 1, 2, 3, 4], "Y": [0, 0, 0, 0, 0]}
            ],
            rocket: [
                {"name": "fly", "X": [0, 1, 2, 1], "Y": [0, 0, 0, 0]}
            ],
        }
    }

}