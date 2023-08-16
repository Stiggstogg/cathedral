// imports
import {
    SceneClass,
    Text,
    track
} from 'kontra';
import myFonts from "../helper/fonts.ts";
import {gameOptions} from "../helper/gameOptions.ts";
import {sceneManager} from "../main.ts";

// Game scene: Main game scene
export default class WinScene extends SceneClass {

    constructor(id: string) {

        super({id: id});

    }

    onShow() {

        let text = Text({
            text: 'You WON!',
            ...myFonts[1],
            x: gameOptions.gameWidth / 2,
            y: gameOptions.gameHeight / 2,
            onDown: () => {
                sceneManager.start('menu');
            }
        })

        // track elements (pointer)
        track(text);

        // add elements to scene
        this.add(text);

    }

    onHide() {

    }

    update() {
        super.update();

    }

    render() {
        super.render();

    }

}