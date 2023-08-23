import {
    Text,
    Sprite,
    GameObjectClass
} from 'kontra'
import {gameOptions} from "../helper/gameOptions.ts";
import myFonts from "../helper/fonts.ts";
import Line from "./Line.ts"

export default class InsidePlace extends GameObjectClass {

    private visible: boolean;
    private readonly background: Sprite;
    private readonly page: Sprite;
    private readonly frame: Sprite;
    private readonly shadow: Sprite;
    private title: Text;
    private lineSeparator: Line;
    private titleYear1: Text;
    private titleYear2: Text;
    //private readonly image: Text;
    //public readonly compo: Grid;

    constructor() {

        super({x: 0, y: 0, width: 1, height: 1});             // create a dummy object as the parent otherwise the render function is not executed

        // set show
        this.visible = true;

        // create title
        this.title = Text({
            x: gameOptions.gameWidth / 2,
            y: gameOptions.gameHeight * 0.0005,
            text: 'Yearbook: Bakery 🥖',
            ...myFonts[6]
        });

        // parameters
        let x = gameOptions.gameWidth * 0.05;               // x position of the book
        let y = gameOptions.gameHeight * 0.12;              // y position of the book
        let width = gameOptions.gameWidth * 0.9;            // width of the book
        let height = gameOptions.gameHeight * 0.85;          // height of the book
        let shadowDistance = gameOptions.gameWidth * 0.01;  // book frame width
        let frameWidth = gameOptions.gameWidth * 0.01;
        let gapsY = [
            gameOptions.gameHeight * 0.02,     // year from page top
            gameOptions.gameHeight * 0.02,     // title line from title
        ];

        // background
        this.background = Sprite({
            x: 0,
            y: 0,
            width: gameOptions.gameWidth,
            height: gameOptions.gameHeight,
            color: '#EADDCA'
        });

        // create shadow
        this.shadow = Sprite({
            x: x + shadowDistance,
            y: y + shadowDistance,
            width: width,
            height: height,
            color: 'black',
            opacity: 0.3
        });

        // create frame
        this.frame = Sprite({
            x: x,
            y: y,
            width: width,
            height: height,
            color: '#4A0404'
        });

        // create background
        this.page = Sprite({
            x: x + frameWidth,
            y: y + frameWidth / 2,
            width: width - 2 * frameWidth,
            height: height - frameWidth,
            color: '#E1C16E'
        });

        // create separator line between the pages
        this.lineSeparator = new Line({
            x: x + width / 2,
            y: this.page.y,
            length: this.page.height,
            horizontal: false,
            width: 1,
            color: 'black',
        });

        // create title Year
        this.titleYear1 = Text({
            x: x + width * 0.25,
            y: this.page.y + gapsY[0],
            text: '1213',
            ...myFonts[7]
        });

        this.titleYear2 = Text({
            x: x + width * 0.75,
            y: this.titleYear1.y,
            text: '1213',
            ...myFonts[7]
        });



        // create line below title
        // this.lineTitle = new Line({
        //     x: this.title.x - this.title.width / 2,
        //     y: this.title.y + this.title.height + gapsY[1],
        //     length: this.title.width,
        //     horizontal: true,
        //     width: 2,
        //     color: 'black',
        // });

        // add all elements to the scene
        this.addChild([this.background, this.shadow, this.frame, this.page,
            this.title, this.lineSeparator, this.titleYear1, this.titleYear2]);

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


}
