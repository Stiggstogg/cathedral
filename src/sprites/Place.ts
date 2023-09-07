// imports
import {
    Text,
    Grid,
    track, emit
} from 'kontra'
import myFonts from "../helper/fonts.ts";
import {gameOptions} from "../helper/gameOptions.ts";
import Worker from "../sprites/Worker.ts";
import random from "../helper/Random.ts";
import YearbookEntry from "./YearbookEntry.ts";

export default class Place {

    public readonly name: string;
    public readonly emoji: string;
    public readonly description: Text;
    public readonly image: Text;
    public readonly compo: Grid;
    private readonly fullYearbook: YearbookEntry[];
    public readonly placeType: string;
    public readonly relevantResources: boolean[];
    public resources: number[];
    public workers: Worker[];
    public prices: number[];
    public helpString: string;

    constructor(x: number, y: number, name: string, emoji: string, emojiFont: number, placeType: string, relevantResources: boolean[], resources: number[], helpString: string) {

        // initialize variables
        this.fullYearbook = [];
        this.workers = [];
        this.resources = resources;
        this.prices = [];
        this.helpString = helpString;

        // store variables
        this.name = name;
        this.placeType = placeType;
        this.relevantResources = relevantResources;
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
            rowGap: gameOptions.gameHeight * 0.01,
            children: [this.image, this.description]
        });

        // track the pointer down events
        track(this.description, this.image);

        // set all workers to empty
        for (let i = 0; i < 5; i++) {
            this.workers.push(new Worker('empty'));
        }

        this.reset();                           // reset everything

    }

    update() {

        if (this.placeType == 'Workshop' && this.name != 'Bishop') {
            this.description.text = this.name + ' (' + String(this.numberOfWorkers()) + '/5)';
        }

    }

    // action which happens if the image or the description is clicked
    click() {

        if (this.placeType != "Cathedral") {        // cathedral cannot be clicked
            emit('clickPlace', this);
        }

    }

    // action which happens when the place needs to be updated (on every tick)
    tick(year: number) {

        console.log('tick: ' + this.name);

        // increase the age of all workers
        for (let i = 0; i < this.workers.length; i++) {

            if (this.workers[i].name != 'Empty') {
                this.workers[i].birthday();
            }

        }

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
        else if (this.placeType == 'Market') {

            // generate new market prices
            this.prices = [Math.round(random.generateUniform(gameOptions.marketPriceMatrix[0])), Math.round(random.generateUniform(gameOptions.marketPriceMatrix[1]))];

        }
        else {

            // create a new yearbook entry (everything empty)
            let yearbookEntry = new YearbookEntry();
            yearbookEntry.year = year;
            let resourceMissing = [false, false, false, false, false, false];       // the value will be changed to true if a resource is missing. This is used later to write the "events" in the yearbook

            for (let i = 0; i < this.workers.length; i++) {             // go through every worker and calculate production

                let tempWorker = this.workers[i];
                let enoughResources = true;                             // set the boolean which checks if there are enough resources!
                let tempProduction = [0, 0, 0, 0, 0, 0];

                // write the name of the worker into the yearbook
                if (tempWorker.job == 'empty') {
                    yearbookEntry.workerBalance[i].name = '-';
                }
                else {
                    yearbookEntry.workerBalance[i].name = tempWorker.name;
                }

                // go through each resource, calculate the temporary production and check if any resource is missing
                for (let j = 0; j < tempWorker.production.length; j++) {
                    if (this.relevantResources[j]) {                            // only calculate it for the relevant resources

                        // calculate the production based on the production base value and a random variation
                        tempProduction[j] = Math.round(tempWorker.production[j] + random.generateUniform([-tempWorker.variation[j], tempWorker.variation[j]]));


                        // check if enough resources are available if the production is negative
                        if (tempProduction[j] < 0 && this.resources[j] < Math.abs(tempProduction[j])) {

                            resourceMissing[j] = true;
                            enoughResources = false;

                        }
                    }
                }

                // update the resources and set the
                if (enoughResources) {

                    for (let j = 0; j < tempWorker.production.length; j++) {
                        if (this.relevantResources[j]) {                            // only set it for the relevant resources

                            this.resources[j] = this.resources[j] + tempProduction[j];
                            yearbookEntry.overallBalance[j] = yearbookEntry.overallBalance[j] + tempProduction[j];

                        }
                    }

                    // write the yearbook entry of this worker
                    yearbookEntry.workerBalance[i].balance = tempProduction;

                }

            }

            // write the events in the yearbook
            for (let i = 0; i < resourceMissing.length; i++) {
                if (resourceMissing[i]) {
                    yearbookEntry.events.push(gameOptions.resourceMissingText[i]);
                }

            }

            // check if people die
            for (let i = 0; i < this.workers.length; i++) {
                if (this.workers[i].job != 'empty' && this.workers[i].dies() && yearbookEntry.events.length < 9) {      // check for each non empty worker if they die and if there are not yet too many events (to not overfill the yearbook)



                    if (this.placeType == 'Bishop') {
                        yearbookEntry.events.push('Bishop ' + this.workers[i].name + ' passed away ☠️!');  // write yearbook entry
                        this.workers[i] = new Worker('bishop');                      // replace with a new bishop
                        yearbookEntry.events.push('Welcome Bishop ' + this.workers[i].name + '!');  // write yearbook entry
                    }
                    else {
                        yearbookEntry.events.push(this.workers[i].name + ' died ☠️!');  // write yearbook entry
                        this.workers[i] = new Worker('empty');                      // replace with empty worker
                    }



                }


            }

            // write the yearbook entry into the yearbook
            this.writeYearbookEntry(yearbookEntry);

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

            if (this.workers[i].job != 'empty') {
                count++;
            }

        }

        return count;

    }

    // returns the next empty worker spot or -1 if there is no spot anymore free
    nextEmptyWorkerSpot(): number {

        for (let i = 0; i < this.workers.length; i++) {

            if (this.workers[i].job == 'empty') {
                return i;
            }

        }

        return -1;

    }

    reset() {

        // empty the yearbook
        this.fullYearbook.length = 0;

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

        // set the prices for iron and stone (only used for the market
        this.prices = [Math.round(random.generateUniform(gameOptions.marketPriceMatrix[0])), Math.round(random.generateUniform(gameOptions.marketPriceMatrix[1]))];

        // set the empty workers
        for (let i = 0; i < 5; i++) {
            this.workers[i] = new Worker('empty');
        }

        // if the place is the bishop place, add the bishop
        if (this.placeType == 'Bishop') {
            this.workers[0] = new Worker('bishop');
        }

    }

}