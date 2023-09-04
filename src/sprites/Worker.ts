import {names, emojiYoung, emojiOld} from "../helper/Data.ts";
import random from "../helper/Random.ts";
import {gameOptions} from "../helper/gameOptions.ts";

export default class Worker {

    public name: string;
    public age: number;
    public wage!: number;
    public emoji!: string;
    public job: string;
    public jobEmoji!: string;
    public readonly production: number[];
    public readonly variation: number[];
    public readonly reputation: string[];

    constructor(job: string) {

        this.job = job;
        if (this.job == 'empty') {
            this.name = 'Empty';
        }
        else {
            this.name = this.getRandom(names);                                      // get a random name
        }

        // get a random age
        if (this.job == 'bishop') {
            this.age = Math.round(random.generateUniform(gameOptions.ageBishop))    // different age for the bishop (cannot be a child)
        }
        else {
            this.age = Math.round(random.generateUniform(gameOptions.age));
        }

        this.setEmoji();                                                        // set face (based on age) and job emoji
        this.jobEmoji = '🥖';

        // setup the base production
        this.production = [0, 0, 0, 0, 0, 0];
        this.variation = [0, 0, 0, 0, 0, 0];
        this.reputation = [];
        this.setValues();

    }

    getRandom(list: string[]) {

        return list[Math.floor(Math.random() * list.length)];

    }

    setEmoji() {

        if (this.age <= 18) {                                                   // get a random emoji
            this.emoji = this.getRandom(emojiYoung);
        }
        else {
            this.emoji =  this.getRandom(emojiOld);
        }

    }

    birthday() {
        this.age = this.age + 1;

        if (this.age == 19) {       // set a new emoji (old guy) when he turns 19
            this.setEmoji();
        }

    }

    dies(): boolean {

        let curveValue = 1 / (1 + Math.exp( (-this.age + gameOptions.averageLifeExpectancy) / gameOptions.curveWidthLifeExpectancy ));  // sigmoide function is used here: (1/(1+e^( (-x + expectancy) / flatness ))

        return Math.random() <= curveValue;                 // return true (worker dies) if the random value is smaller than the curve value and vice versa

    }

    // set the base production values, variations, wage and reputation
    setValues() {

        let profile: number[] = [];

        // set the production / consumption profile (-1: nothing, 0: consumption, 1: production)
        if (this.job == 'baker') {
            profile = [0, -1, -1, 1, -1, -1];
        }
        else if (this.job == 'smith') {
            profile = [0, 0, -1, 0, 1, -1];
            this.jobEmoji = '⚒️';
        }
        else if (this.job == 'mason') {
            profile = [0, -1, 0, 0, 0, 1];
            this.jobEmoji = '🪨';
        }
        else if (this.job == 'bishop') {
            profile = [1, -1, -1, -1, -1, -1];
        }
        else if (this.job == 'empty') {
            profile = [-1, -1, -1, -1, -1, -1];
        }

        // calculate the random production values and the variation (based on profile)
        let wageFactorCounter = 0;
        let wageFactorCounterMax = 0;
        let minMaxVar: number[] = [];     // array with minimum, maximum and variation
        let reputation: string[] = [];      // array with the reputations

        for (let i = 0; i < profile.length; i++) {

            if (profile[i] > -1) {

                wageFactorCounterMax++;
                minMaxVar = gameOptions.productionMatrix[i*2 + profile[i]];
                reputation = gameOptions.reputationMatrix[i*2 + profile[i]];

                this.production[i] = Math.round(random.generateUniform(minMaxVar));     // get random production (based on matrix)
                this.variation[i] = minMaxVar[2];                                       // get variation

                if (this.production[i] > minMaxVar[0] + 0.75 * (minMaxVar[1] - minMaxVar[0])) {     // good production (high) / good consumption (low)
                    this.reputation.push(reputation[1]);

                    wageFactorCounter++;

                }
                else if (this.production[i] < minMaxVar[0] + 0.25 * (minMaxVar[1] - minMaxVar[0])) {     // bad production (low) / bad consumption (high)
                    this.reputation.push(reputation[0]);

                    wageFactorCounter--;

                }

            }

        }

        // calculate wage (if many values are good -> high salary, if many values are bad -> low salary)
        if (this.job != 'empty') {

            let wageFactor = wageFactorCounter/wageFactorCounterMax;
            this.wage = Math.round(
                (gameOptions.wage[0] + gameOptions.wage[1]) / 2
                + wageFactor * (gameOptions.wage[1] - gameOptions.wage[0]) / 2
                + random.generateUniform([-gameOptions.wage[2], gameOptions.wage[2]]));        // calculation: average wage + f * wage range + variation

            if (this.job != 'bishop') {
                this.production[0] = -this.wage;
            }

        }

    }


}