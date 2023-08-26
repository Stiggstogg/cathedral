import {
    Text,
    Sprite,
    SpriteClass,
    Grid
} from 'kontra'
import {gameOptions} from "../helper/gameOptions.ts";
import myFonts from "../helper/fonts.ts";
import Button from "../sprites/Button.ts";
//import Line from "./Line.ts"

export default class WorkerTile extends SpriteClass {

    public visible: boolean;
    public hire: boolean;
    private readonly shadow: Sprite;
    private readonly background: Sprite;
    public name: Text;
    private readonly picture: Text;
    public job: Text;
    public age: Text;
    public wage: Text;
    private characteristics: Grid;
    private reputation: Text;
    private hireFireButton: Button;

    constructor() {

        super({x: gameOptions.gameWidth * 0.1,
            y: gameOptions.gameHeight * 0.12,
            width: gameOptions.gameWidth * 0.17,
            height: gameOptions.gameHeight * 0.85,
            color: '#EADDCA'
        });             // create the background (parent sprite)

        // initialize variables
        this.visible = false;
        this.hire = true;

        // parameters
        let shadowDistance = gameOptions.gameWidth * 0.01;      // distance of the shadow
        let yDistances = [
            0,                                      // background to name
            gameOptions.gameHeight * 0.05,         // title to picture
            gameOptions.gameHeight * 0.02,         // background to hire / fire button
        ];

        let xDistances = [
            gameOptions.gameWidth * 0.01,        // text from left and right border
        ];

        // create title
        this.name = Text({
            x: this.width / 2,
            y: yDistances[0],
            text: 'Gillaume',
            ...myFonts[7]
        });

        // create shadow
        this.shadow = Sprite({
            x: shadowDistance,
            y: shadowDistance,
            width: this.width,
            height: this.height,
            color: 'black',
            opacity: 0.3
        });

        // create background (the same as the parent but it needs to be drawn after the shadow)
        this.background = Sprite({
            x: 0,
            y: 0,
            width: this.width,
            height: this.height,
            color: this.color
        });

        // create picture
        this.picture = Text({
            x: this.width / 2,
            y: this.name.y + this.name.height + yDistances[1],
            text: '🧔‍♂️',
            ...myFonts[3],
            anchor: {x: 0.5, y: 0}
        });

        // create job text
        this.job = Text({
            text: '🥖',
            ...myFonts[5]
        });

        // create age text
        this.age = Text({
            text: '46',
            ...myFonts[5]
        });

        // create age text
        this.wage = Text({
            text: '3',
            ...myFonts[5]
        });

        // create the characteristics titles
        let characteristicsTitle = Grid({
            x: xDistances[0],
            y: this.picture.y + this.picture.height + yDistances[1] / 2,
            justify: 'start',
            children: [
                Text({text: 'Job:', ...myFonts[5]}),
                Text({text: 'Age:', ...myFonts[5]}),
                Text({text: 'Wage:', ...myFonts[5]})
            ]
        });

        // create the characteristics
        this.characteristics = Grid({
            x: this.width - xDistances[0],
            y: characteristicsTitle.y,
            justify: 'end',
            anchor: {x: 1, y: 0},
            children: [this.job, this.age, this.wage]
        });

        // create the reputation title
        let reputationTitle = Text({
            x: characteristicsTitle.x,
            y: characteristicsTitle.y + characteristicsTitle.height + yDistances[1] / 2,
            text: 'Reputation:',
            ...myFonts[5],
            width: this.width - 2 * xDistances[0]
        });

        // create the reputation text
        this.reputation = Text({
            x: reputationTitle.x,
            y: reputationTitle.y + reputationTitle.height,
            text: 'Hard working but high variation, good quality, cool, eats much',
            ...myFonts[5],
            width: this.width - 2 * xDistances[0]
        });

        // create hire/fire button
        this.hireFireButton = new Button(
            0,
            0,
            'Hire',
            () => {console.log('it was clicked')}
        );

        this.hireFireButton.x = this.width / 2 - this.hireFireButton.width / 2;
        this.hireFireButton.y = this.height - yDistances[2] - this.hireFireButton.height;

        // add all elements as childs
        this.addChild([
            this.shadow, this.background, this.name, this.picture,
            characteristicsTitle, this.characteristics,
            reputationTitle, this.reputation,
            this.hireFireButton
        ]);

    }

    render() {
        if (this.visible) {
            super.render();         // only render the inside Place object when it is shown
        }
    }

    show(hire: boolean) {
        this.visible = true;
        this.hire = hire;
    }

    hide() {
        this.visible = false;

    }


}
