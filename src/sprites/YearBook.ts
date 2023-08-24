import Book from "./Book.ts";
import {
    Grid,
    Text
} from "kontra";
import myFonts from "../helper/fonts.ts";
import {gameOptions} from "../helper/gameOptions.ts";

export default class YearBook extends Book {

    private textLeft: Text[];
    private textRight: Text[];
    private textGridLeft: Grid;
    private textGridRight: Grid;


    constructor() {

        super(true, true);

        // set parameters
        this.title.text = 'Yearbook: Bakery 🥖';

        // initialize text
        this.textLeft = [];
        this.textRight = [];

        for (let i = 0; i < 49; i++) {

            this.textLeft.push(Text({
                x: 0,
                y: 0,
                text: i.toString(),
                ...myFonts[5],
            }));
        }

        let textY = this.writingLines.y - Number(this.writingLines.rowGap) * 0.75;
        let textRowGap = Number(this.writingLines.rowGap) - this.textLeft[0].height;

        this.textGridLeft = Grid( {
            x: this.writingLines.x,
            y: textY,
            rowGap: textRowGap,
            colGap: gameOptions.gameWidth * 0.03,
            numCols: 7,
            flow: 'grid',
            justify: ['start', 'end', 'end', 'end', 'end', 'end', 'end'],
            children: this.textLeft
        });

        for (let i = 0; i < 9; i++) {

            this.textRight.push(Text({
                x: 0,
                y: 0,
                text: i.toString(),
                ...myFonts[5],
            }));
        }

        this.textGridRight = Grid( {
            x: this.writingLines.x + Number(this.writingLines.colGap),
            y: textY,
            rowGap: textRowGap,
            flow: 'column',
            justify: ['start'],
            children: this.textRight
        });

        this.addChild([this.textGridLeft, this.textGridRight]);

    }

}
