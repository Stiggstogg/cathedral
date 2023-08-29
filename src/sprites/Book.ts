import {
    Text,
    Sprite,
    SpriteClass,
    Grid
} from 'kontra'
import {gameOptions} from "../helper/gameOptions.ts";
import myFonts from "../helper/fonts.ts";
import Line from "./Line.ts"

export default class Book extends SpriteClass {

    private readonly shadow: Sprite;
    private readonly cover: Sprite;
    private readonly page: Sprite;
    private readonly lineSeparator: Line;
    public year: Text[];
    private showLinesLeft: boolean;
    private showLinesRight: boolean;
    private readonly linesLeft: Grid;
    private readonly linesRight: Grid;
    private showTextLeft: boolean;
    private showTextRight: boolean;
    private textLeft: Text[];
    private textRight: Text[];
    private textLeftGrid: Grid;
    private textRightGrid: Grid;

    constructor() {

        super({x: 0,
            y: 0,
            width: 0,
            height: 0
        });             // create the background (parent sprite)

        // initialize variables
        this.year = [];
        this.showLinesLeft = true;
        this.showLinesRight = true;
        this.showTextLeft = true;
        this.showTextRight = true;

        // parameters
        let shadowDistance = gameOptions.gameWidth * 0.01;      // distance of the shadow
        let coverWidth = gameOptions.gameWidth * 0.01;          // book cover width
        let lineNum = 9;               // number of writing lines per page
        let gapsY = [
            gameOptions.gameHeight * 0.02,          // 0: year from page top
            gameOptions.gameHeight * 0.02,          // 1: title line from title
            gameOptions.gameHeight * 0.12,          // 2: writing lines from title year
            gameOptions.gameHeight * 0.07           // 3: gap between lines
        ];

        // create cover
        this.cover = Sprite({
            x: gameOptions.gameWidth * 0.01,
            y: gameOptions.gameHeight * 0.12,
            width: gameOptions.gameWidth * 0.9,
            height: gameOptions.gameHeight * 0.85,
            color: '#4A0404'
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

        // create year title on the top of the page
        for (let i = 0; i < 2; i++) {
            this.year.push(Text({
                x: this.page.x + this.page.width * (0.25 + 0.5 * i),        // adds the title in the middle of the left side (0.25) and in the middle of the right side (0.75)
                y: this.page.y + gapsY[0],
                text: '1213',
                ...myFonts[7]
            }));
        }

        // add all childern (barebone of the book without lines and text) to the sprite
        this.addChild([this.shadow, this.cover, this.page, this.lineSeparator, ...this.year]);

        // create lines for writing
        let separateLinesLeft: Line[] = [];
        let separateLinesRight: Line[] = [];

        let lineStartX = this.page.x + 2 * coverWidth;  // set the x coordinate where the line should start
        let lineLength = this.page.width / 2 - 4 * coverWidth;  // length of the lines
        let lineProperties = {
            x: 0,
            y: 0,
            horizontal: true,
            width: 1,
            color: 'black'        // color does not work
        };

        for (let i = 0; i < lineNum; i++) {     // create the separate lines

            separateLinesLeft.push(new Line({
                ...lineProperties,
                length: lineLength
            }));

            separateLinesRight.push(new Line({
                ...lineProperties,
                length: lineLength
            }));

        }

        this.linesLeft = Grid({                 // add the lines to a grid
            x: lineStartX,
            y: this.year[0].y + this.year[0].height + gapsY[2],
            rowGap: gapsY[3],
            children: separateLinesLeft
        });

        this.linesRight = Grid({                 // add the lines to a grid
            x: lineStartX + lineLength + 4 * coverWidth,
            y: this.year[0].y + this.year[0].height + gapsY[2],
            rowGap: gapsY[3],
            children: separateLinesRight
        });

        // create the texts
        this.textLeft = [];
        this.textRight = [];
        let textProperties = {
            x: 0,
            y: 0,
            text: 'huhu',
            ...myFonts[5]
        }

        for (let i = 0; i < lineNum; i++) {     // create the text lines

            this.textLeft.push(Text(textProperties));
            this.textRight.push(Text(textProperties));

        }

        let textY = this.linesLeft.y - Number(this.linesLeft.rowGap) * 0.75;
        let textRowGap = Number(this.linesLeft.rowGap) - this.textLeft[0].height;

        this.textLeftGrid = Grid( {         // TODO: Columns are missing!
            x: this.linesLeft.x,
            y: textY,
            rowGap: textRowGap,
            children: this.textLeft
        });

        this.textRightGrid = Grid( {         // TODO: Columns are missing!
            x: this.linesRight.x,
            y: textY,
            rowGap: textRowGap,
            children: this.textRight
        });

    }

    render() {
        super.render();

        if (this.showLinesLeft) {           // render the left lines only if they are shown
            this.linesLeft.render();
        }

        if (this.showLinesRight) {           // render the right lines only if they are shown
            this.linesRight.render();
        }

        if (this.showTextLeft) {           // render the left lines only if they are shown
            this.textLeftGrid.render();
        }

        if (this.showTextRight) {           // render the right lines only if they are shown
            this.textRightGrid.render();
        }

    }

    initializeBook(showLinesLeft: boolean, showLinesRight: boolean, showTextLeft: boolean, showTextRight: boolean) {

        this.showLinesLeft = showLinesLeft;
        this.showLinesRight = showLinesRight;
        this.showTextLeft = showTextLeft;
        this.showTextRight = showTextRight;

    }

    // set the year on the page
    setYear(year: number) {

        for (let i = 0; i < this.year.length; i++) {
            this.year[i].text = String(year);
        }

    }

}
