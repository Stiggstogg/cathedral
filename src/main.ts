// imports
import './style.css'
import {
    GameLoop,
    init,
    initPointer
} from 'kontra';

// imports: images

// import sprite instances
import SceneManager from "./scenes/sceneManager.ts";
import LoadingScene from "./scenes/loadingScene.ts";
import MenuScene from "./scenes/menuScene.ts";
import GameScene from "./scenes/gameScene.ts";
import WinScene from "./scenes/winScene.ts";

// initialize kontra
init();
initPointer();

// create scenes
const loadingScene = new LoadingScene('loading');
const menuScene = new MenuScene('menu');
const gameScene = new GameScene('game');
const winScene = new WinScene('win');

// create scene manager
let sceneManager = new SceneManager();
sceneManager.init([loadingScene, menuScene, gameScene, winScene]);

// game loop
let loop = GameLoop({

    // update
    update: function(): void {

        sceneManager.currentScene.update();

    },

    // render
    render: function(): void {

        sceneManager.currentScene.render();

    }

});

// start loop
loop.start();

// exports
export {sceneManager};