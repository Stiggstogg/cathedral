// imports
import {
    Grid,
    on,
    SceneClass,
    Text
} from 'kontra';
import myFonts from "../helper/fonts.ts";
import {gameOptions} from "../helper/gameOptions.ts";
import Place from "../sprites/Place.ts";
import InsidePlace from "../sprites/InsidePlace.ts";

// Game scene: Main game scene
export default class GameScene extends SceneClass {

    private money!: Text;
    private stone!: Text;
    private iron!: Text;
    private bread!: Text;
    private tools!: Text;
    readonly places: Place[];
    private market!: Place;
    private town!: Place;
    private year!: Text;
    private progress!: Text;
    private tickLength!: number;        // length of one tick in ms
    private lastTickTime!: number;      // time when the last tick happened
    private nextTick!: number;           // number of the next tick
    private insidePlace!: InsidePlace;

    constructor(id: string) {

        super({id: id});

        // initialize variables
        this.places = [];

    }

    onShow() {

        // year
        this.year = Text({text: '1213', ...myFonts[0], x: gameOptions.gameWidth * 0.55, y: gameOptions.gameHeight * 0.1});

        // resources bar
        this.money = Text({text: '🪙: 0 FRT', ...myFonts[2]});
        this.stone = Text({text: '🪨: 0 kg', ...myFonts[2]});
        this.iron = Text({text: '🧲: 0 kg', ...myFonts[2]});
        this.bread = Text({text: '🥖: 0 pcs', ...myFonts[2]});
        this.tools = Text({text: '⚒️: 0 pcs', ...myFonts[2]});

        let resources = Grid({
            x: gameOptions.gameWidth * 0.01,
            y: gameOptions.gameWidth * 0.01,
            anchor: {x: 0, y: 0},
            rowGap: gameOptions.gameHeight * 0.02,
            children: [this.money, this.stone, this.iron, this.bread, this.tools]
        })

        // places
        this.places.push(new Place(0.25, 0.75, 'Bishop', '✝️', 3, 'Bishop',
            [true, false, false, false, false]));
        this.places.push(new Place(0.37, 0.35, 'Bakery', '🥖', 3, 'Workshop',
            [true, true, false, false, false]));
        this.places.push(new Place(0.73, 0.35, 'Blacksmith', '⚒️', 3, 'Workshop',
            [true, true, true, false, false]));
        this.places.push(new Place(0.85, 0.75, 'Masonry', '🪨', 3, 'Workshop',
            [true, true, true, true, true]));
        this.places.push(new Place(0.55, 0.63, 'Cathedral', '⛪', 4, 'Cathedral',
            [false, false, false, false, false]));
        this.town = new Place(0.05, 0.85, 'Town', '🏘️', 3, 'Town',
            [false, false, false, false, false]);
        this.market = new Place(0.05, 0.55, 'Market', '🧺', 3, 'Market',
            [false, false, false, false, false]);

        // progress
        this.progress = Text({text: '100 %', ...myFonts[1], x: gameOptions.gameWidth * 0.55, y: gameOptions.gameHeight * 0.90});
        this.progress.color = 'white';

        // initialize inside place
        this.insidePlace = new InsidePlace(this.places[1]);

        // add elements to scene
        this.add([this.year, resources, this.market.compo, this.town.compo, this.progress]);

        for (let p of this.places) {        // add all places
            this.add(p.compo);
        }

        this.add([this.insidePlace]);   // needs to be added at the end to ensure it is on top

        // Event when clicking on any of the workshops
        on('clickPlace', (place: Place) => {
            this.insidePlace.show(place);
        });

        // tick system setup
        this.tickLength = Math.round(gameOptions.yearLength * 1000 / this.places.length);           // calculate tick length
        this.lastTickTime = Date.now() - this.tickLength;                                                  // set the last tick to now - tick length to ensure it starts directly with the first tick
        this.nextTick = 0;                                                                             // set the next tick to 0

    }

    onHide() {

        // TODO: Maybe events need to be turned off!

    }

    update() {
        super.update();

        // tick system

        if (Date.now() - this.lastTickTime > this.tickLength) {         // check if the next tick is due and execute it

            this.lastTickTime = Date.now();                 // set the last tick time to now
            this.places[this.nextTick].tick();              // execute the tick on the place
            this.nextTick++;                                // increase the tick counter

            if (this.nextTick >= this.places.length) {

                this.nextTick = 0;                                              // set the tick counter to 0
                this.year.text = String(Number(this.year.text) + 1);      // increase the year

            }

        }

    }

    render() {
        super.render();

    }

}