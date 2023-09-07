// imports
import {
    GameLoop,
    init,
    initPointer
} from 'kontra';

// import scenes and options
import GameScene from "./scenes/gameScene.ts";
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
const gameScene = new GameScene('game');
gameScene.show();

// game loop
let loop = GameLoop({

    // update
    update: function(): void {

        gameScene.update();

    },

    // render
    render: function(): void {

        gameScene.render();

    }

});

// start loop
loop.start();


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