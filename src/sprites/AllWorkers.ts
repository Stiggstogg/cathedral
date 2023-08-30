import {
    SpriteClass
} from 'kontra'
import {gameOptions} from "../helper/gameOptions.ts";
import WorkerTile from "./WorkerTile.ts";

export default class AllWorkers extends SpriteClass {

    private workers: WorkerTile[];

    constructor() {

        super({x: 0,
            y: 0,
            width: 0,
            height: 0
        });             // create the background (parent sprite)

        // initialize variables


        // parameters
        let workerX = gameOptions.gameWidth * 0.01;

        // create separate worker tiles and place them
        this.workers = [];

        this.workers.push(new WorkerTile(workerX));     // create first worker at proper position

        let workerDistance = this.workers[0].width + gameOptions.gameWidth * 0.01;

        for (let i = 1; i < 5; i++) {

            this.workers.push(new WorkerTile(this.workers[i-1].x + workerDistance));

        }

        // add all childern (barebone of the book without lines and text) to the sprite
        this.addChild(this.workers);

    }


}
