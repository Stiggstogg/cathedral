// imports
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
import {gameOptions} from "./helper/gameOptions.ts";

// initialize kontra
let {canvas, context: _} = init();
initPointer();

// set game width and height
gameOptions.gameWidth = canvas.width;
gameOptions.gameHeight = canvas.height;

// add event listener for
addEventListener('resize', autoFitCanvas);
autoFitCanvas();

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


// auto fit the canvas to the screen size (maximize horizontally or vertically) without stretching
function autoFitCanvas() {

    let canvasRatio = gameOptions.gameWidth / gameOptions.gameHeight;

    // take the window width and calculate (using the canvas ratio) the resulting canvas width. Check if this width is
    // larger than the window width. If yes, then set the canvas height (in CSS, not the real canvas height)
    if (window.innerWidth / canvasRatio > window.innerHeight) {

        canvas.style.height = String(window.innerHeight) + 'px';
        canvas.style.width = String(window.innerHeight * canvasRatio) + 'px';
    }
    else {

        canvas.style.width = String(window.innerWidth) + 'px';
        canvas.style.height = String(window.innerWidth / canvasRatio) + 'px';

    }

}