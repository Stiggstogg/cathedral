import {
    Text,
    SpriteClass,
    track, on
} from 'kontra'
import {gameOptions} from "../helper/gameOptions.ts";
import myFonts from "../helper/fonts.ts";
import Book from "./Book.ts";
import AllWorkers from "./AllWorkers.ts";
import Place from "./Place.ts";

export default class InsidePlace extends SpriteClass {

    public visible: boolean;
    public bookVisible: boolean;
    public workersVisible: boolean;
    public workerButtonVisible: boolean;
    public bookButtonVisible: boolean;
    public title: Text;
    public cancelButton: Text;
    private book: Book;
    private workers: AllWorkers;
    private workerButton: Text;
    private bookButton: Text;
    public place: Place;

    constructor(place: Place) {

        super({x: 0,
            y: 0,
            width: gameOptions.gameWidth,
            height: gameOptions.gameHeight,
            color: '#EADDCA'
        });             // create the background (parent sprite)

        // store variables
        this.place = place;

        // initialize variables
        this.visible = false;
        this.bookVisible = true;
        this.workersVisible = false;
        this.bookButtonVisible = false;
        this.workerButtonVisible = true;

        // create book
        this.book = new Book();

        // create worker tiles
        this.workers = new AllWorkers();

        // create title
        this.title = Text({
            x: this.width / 2,
            y: gameOptions.gameHeight * 0.0005,
            text: 'Title',
            ...myFonts[6]
        });

        // cancel button
        this.cancelButton = Text({
            x: gameOptions.gameWidth * 0.96,
            y: gameOptions.gameWidth * 0.02,
            text: '✖️',
            ...myFonts[6],
            anchor: {x: 0.5, y: 0.5},
            onDown: () => {this.hide();}
        });

        track(this.cancelButton);

        // add all elements to the scene
        this.addChild([
            this.title, this.cancelButton
        ]);

        // worker button
        this.workerButton = Text({
            x: this.cancelButton.x,
            y: this.book.page.y + this.book.page.height / 2,
            text: '🧔‍♂️',
            ...myFonts[6],
            anchor: {x: 0.5, y: 0.5},
            onDown: () => {
                this.bookVisible = false;
                this.workersVisible = true;
                this.workerButtonVisible = false;
                this.bookButtonVisible = true;
            }
        });

        this.bookButton = Text({
            x: this.workerButton.x,
            y: this.workerButton.y,
            text: '📙',
            ...myFonts[6],
            anchor: {x: 0.5, y: 0.5},
            onDown: () => {
                this.bookVisible = true;
                this.workersVisible = false;
                this.workerButtonVisible = true;
                this.bookButtonVisible = false;
            }
        });

        track(this.workerButton, this.bookButton);

        // events
        on('previousButton', () => {
            this.fillPageWorkshop(Number(this.book.year[0].text) - 1);
        });

        on('nextButton', () => {
            this.fillPageWorkshop(Number(this.book.year[0].text) + 1);
        });

    }

    update() {
        super.update();

        this.book.update();     // book is not added as a child and therefore needs to be updated, as the multi column grid needs to update to align again in case the text changed

        this.workers.setWorkerTiles(this.place.workers, this.place.placeType);      // update the worker tiles (as they might change!)

        this.workers.update();      // needs to be updated to ensure that the grid also updates its position (is not a child of this class)

        // check if the previous or next buttons need to be drawn
        this.book.showPreviousButton = this.place.yearExist(Number(this.book.year[0].text) - 1);

        this.book.showNextButton = this.place.yearExist(Number(this.book.year[0].text) + 1);

    }

    render() {
        if (this.visible) {                 // only render the inside Place object when it is shown
            super.render();

            if (this.bookVisible) {
                this.book.render();
            }

            if (this.workersVisible) {
                this.workers.render();
            }

            if (this.bookButtonVisible) {
                this.bookButton.render();
            }

            if (this.workerButtonVisible) {
                this.workerButton.render();
            }

        }
    }

    show(place: Place, year: number) {
        this.visible = true;                // make it visible
        this.place = place;                 // store the place
        this.title.text = this.place.name + ' ' + this.place.emoji;  // set the title

        // set everything correct for a workshop
        if (this.place.placeType == 'Workshop') {

            this.bookVisible = true;
            this.workersVisible = false;
            this.workerButtonVisible = true;
            this.bookButtonVisible = false;

            this.fillPageWorkshop(year);

        }
        else if (this.place.placeType == 'Bishop') {

            this.bookVisible = true;
            this.workersVisible = false;
            this.workerButtonVisible = false;
            this.bookButtonVisible = false;

            this.fillPageWorkshop(year);

        }
        else if (this.place.placeType == 'Market') {

            this.bookVisible = true;
            this.workersVisible = false;
            this.workerButtonVisible = false;
            this.bookButtonVisible = false;

        }
        else if (this.place.placeType == 'Town') {

            this.bookVisible = false;
            this.workersVisible = true;
            this.workerButtonVisible = false;
            this.bookButtonVisible = false;

        }

        // setup the worker page
        this.workers.setWorkerTiles(this.place.workers, this.place.placeType);

    }

    hide() {
        this.visible = false;
    }

    fillPageWorkshop(year: number) {

        let entry = this.place.readYearbookEntry(year);     // get the entry from the yearbook

        // left text
        let relevantResources = this.place.resources;   // get the array with the relevant resources
        let resourceSymbols = ['🪙','🧲','🪨','🥖','⚒️','⛪'];
        let textLeft: string[] = [];                        // initialize
        textLeft.push('Balance:', '', '', '', '', '', '', '');      // first title line and first entry of the resources line (empty)

        for (let i = 0; i < relevantResources.length; i++) {    // write resource symbols
            if (relevantResources[i]) {
                textLeft.push(resourceSymbols[i]);
            }
            else {
                textLeft.push(' ');
            }
        }

        for (let i = 0; i < entry.workerBalance.length; i++) {      // write worker balance

            textLeft.push(entry.workerBalance[i].name);

            for (let j = 0; j < entry.workerBalance[i].balance.length; j++) {

                if (relevantResources[j]) {
                    textLeft.push(String(entry.workerBalance[i].balance[j]));
                }
                else {
                    textLeft.push(' ');
                }

            }

        }

        textLeft.push('', '', '', '', '', '', '');
        textLeft.push('Overall:')

        for (let i = 0; i < entry.overallBalance.length; i++) {

            if (relevantResources[i]) {
                textLeft.push(String(entry.overallBalance[i]));
            }
            else {
                textLeft.push('');
            }

        }

        // right text (Events)
        let textRight: string[] = [];

        textRight.push('Events:');

        for (let i = 0; i < entry.events.length; i++) {

                textRight.push(entry.events[i]);

        }

        this.book.setupPages(entry.year, true, true,
            false, true, true, textLeft, textRight);

    }


}
