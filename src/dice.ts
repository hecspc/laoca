

export interface Dice {
    roll(): number;
    readonly type: string;
}

export class RandomDice implements Dice {
    private _sides: number;

    constructor(sides: number) {
        this._sides = sides;
    }

    get sides(): number {
        return this._sides;
    }

    roll(): number {
        return Math.floor(Math.random() * this.sides) + 1;
    }

    get type(): string {
        return `d${this.sides}`;
    }
}

export class ConstantDice implements Dice {
    private _steps: number;

    constructor(steps: number){
        this._steps = steps;
    }

    get steps(): number {
        return this._steps;
    }

    roll(): number {
        return this.steps;
    }

    get type(): string {
        return `c${this.steps}`;
    }

}