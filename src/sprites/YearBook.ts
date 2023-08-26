import Book from "./Book.ts";
import {
    Grid,
    Text,
    track
} from "kontra";
import myFonts from "../helper/fonts.ts";
import {gameOptions} from "../helper/gameOptions.ts";
import Place from "./Place.ts";

export default class YearBook extends Book {

    private textLeft: Text[];
    private textLeftNumRows: number;
    private textLeftNumCols: number;
    private textRight: Text[];
    private textRightNumRows: number;
    private textRightNumCols: number;
    private textGridLeft: Grid;
    private textGridRight: Grid;
    private nextButton: Text;
    private previousButton: Text;
    private workersButton: Text;
    private currentPlace: Place;
    private year: number;

    constructor(place: Place) {

        super(true, true);

        // set parameters
        this.title.text = 'Bakery 🥖';
        this.currentPlace = place;
        this.year = 1213;

        // next and previous buttons
        let distanceButton = 0.01 * gameOptions.gameWidth;

        this.previousButton = Text({
            x: this.page.x + distanceButton,
            y: this.page.y + distanceButton,
            text: '⬅️',
            ...myFonts[6],
            anchor: {x: 0, y: 0},
            onDown: () => {this.pageChange();}
        });

        this.nextButton = Text({
            x: this.page.x + this.page.width - distanceButton,
            y: this.page.y + distanceButton,
            text: '➡️',
            ...myFonts[6],
            anchor: {x: 1, y: 0},
            onDown: () => {this.pageChange();}
        });

        this.workersButton = Text({
            x: this.cancelButton.x,
            y: this.page.y + this.page.height / 2,
            text: '🧔‍♂️',
            ...myFonts[6],
            anchor: {x: 0.5, y: 0.5},
            onDown: () => {this.pageChange();}
        });

        track(this.previousButton, this.nextButton, this.workersButton);

        // initialize text
        this.textLeft = [];
        this.textLeftNumRows = 9;
        this.textLeftNumCols = 6;
        this.textRight = [];
        this.textRightNumRows = 9;
        this.textRightNumCols = 1;

        for (let i = 0; i < this.textLeftNumRows * this.textLeftNumCols; i++) {

            this.textLeft.push(Text({
                x: 0,
                y: 0,
                text: '',
                ...myFonts[5],
            }));
        }

        // set the texts which are not changed
        this.writeLine(true, 0, ['Balance:']);
        this.writeLine(true, 8, ['Overall:']);

        let textY = this.writingLines.y - Number(this.writingLines.rowGap) * 0.75;
        let textRowGap = Number(this.writingLines.rowGap) - this.textLeft[0].height;

        this.textGridLeft = Grid( {
            x: this.writingLines.x,
            y: textY,
            rowGap: textRowGap,
            colGap: gameOptions.gameWidth * 0.01,
            numCols: this.textLeftNumCols,
            flow: 'grid',
            justify: ['start', 'end', 'end', 'end', 'end', 'end', 'end'],
            children: this.textLeft
        });

        for (let i = 0; i < this.textRightNumRows * this.textRightNumCols; i++) {

            this.textRight.push(Text({
                x: 0,
                y: 0,
                text: '',
                ...myFonts[5],
            }));
        }

        this.writeLine(false, 0, ['Events:']);

        this.textGridRight = Grid( {
            x: this.writingLines.x + Number(this.writingLines.colGap),
            y: textY,
            rowGap: textRowGap,
            flow: 'column',
            justify: ['start'],
            children: this.textRight
        });

        this.addChild([this.textGridLeft, this.textGridRight, this.previousButton, this.nextButton, this.workersButton]);

    }

    writeLine(left: boolean, row: number, newText: string[]) {

        let text = this.textLeft;
        let numCols = this.textLeftNumCols;

        if (!left) {
            text = this.textRight;
            numCols = this.textRightNumCols;
        }

        for (let i = 0; i < newText.length; i++) {
            text[row * numCols + i].text = newText[i];
        }

    }

    pageChange() {

        this.writeLine(true, 0, ['Balance:', ' ', ' ', ' ', ' ']);
        this.writeLine(true, 1, ['', '🪙', '🥖', '⚒️', '⛪']);
        this.writeLine(true, 2, ['Etienne', '-30', '+40', '-42', '+40']);
        this.writeLine(true, 3, ['Jim', '-30', '+40', '-40', '+40']);
        this.writeLine(true, 4, ['Guillaume', '-30', '+40', '-40', '+40']);
        this.writeLine(true, 5, ['Stephen', '-30', '+40', '-40', '+40']);
        this.writeLine(true, 6, ['Pierre', '-30', '+40', '-40', '+40']);
        this.writeLine(true, 7, ['', '', '', '', '']);
        this.writeLine(true, 8, ['Overall:', '-300', '+400', '-100', '+400']);

    }

    setPlace(place: Place) {
        this.currentPlace = place;     // change place

        let resourceSymbols = ['','🪙','🥖','⚒️','🪨','⛪'];
        let resources = this.currentPlace.resources;

        for (let i = 0; i < resources.length; i++) {
            if (!resources[i]) {
                resourceSymbols[i+1] = '';
            }
        }

        this.writeLine(true, 1, resourceSymbols);

    }

    setYear(year: number) {
        this.year = year;
    };

    fillPages() {

        let entry = this.currentPlace.readYearbookEntry(this.year);

        // setup the page
        this.setTitle(this.currentPlace.name + ' ' + this.currentPlace.image.text);      // Set the title of the place
        this.setTitleYear(entry.year);                                      // set the year

        // write the worker balance
        let resources = this.currentPlace.resources;
        let line: string[] = [];

        for (let i = 0; i < entry.workerBalance.length; i++) {      // go through every line for every worker

            line = [entry.workerBalance[i].name, '', '', '', '', ''];

            for (let j = 0; j < resources.length; j++) {                 // only provide numbers for the resources which are relevant
                if (resources[j]) {
                    line[j+1] = String(entry.workerBalance[i].balance[j]);
                }
            }

            this.writeLine(true, i + 2, line);
        }

        // write the overall balance
        line = ['Overall:', '', '', '', '', ''];

        for (let i = 0; i < resources.length; i++) {                 // only provide numbers for the resources which are relevant
            if (resources[i]) {
                line[i+1] = String(entry.overallBalance[i]);
            }
        }

        this.writeLine(true, 8, line);

        // write the events
        for (let i = 0; i < entry.events.length; i++) {
            this.writeLine(false, i+1, [entry.events[i]]);
        }

    }

}