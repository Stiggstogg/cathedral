// imports
import {
    emit,
    Grid,
    on,
    SceneClass,
    Text, track
} from 'kontra';
import myFonts from "../helper/fonts.ts";
import {gameOptions} from "../helper/gameOptions.ts";
import Place from "../sprites/Place.ts";
import InsidePlace from "../sprites/InsidePlace.ts";
import Worker from "../sprites/Worker.ts";
import Popup from "../sprites/Popup.ts";
import {helpTexts} from "../helper/Data.ts";
import YearProgress from "../sprites/YearProgress.ts";

// Game scene: Main game scene
export default class GameScene extends SceneClass {

    private gameState: number;
    private resourcesText!: Grid;
    private resources: number[];
    private places: Place[];
    private cathedral!: Place;
    private year!: Text;
    private progressText!: Text;
    private tickLength!: number;        // length of one tick in ms
    private lastTickTime!: number;      // time when the last tick happened
    private nextTick!: number;           // number of the next tick
    private newYearTime: number;        // time when a new year started
    private insidePlace!: InsidePlace;
    private popup!: Popup;
    private helpString!: string;
    private helpButton!: Text;
    private yearProgress!: YearProgress;

    constructor(id: string) {

        super({id: id});

        // initialize all variables
        this.gameState = -1;
        this.resources = [0, 0, 0, 0, 0, 0];
        this.places = [];
        this.newYearTime = 0;
        this.lastTickTime = 0;

    }

    onShow() {

        // help text and button
        this.helpString = 'Welcome to the 13th century, a time when magnificent cathedrals adorn the skyline of every major city, except yours.\n\n' +
            'You\'ve been appointed as the CATHEDRAL MASTER BUILDER by the bishop to complete the construction of the cathedral before the century\'s end.\n\n' +
            'The bishop provides money for your project. Visit the TOWN to recruit skilled workers for your BAKERY, BLACKSMITH, and MASONRY. ' +
            'Procure iron and stone from the MARKET.\n' +
            'For detailed guidance and information, explore each location.'

        this.helpButton = Text({
            x: gameOptions.gameWidth * 0.96,
            y: gameOptions.gameHeight - gameOptions.gameHeight * 0.08,
            text: '❓',
            ...myFonts[6],
            anchor: {x: 0.5, y: 0.5},
            onDown: () => {
                emit('showHelp');
            }
        });

        track(this.helpButton);

        // year
        this.year = Text({text: '1213', ...myFonts[0], x: gameOptions.gameWidth * 0.55, y: gameOptions.gameHeight * 0.1});

        // year progress
        this.yearProgress = new YearProgress(this.year.x - this.year.width / 2, this.year.y + gameOptions.gameHeight * 0.05, this.year.width);

        // resources text
        this.resourcesText = Grid({
            x: gameOptions.gameWidth * 0.01,
            y: gameOptions.gameWidth * 0.01,
            rowGap: gameOptions.gameHeight * 0.02,
            colGap: 0,
            numCols: 2,
            flow: 'grid',
            children: [
                Text({text: '🪙: ', ...myFonts[2]}),
                Text({text: '0', ...myFonts[2]}),
                Text({text: '🧲: ', ...myFonts[2]}),
                Text({text: '0', ...myFonts[2]}),
                Text({text: '🪨: ', ...myFonts[2]}),
                Text({text: '0', ...myFonts[2]}),
                Text({text: '🥖: ', ...myFonts[2]}),
                Text({text: '0', ...myFonts[2]}),
                Text({text: '⚒️: ', ...myFonts[2]}),
                Text({text: '0', ...myFonts[2]})
                ]
        });

        // places
        this.places.push(new Place(0.05, 0.55, 'Market', '🧺', 3, 'Market',
            [false, false, false, false, false, false], this.resources, helpTexts[0]));
        this.places.push(new Place(0.05, 0.85, 'Town', '🏘️', 3, 'Town',
            [false, false, false, false, false, false], this.resources, helpTexts[1]));
        this.places.push(new Place(0.25, 0.75, 'Bishop', '✝️', 3, 'Bishop',
            [true, false, false, false, false, false], this.resources, helpTexts[2]));
        this.places.push(new Place(0.37, 0.35, 'Bakery', '🥖', 3, 'Workshop',
            [true, false, false, true, false, false], this.resources, helpTexts[3]));
        this.places.push(new Place(0.73, 0.35, 'Blacksmith', '⚒️', 3, 'Workshop',
            [true, true, false, true, true, false], this.resources, helpTexts[4]));
        this.places.push(new Place(0.85, 0.75, 'Masonry', '🪨', 3, 'Workshop',
            [true, false, true, true, true, true], this.resources, helpTexts[5]));
        this.cathedral = new Place(0.55, 0.63, 'Cathedral', '⛪', 4, 'Cathedral',
            [false, false, false, false, false, false], this.resources, '');

        // progress
        this.progressText = Text({text: '0 / 10000', ...myFonts[1], color: 'white', x: gameOptions.gameWidth * 0.55, y: gameOptions.gameHeight * 0.90});

        // initialize inside place
        this.insidePlace = new InsidePlace(this.places[1]);

        // initialize popup
        this.popup = new Popup();

        // add elements to scene
        this.add([this.year, this.yearProgress, this.resourcesText, this.cathedral.compo, this.progressText, this.helpButton]);

        for (let p of this.places) {        // add all places
            this.add(p.compo);
        }

        this.add([this.insidePlace, this.popup]);   // need to be added at the end to ensure it is on top

        // Event when clicking on any of the places
        on('clickPlace', (place: Place) => {

            if (!this.insidePlace.visible && !this.popup.visible) {
                this.insidePlace.show(place, Number(this.year.text));
            }

        });

        // Event when the hire or fire button is pressed
        on('hireFire', (tilePosition: number) => {
           this.hireFire(tilePosition);
        });

        // buying resources
        on('buy', (type: number, amount: number) => {
            this.buyResources(type, amount);
        });

        // show help
        on('showHelp', (place?: Place) => {
            this.showHelp(place);
        });

        // event when the popup "OK" is clicked (for actions when the game is started or finished
        on('popupClick', () => {

            if (this.gameState == -1) {     // if game is not running yet, start it when the ok is clicked on the popup (when the final message is shown
                this.gameState = 0;
                this.newYearTime = Date.now();
                this.lastTickTime = Date.now();         // set the last tick time to now so that it starts from the beginning
            }
            else if (this.gameState == 1) {     // restart the scene when the game is finished and someone clicked on the popup ok (when the final message is shown)
                this.restartGame();
            }

        });

        // tick system setup
        this.tickLength = Math.round(gameOptions.yearLength * 1000 / this.places.length);           // calculate tick length

        // trigger the restart to set everything up
        this.restartGame();

    }

