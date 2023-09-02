// imports
import {
    Text,
    Grid,
    track, emit
} from 'kontra'
import myFonts from "../helper/fonts.ts";
import {gameOptions} from "../helper/gameOptions.ts";
import Worker from "../sprites/Worker.ts";

export default class Place {

    public readonly name: string;
    public readonly emoji: string;
    private readonly description: Text;
    public readonly image: Text;
    public readonly compo: Grid;
    private readonly fullYearbook: YearbookEntry[];
    public readonly placeType: string;
    public readonly resources: boolean[];
    public workers: Worker[];

    constructor(x: number, y: number, name: string, emoji: string, emojiFont: number, placeType: string, resources: boolean[]) {

        // initialize variables
        this.fullYearbook = [];
        this.workers = [];

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
            events: ['No cathedral yet!']
        });

        // set the empty workers
        for (let i = 0; i < 5; i++) {
            this.workers.push(new Worker('empty'));
        }

    }

    // action which happens if the image or the description is clicked
    click() {

        if (this.placeType != "Cathedral") {        // cathedral cannot be clicked
            emit('clickPlace', this);
        }

    }

    // action which happens when the place needs to be updated (on every tick)
    tick() {

        console.log('tick: ' + this.name);

        if (this.placeType == 'Town') {

            // update all worker spots
            for (let i = 0; i < this.workers.length; i++) {

                // check if any of the workers is leaving and remove them
                if (this.workers[i].name != 'Empty' && Math.random() <= gameOptions.workerLeaveChance) {
                    this.workers[i] = new Worker('empty');
                }

                // add new workers in the empty spots: places 0 - 2 are always filled with one baker, smith and mason
                // remaining places are filled by chance and might also be empty
                if (this.workers[i].name == 'Empty') {

                    switch (i) {
                        case 0:
                            this.workers[0] = new Worker('baker');
                            break;
                        case 1:
                            this.workers[1] = new Worker('smith');
                            break;
                        case 2:
                            this.workers[2] = new Worker('mason');
                            break;
                        default:
                            if (Math.random() <= gameOptions.newWorkerChance) {

                                let jobChance = Math.random();
                                let job: string;

                                if (jobChance < 0.33) {         // one third chance to be a baker
                                    job = 'baker';
                                }
                                else if (jobChance < 0.66) {    // one third chance to be a smith
                                    job = 'smith';
                                }
                                else {
                                    job = 'mason';              // one third chance to be a mason
                                }

                                this.workers[i] = new Worker(job);
                            }
                    }

                }

            }

        }
        else {
            // TODO: Continue here with adding the resource calculation!
        }

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

    // get the number of workers (not counting the empty spaces)
    numberOfWorkers(): number {

        let count = 0;

        for (let i = 0; i < this.workers.length; i++) {

            if (this.workers[i].name != 'empty') {
                count++;
            }

        }

        return count;

    }

    // returns the next empty worker spot or -1 if there is no spot anymore free
    nextEmptyWorkerSpot(): number {

        for (let i = 0; i < this.workers.length; i++) {

            if (this.workers[i].name == 'Empty') {
                return i;
            }

        }

        return -1;

    }

}