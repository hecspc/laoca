
import Player from './player';

export class Square {

    index: number;
    jumpTo: number = 0;
    turns: number = 0;
    rollsAgain: boolean = false;

    get type():string {
        return this.constructor['name'];
    }

    toString(): string{
        return `${this.type} index: ${this.index} jumpTo: ${this.jumpTo} turns: ${this.turns} rollsAgain: ${this.rollsAgain}`;
    }
}

export class OcaSquare extends Square {
    constructor(jumpTo: number){
        super();
        this.jumpTo = jumpTo;
        this.rollsAgain = true;
    }
}

export class BridgeSquare extends Square {
    constructor(jumpTo: number){
        super();
        this.jumpTo = jumpTo;
        this.rollsAgain = true;
    }
}

export class DiceSquare extends Square {
    constructor(jumpTo: number){
        super();
        this.jumpTo = jumpTo;
        this.rollsAgain = true;
    }
}

export class TavernSquare extends Square {
    constructor(){
        super();
        this.turns = 2;
    }
}

export class LaberynthSquare extends Square {
    constructor(){
        super();
        this.jumpTo = 30;
        this.rollsAgain = false;
    }
}

export class JailSquare extends Square {
    constructor(){
        super();
        this.turns = 3;
    }
}

export class DeathSquare extends Square {
    constructor(){
        super();
        this.jumpTo = 0;
    }
}



export default class Board {

    public squares: Square[];

    constructor(){
        this.squares = [];
    }

    get winnerSquare(): Square {
        return this.squares[this.squares.length - 1];
    }


    move(player: Player) {
        if (player.turnsToWait > 0) {
            player.turnsToWait =- 1;
            return;
        }
        const fwd = player.dice.roll();
        // console.log(`Player ${player.id} rolls a ${fwd} with a ${player.dice.type} `)
        let nextPosition = player.currentPosition + fwd;
        const numSquares = this.squares.length - 1;
        if (nextPosition > numSquares) {
            const diff = nextPosition - numSquares;
            nextPosition = numSquares - diff;
        }
        const nextSquare = this.squares[nextPosition];
        // console.log(`        to square ${nextSquare.index} ${nextSquare.type}`);
        player.turnsToWait += nextSquare.turns;
        player.currentPosition = nextSquare.jumpTo;
        // if (nextSquare.jumpTo !== nextSquare.index ) {
        //     console.log(`        jumps to ${nextSquare.jumpTo}`);
        // }
        if (nextSquare.rollsAgain) {
            // console.log(`                 rolls again`);
            this.move(player);
        }
    }

    public static buildOcaBoard(): Board {
        const board = new Board();
        const numSquares = 63;
        for (let i = 0; i <= numSquares; i++){
            const square = new Square();
            square.index = i;
            square.jumpTo = i;
            board.squares.push(square);
        }
        let pos = 59;
        let jump = 5;
        const numOcaSquares = 13;
        let lastOcaIndex = 63;
        for (let i = 0; i < numOcaSquares; i++ ){
            const square = new OcaSquare(lastOcaIndex);
            square.index = pos;
            lastOcaIndex = pos;
            pos -= jump;
            jump = jump === 5 ? 4 : 5;
            board.squares[square.index] = square;
        }

        let bridge = new BridgeSquare(12);
        bridge.index = 6;
        board.squares[bridge.index] = bridge;
        bridge = new BridgeSquare(6);
        bridge.index = 12;
        board.squares[bridge.index] = bridge;

        const tavern = new TavernSquare();
        tavern.index = 19;
        board.squares[tavern.index] = tavern;

        let dice = new DiceSquare(53);
        dice.index = 26;
        board.squares[dice.index] = dice;
        dice = new DiceSquare(26);
        dice.index = 53;
        board.squares[dice.index] = dice;

        const laberynth = new LaberynthSquare();
        laberynth.index = 42;
        board.squares[laberynth.index] = laberynth;

        const jail = new JailSquare();
        jail.index = 52;
        board.squares[jail.index] = jail;

        const death = new DeathSquare();
        death.index = 58;
        board.squares[death.index] = death;

        // for (let square of board.squares){
        //     console.log(square.toString());
        // }

        return board;
    }
}