export const gameOptions = {

    // tick system parameters
    yearLength: 10,         // length of an in-game year in second

    // game width and height TODO: Should be taken with "getCanvas()" however when I try to take it this way it is not initialized yet
    gameWidth: 0,
    gameHeight: 0,

    // minimum, maximum and variation numbers (where applicable)
    age: [10, 40],
    wage: [10, 30, 5],
    ageBishop: [20, 30],

    productionMatrix: [
        [0, 0, 0],          // 0: money consumption (not used, will be calculated based on wage)
        [20, 50, 5],        // 1: money production (bishop)
        [-10, -5, 3],       // 2: iron consumption (smith)
        [0, 0, 0],          // 3: iron production (not used!)
        [-10, -5, 3],       // 4: stone consumption (mason)
        [0, 0, 0],          // 5: stone production (not used!)
        [-10, -5, 3],       // 6: bread consumption (smith, mason)
        [20, 35, 5],        // 7: bread production (baker)
        [-10, -5, 3],        // 8: tool consumption (mason)
        [20, 35, 5],       // 9: tool production (smith)
        [0, 0, 0],          // 10: cathedral consumption (not used!)
        [5, 55, 7],         // 11: cathedral production (mason)
    ],

    reputationMatrix: [
        ['', ''],                       // 0: money consumption (not used!)
        ['', ''],                       // 1: money production (no used)
        ['Inefficient', 'Efficient'],   // 2: iron consumption (smith)
        ['', ''],                       // 3: iron production (not used!)
        ['Inefficient', 'Efficient'],   // 4: stone consumption (mason)
        ['', ''],                       // 5: stone production (not used!)
        ['Hungry', 'Small Appetite'],   // 6: bread consumption (smith, mason)
        ['Lazy', 'Hard working'],       // 7: bread production (baker)
        ['Inefficient', 'Efficient'],   // 8: tool consumption (mason)
        ['Lazy', 'Hard working'],       // 9: tool production (smith)
        ['', ''],                       // 10: cathedral consumption (not used!)
        ['Lazy', 'Hard working'],       // 11: cathedral production (mason)
    ],

    averageLifeExpectancy: 35,          // center of the sigmoid curve (1/(1+e^(-x))
    curveWidthLifeExpectancy: 5,        // width of the sigmoid curve

    workerLeaveChance: 0.25,            // chance that a worker leaves the town
    newWorkerChance: 0.25,               // chance that the last two spots are filled

}