    update() {
        super.update();

        // update the place
        for (let p of this.places) {        // add all places
            p.update();
        }

        if (this.gameState == 0) {

            // update the year progress bar
            this.yearProgress.setBar((Date.now() - this.newYearTime) / (gameOptions.yearLength * 1000));

            // let the emoji flicker of the place which is currently working
            this.places[this.nextTick].image.scaleX = 1 - Math.cos(Date.now() / 100) * 0.05;
            this.places[this.nextTick].image.scaleY = 1 - Math.cos(Date.now() / 100) * 0.05;

            // tick system
            if (Date.now() - this.lastTickTime > this.tickLength) {         // check if the next tick is due and execute it

                this.lastTickTime = Date.now();                 // set the last tick time to now
                this.places[this.nextTick].tick(Number(this.year.text));              // execute the tick on the place
                this.nextTick++;                                // increase the tick counter

                if (this.nextTick >= this.places.length) {

                    this.nextTick = 0;                                              // set the tick counter to 0
                    this.year.text = String(Number(this.year.text) + 1);      // increase the year
                    this.newYearTime = Date.now();                                    // set the new year timer (for the year progress bar) to now

                }

            }

        }


        // update resources text (not for the cathedral!)
        for (let i = 0; i < this.resources.length - 1; i++) {
            this.resourcesText.children[i*2 + 1].text = String(this.resources[i]);
        }

        // check if the game was finished
        if (this.resources[5] >= 10 && Number(this.year.text) <= 1300) {        // TODO change back to 10000

            this.gameState = 1;

            this.popup.show('Congratulations!\n\nYou\'ve completed the cathedral before the 13th century\'s close (' + this.year.text +  '), restoring your city\'s glory and earning the bishop\'s pride!\n\nPlay again?');

        }
        else if (this.resources[5] >= 10000) {

            this.gameState = 1;

            this.popup.show('The cathedral is finally completed, but alas, it\'s a bit too late (' + this.year.text +  ').\n\nThe 13th century has already come to an end, and other cities have stolen the spotlight with their faster progress.\n\n Play again?');

        }

        // update the cathedral progress
        this.progressText.text = String(this.resources[5]) + ' / 10000';

    }

    render() {
        super.render();

    }

    restartGame() {

        // set the initial game state
        this.gameState = -1;                // -1: Starting, 0: Running, 1: End

        // set the year back to 1213
        this.year.text = '1213';

        // initialize resources
        for (let i = 0; i < this.resources.length; i++) {
            this.resources[i] = 0;
        }

        // initialize the places
        for (let i = 0; i < this.places.length; i++) {

            this.places[i].reset();

        }

        // setup the tick system
        this.nextTick = 0;                                                                             // set the next tick to 0

        // show the initial popup
        this.popup.show(this.helpString);

    }

    // action when the hire or fire button is pressed
    hireFire(tilePosition: number) {

        let placeClicked = this.insidePlace.place;

        if (placeClicked.name == 'Town') {

            let destinationPlace: Place;

            // define which type of worker it was
            switch (this.places[1].workers[tilePosition].job) {
                case 'baker':
                    destinationPlace = this.places[3];              // add to bakery
                    break;
                case 'smith':
                    destinationPlace = this.places[4];              // add to blacksmith
                    break;
                default:
                    destinationPlace = this.places[5];              // add to masonry
            }

            // add worker to the destination
            let emptyPosition = destinationPlace.nextEmptyWorkerSpot();

            if (emptyPosition == -1) {
                this.popup.show('You have already 5 workers in the ' + destinationPlace.name);
            }
            else {
                destinationPlace.workers[destinationPlace.nextEmptyWorkerSpot()] = placeClicked.workers[tilePosition];
                placeClicked.workers[tilePosition] = new Worker('empty');       // remove worker from the place
            }
        }
        else {                                                                  // fire worker
            placeClicked.workers[tilePosition] = new Worker('empty');       // remove worker from the place
        }

    }

    buyResources(type: number, amount: number) {

        let price = this.places[0].prices[type - 1] * amount / 10;

        if (price <= this.resources[0]) {

            this.resources[0] = this.resources[0] - price;
            this.resources[type] = this.resources[type] + amount;

        }
        else {

            this.popup.show('Not enough money!');

        }

    }

    showHelp(place?: Place) {

        let helpString = '';

        if (typeof place !== 'undefined') {                           // help from a place was clicked
            helpString = place.helpString;
        }
        else {
            helpString = this.helpString;
        }

        this.popup.show(helpString);

    }

}