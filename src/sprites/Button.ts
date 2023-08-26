import {
    Text,
    SpriteClass,
    track
} from 'kontra'
import {gameOptions} from "../helper/gameOptions.ts";
import myFonts from "../helper/fonts.ts";

export default class Button extends SpriteClass {

    private text: Text;

    constructor(x: number, y: number, text: string, callback: () => void) {

        super({x: x, y: y, color: 'blue', onDown: callback});

        this.text = Text({
            text: text,
            ...myFonts[2],
            anchor: {x: 0.5, y: 0.5}
        });

        this.width = this.text.width + 2 * gameOptions.gameWidth * 0.01;
        this.height = this.text.height + 2 * gameOptions.gameWidth * 0.005;

        this.text.x = this.width / 2;
        this.text.y = this.height / 2;

        this.addChild(this.text);

        track(this);

    }

    // method to set the text
    setText(text: string) {
        this.text.text = text;
    }

    onDown() {

    }

}