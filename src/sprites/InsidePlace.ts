import {
    Text,
    SpriteClass,
    track
} from 'kontra'
import {gameOptions} from "../helper/gameOptions.ts";
import myFonts from "../helper/fonts.ts";
import Book from "./Book.ts";

export default class InsidePlace extends SpriteClass {

    public visible: boolean;            // is the whole place visible?
    public bookVisible: boolean;        // is the book visible?
    public title: Text;
    public cancelButton: Text;
    private book: Book;

    constructor() {

        super({x: 0,
            y: 0,
            width: gameOptions.gameWidth,
            height: gameOptions.gameHeight,
            color: '#EADDCA'
        });             // create the background (parent sprite)

        // initialize variables
        this.visible = false;
        this.bookVisible = true;

        // create book
        this.book = new Book();

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

    }

    render() {
        if (this.visible) {                 // only render the inside Place object when it is shown
                super.render();

                if (this.bookVisible) {
                    this.book.render();
                }

        }
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    // set the title
    setTitle(title: string) {
        this.title.text = title;
    }

}
