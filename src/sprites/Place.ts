// imports
import {
    Text,
    Grid,
    track, emit
} from 'kontra'
import myFonts from "../helper/fonts.ts";
import {gameOptions} from "../helper/gameOptions.ts";

export default class Place {

    private readonly name: string;
    private readonly description: Text;
    private readonly image: Text;
    public readonly compo: Grid;

    constructor(x: number, y: number, name: string, emoji: string, emojiFont: number) {

        // store variables
        this.name = name;

        // create elements of the composition (picture and text)
        this.description = Text({text: this.name, ...myFonts[2], onDown: () => {this.click()}});
        this.image = Text({text: emoji, ...myFonts[emojiFont], onDown: () => {this.click()}});

        // create the composition
        this.compo = Grid({
            x: gameOptions.gameWidth * x,
            y: gameOptions.gameHeight * y,
            anchor: {x: 0.5, y: 0.5},
            justify: 'center',
            children: [this.image, this.description]
        });

        // track the pointer down events
        track(this.description, this.image);


    }

    // action which happens if the image or the description is clicked
    click() {

        emit('click' + this.name);

    }

    // action which happens when the place needs to be updated (on every tick)
    tick() {

        console.log('tick: ' + this.name);

    }

}