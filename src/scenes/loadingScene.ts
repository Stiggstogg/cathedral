// imports
import {
    SceneClass,
    //load
} from 'kontra';
import {sceneManager} from '../main.ts';

// Loading Scene: Loads all assets
export default class LoadingScene extends SceneClass {

    constructor(id: string) {

        super({id: id});

    }

    onShow() {

        // load assets
        /*load(catImg, gunImg).then( function(): void {

            sceneManager.start('game');         // start the next scene as soon as the assets are loaded

        });*/

        sceneManager.start('menu');     // nothing to load yet, remove this code when something needs to be loaded and use the code above

    }

}