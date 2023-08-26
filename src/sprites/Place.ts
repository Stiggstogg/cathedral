// imports
import {
    Text,
    Grid,
    track, emit
} from 'kontra'
import myFonts from "../helper/fonts.ts";
import {gameOptions} from "../helper/gameOptions.ts";

export default class Place {

    public readonly name: string;
    private readonly description: Text;
    public readonly image: Text;
    public readonly compo: Grid;
    private readonly fullYearbook: YearbookEntry[];
    private readonly placeType: string;
    public readonly resources: boolean[];

    constructor(x: number, y: number, name: string, emoji: string, emojiFont: number, placeType: string, resources: boolean[]) {

        // initialize variables
        this.fullYearbook = [];

        // store variables
        this.name = name;
        this.placeType = placeType;
        this.resources = resources;

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

        // set first yearbook entry
        this.fullYearbook.push({
            year: 1212,
            workerBalance: [
                {name: 'Jean', balance: [-12, -40, -47, -40, 0.3]},
                {name: 'Robert', balance: [-10, -55, -41, -22, 0.4]},
                {name: 'Pierre', balance: [-9, -23, -46, -45, 0.7]},
                {name: 'Mathieu', balance: [-15, -14, -10, -19, 1.9]},
                {name: 'Stephen', balance: [-22, -22, -65, -20, 2.3]},
            ],
            overallBalance: [-68, -154, -209, -146, 5.6],
            events: ['No cathedral!', 'Nothing happened!']
        });

    }

    // action which happens if the image or the description is clicked
    click() {

        emit('click' + this.placeType, this);

    }

    // action which happens when the place needs to be updated (on every tick)
    tick() {

        console.log('tick: ' + this.name);

    }

    // write a yearbook entry
    writeYearbookEntry(entry: YearbookEntry) {
        this.fullYearbook.push(entry);
    }

    // read a yearbook entry
    readYearbookEntry(year: number): YearbookEntry {

        // search for the entry of this year
        for (let i = 0; i < this.fullYearbook.length; i++) {
            if (this.fullYearbook[i].year == year) {
                return this.fullYearbook[i]
            }
        }

        return this.fullYearbook[this.fullYearbook.length - 1];    // if nothing was found just provide the last entry

    }

}