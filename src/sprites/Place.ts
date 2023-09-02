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
    public readonly emoji: string;
    private readonly description: Text;
    public readonly image: Text;
    public readonly compo: Grid;
    private readonly fullYearbook: YearbookEntry[];
    public readonly placeType: string;
    public readonly resources: boolean[];

    constructor(x: number, y: number, name: string, emoji: string, emojiFont: number, placeType: string, resources: boolean[]) {

        // initialize variables
        this.fullYearbook = [];

        // store variables
        this.name = name;
        this.placeType = placeType;
        this.resources = resources;
        this.emoji = emoji;

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
        this.writeYearbookEntry({
            year: 1212,
            workerBalance: [
                {name: '-', balance: [0, 0, 0, 0, 0, 0]},
                {name: '-', balance: [0, 0, 0, 0, 0, 0]},
                {name: '-', balance: [0, 0, 0, 0, 0, 0]},
                {name: '-', balance: [0, 0, 0, 0, 0, 0]},
                {name: '-', balance: [0, 0, 0, 0, 0, 0]},
            ],
            overallBalance: [0, 0, 0, 0, 0, 0],
            events: ['No cathedral!', 'Nothing happened!']
        });

    }

    // action which happens if the image or the description is clicked
    click() {

        if (this.placeType != "Cathedral") {        // cathedral cannot be clicked
            emit('clickPlace', this);
        }

    }

    // action which happens when the place needs to be updated (on every tick)
    tick() {

        //console.log('tick: ' + this.name);

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

    // does a specific year in the yearbook exist? (needed to determine if the previous or next buttons need to be drawn
    yearExist(year: number): boolean {

        for (let i = 0; i < this.fullYearbook.length; i++) {

            if (year == this.fullYearbook[i].year) {
                return true;
            }

        }

        return false;

    }


}