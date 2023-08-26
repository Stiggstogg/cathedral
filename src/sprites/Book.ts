import {
    Text,
    Sprite,
    SpriteClass,
    Grid, track
} from 'kontra'
import {gameOptions} from "../helper/gameOptions.ts";
import myFonts from "../helper/fonts.ts";
import Line from "./Line.ts"

export default class Book extends SpriteClass {

    public visible: boolean;
    private readonly shadow: Sprite;
    private cover: Sprite;
    public readonly page: Sprite;
    public title: Text;
    private lineSeparator: Line;
    public titleYear: Text[];
    public writingLines: Grid;
    private leftLines: boolean;
    private rightLines: boolean;
    public cancelButton: Text;

    constructor(leftLines: boolean, rightLines: boolean) {

        super({x: 0,
            y: 0,
            width: gameOptions.gameWidth,
            height: gameOptions.gameHeight,
            color: '#EADDCA'
        });             // create the background (parent sprite)

        // initialize variables
        this.visible = false;
        this.titleYear = [];
        this.leftLines = leftLines;         // should there be lines on the left side of the page?
        this.rightLines = rightLines;       // should there be lines on the right side of the page?

        // parameters
        let shadowDistance = gameOptions.gameWidth * 0.01;      // distance of the shadow
        let coverWidth = gameOptions.gameWidth * 0.01;          // book cover width
        let lineNum = 9;               // number of writing lines per page
        let gapsY = [
            gameOptions.gameHeight * 0.02,      // 0: year from page top
            gameOptions.gameHeight * 0.02,      // 1: title line from title
            gameOptions.gameHeight * 0.12,       // 2: writing lines from title year
            gameOptions.gameHeight * 0.07        // 3: gap between lines
        ];

        // create cover
        this.cover = Sprite({
            x: gameOptions.gameWidth * 0.01,            // parameter
            y: gameOptions.gameHeight * 0.12,           // parameter
            width: gameOptions.gameWidth * 0.9,         // parameter
            height: gameOptions.gameHeight * 0.85,      // parameter
            color: '#4A0404'
        });

        // create title
        this.title = Text({
            x: this.width / 2,
            y: gameOptions.gameHeight * 0.0005,
            text: 'Title',
            ...myFonts[6]
        });

        // create shadow
        this.shadow = Sprite({
            x: this.cover.x + shadowDistance,
            y: this.cover.y + shadowDistance,
            width: this.cover.width,
            height: this.cover.height,
            color: 'black',
            opacity: 0.3
        });

        // create page
        this.page = Sprite({
            x: this.cover.x + coverWidth,
            y: this.cover.y + coverWidth / 2,
            width: this.cover.width - 2 * coverWidth,
            height: this.cover.height - coverWidth,
            color: '#E1C16E'
        });

        // create separator line between the pages
        this.lineSeparator = new Line({
            x: this.cover.x + this.cover.width / 2,
            y: this.page.y,
            length: this.page.height,
            horizontal: false,
            width: 1,
            color: 'black',
        });

        // create title Year
        this.titleYear.push(Text({
            x: this.page.x + this.page.width * 0.25,
            y: this.page.y + gapsY[0],
            text: '1213',
            ...myFonts[7]
        }));

        // year titles at the top of the page
        this.titleYear.push(Text({
            x: this.page.x + this.page.width * 0.75,
            y: this.titleYear[0].y,
            text: '1213',
            ...myFonts[7]
        }));

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
            this.title, this.cover, this.shadow, this.page,
            this.lineSeparator, ...this.titleYear, this.cancelButton,
        ]);

        // create lines for writing
        let lines: Line[] = [];

        let numberOfLinesToDraw = lineNum;              // total number of lines to draw
        let numOfCols = 1;                              // set the number of columns
        let lineStartX = this.page.x + 2 * coverWidth;  // set the x coordinate where the line should start
        let lineLength = this.page.width / 2 - 4 * coverWidth;  // length of the lines

        if (this.leftLines && this.rightLines) {           // lines on both pages
            numberOfLinesToDraw = 2 * lineNum;
            numOfCols = 2;
        }
        else if (!this.leftLines && this.rightLines) {      // lines only on right page
            lineStartX = lineStartX + lineLength + 4 * coverWidth;
        }


        for (let i = 0; i < numberOfLinesToDraw; i++) {

            lines.push(new Line({
                x: 0,
                y: 0,
                length: lineLength,
                horizontal: true,
                width: 1,
                color: 'black'        // color does not work
            }));

        }

        this.writingLines = Grid({
            x: lineStartX,
            y: this.titleYear[0].y + this.titleYear[0].height + gapsY[2],
            rowGap: gapsY[3],
            colGap: lines[0].length + 4 * coverWidth,
            numCols: numOfCols,
            flow: 'grid',
            justify: 'center',
            children: lines
        });

        if (this.leftLines || this.rightLines) {                // do not add lines as a child if they are not needed
            this.addChild(this.writingLines);
        }

    }

    render() {
        if (this.visible) {
            super.render();         // only render the inside Place object when it is shown
        }
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;

    }

    setTitleYear(year: number) {

        for (let i = 0; i < this.titleYear.length; i++) {
            this.titleYear[i].text = String(year);
        }

    }

    setTitle(title: string) {
        this.title.text = title;
    }


}
