// imports
import {
    Grid,
    SceneClass,
    Text
} from 'kontra';
import myFonts from "../helper/fonts.ts";
import {gameOptions} from "../helper/gameOptions.ts";

// Game scene: Main game scene
export default class GameScene extends SceneClass {

    private money!: Text;
    private stone!: Text;
    private iron!: Text;
    private bread!: Text;
    private tools!: Text;

    constructor(id: string) {

        super({id: id});

    }

    onShow() {

        // status bar
        this.money = Text({text: '🪙: 0', ...myFonts[2]});
        this.stone = Text({text: '🪨: 0 kg', ...myFonts[2]});
        this.iron = Text({text: '🧲: 0 kg', ...myFonts[2]});
        this.bread = Text({text: '🥖: 0 pcs', ...myFonts[2]});
        this.tools = Text({text: '⚒️: 0 pcs', ...myFonts[2]});

        let resources = Grid({
            x: gameOptions.gameHeight * 0.01,
            y: gameOptions.gameWidth * 0.01,
            anchor: {x: 0, y: 0},
            rowGap: [gameOptions.gameHeight * 0.02],
            children: [this.money, this.stone, this.iron, this.bread, this.tools]
        })

        // add elements to scene
        this.add(resources);

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