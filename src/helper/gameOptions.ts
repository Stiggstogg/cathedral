export const gameOptions = {

    // tick system parameters
    yearLength: 10,         // length of an in-game year in second

    // game width and height TODO: Should be taken with "getCanvas()" however when I try to take it this way it is not initialized yet
    gameWidth: 0,
    gameHeight: 0,

    // minimum, maximum and variation numbers (where applicable)
    age: [10, 25],
    wage: [10, 30, 5],
    ageBishop: [20, 30],

    productionMatrix: [
        [0, 0, 0],          // 0: money consumption (not used, will be calculated based on wage)
        [425, 525, 30],     // 1: money production (bishop)
        [-15, -5, 3],       // 2: iron consumption (smith)
        [0, 0, 0],          // 3: iron production (not used!)
        [-20, -10, 3],      // 4: stone consumption (mason)
        [0, 0, 0],          // 5: stone production (not used!)
        [-15, -5, 3],       // 6: bread consumption (smith, mason)
        [10, 30, 5],        // 7: bread production (baker)
        [-10, -4, 3],       // 8: tool consumption (mason)
        [4, 10, 3],        // 9: tool production (smith)
        [0, 0, 0],          // 10: cathedral consumption (not used!)
        [30, 50, 10],        // 11: cathedral production (mason)
    ],

    reputationMatrix: [
        ['', ''],                       // 0: money consumption (not used!)
        ['', ''],                       // 1: money production (no used)
        ['🟠Inefficient', '🟢Efficient'],   // 2: iron consumption (smith)
        ['', ''],                       // 3: iron production (not used!)
        ['🟠Inefficient', '🟢Efficient'],   // 4: stone consumption (mason)
        ['', ''],                       // 5: stone production (not used!)
        ['🟠Hungry', '🟢Small Appetite'],   // 6: bread consumption (smith, mason)
        ['🟠Lazy', '🟢Hard working'],       // 7: bread production (baker)
        ['🟠Inefficient', '🟢Efficient'],   // 8: tool consumption (mason)
        ['🟠Lazy', '🟢Hard working'],       // 9: tool production (smith)
        ['', ''],                       // 10: cathedral consumption (not used!)
        ['🟠Lazy', '🟢Hard working'],       // 11: cathedral production (mason)
    ],

    marketPriceMatrix: [
        [15, 25],                       // 0: price for 10 iron
        [5, 15]                         // 1: price for 10 stone
    ],

    averageLifeExpectancy: 40,          // center of the sigmoid curve ( 1 / ( 1+e^((-x + averageLifeExpectancy) / curveWidthLifeExpectancy)) ) )
    curveWidthLifeExpectancy: 1.5,        // width of the sigmoid curve

    workerLeaveChance: 0.25,            // chance that a worker leaves the town
    newWorkerChance: 0.25,               // chance that the last two spots are filled

    resourceMissingText: [
        'money',             // 0: not enough money
        'iron',              // 1: not enough iron
        'stone',             // 2: not enough stone
        'bread',             // 3: not enough bread
        'tools'             // 4: not enough tools
    ],

    indicatorFadeTime: 5,               // time until the production indicator fades (in s)
    indicatorYMoveSpeed: 0.05,          // speed of the movement of the indicator (in game heights per s)
    indicatorXMoveSpeed: 0.02,           // speed of the movement of the indicator (in game widths per s)
    indicatorMaxXMovement: 0.01,         // maximum x movement (on both sides) of the indicator (in game widths)

    fontTitlePictures: {
        font: '80px Arial',
        color: 'white',
        anchor: {x: 0.5, y: 0.5},
        textAlign: 'center'
    },

    fontButtonProgress: {
        font: '48px Arial',
        color: 'White',
        anchor: {x: 0.5, y: 0.5},
        textAlign: 'center'
    },

    fontYearbook: {
        font: '20px Arial',
        color: 'black'
    },

    fontSubtitles: {
        font: '32px Arial',
        color: 'white',
        textAlign: 'center'
    }

}