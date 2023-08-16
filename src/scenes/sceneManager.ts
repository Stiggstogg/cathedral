// imports
import {Scene} from 'kontra';

// Scene manager: Manages (switches) all scenes in the game
export default class SceneManager {

    private readonly scenes: Scene[];
    public currentScene!: Scene;

    constructor() {

        this.scenes = [];                           // set all scenes

    }

    init(scenes: Scene[]) {

        this.scenes.push(...scenes);                // set all scenes

        this.currentScene = this.scenes[0];         // set the first scene as the current one
        this.currentScene.show();                   // start the current scene

    }

    start(id: string) : void {

        // stop (hide) current scene
        this.currentScene.hide();

        // search for scene with the provided ID and set it as the current scene
        for (let s of this.scenes) {

            if (s.id == id) {

                this.currentScene = s;
                break;

            }
        }

        // start (show) the new scene
        this.currentScene.show();

    }

}