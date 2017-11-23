

export interface Dice {
    roll(): number;
}

export class RandomDice implements Dice {
    private _sides: number;

    constructor(sides: number) {
        this._sides = sides;
    }

    public get sides(): number {
        return this._sides;
    }

    public roll(): number {
        return Math.floor(Math.random() * this.sides) + 1;
    }
}

export class ConstantDice implements Dice {
    private _steps: number;

    constructor(steps: number){
        this._steps = steps;
    }

    public get steps(): number {
        return this._steps;
    }

    public roll(): number {
        return this.steps;
    }

}