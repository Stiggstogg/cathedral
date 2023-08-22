// imports
import {
    SceneClass,
    Text,
    Grid,
    track
} from 'kontra';
import myFonts from "../helper/fonts.ts";
import {gameOptions} from "../helper/gameOptions.ts";
import {sceneManager} from "../main.ts";


// Game scene: Main game scene
export default class MenuScene extends SceneClass {

    constructor(id: string) {

        super({id: id});

    }

    onShow() {

        // menu
        let title = Text({
            text: 'Cathedral Master Builder',
            ...myFonts[0]
        });

        let start = Text({
            text: 'Start',
            ...myFonts[1],
            onDown: () => {
                sceneManager.start('game');
            }
        });

        let credits = Text({
            text: 'Credits',
            ...myFonts[1],
            onDown: () => {
                console.log('Credits pressed');
            }
        })

        const gap = gameOptions.gameHeight * 0.1;        // gap which is used to separate the elements

        let menu = Grid({
            x: gameOptions.gameWidth / 2,
            y: gap * 2,
            anchor: {x: 0.5, y: 0},
            rowGap: [gap * 1.5, gap, gap],
            justify: 'center',
            children: [title, start, credits]
        })

        // track elements (pointer)
        track(start, credits);

        // add elements to scene
        this.add(menu);


        // Change automatically to the game scene TODO: Remove for release
        sceneManager.start('game');


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