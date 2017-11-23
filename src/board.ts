
import Player from './player';

export class Square {

    index: number;
    jumpTo: number = 0;
    turns: number = 0;
    rollsAgain: boolean = false;

    toString(): string{
        return `${typeof this} index: ${this.index} jumpTo: ${this.jumpTo} turns: ${this.turns} rollsAgain: ${this.rollsAgain}`;
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
    constructor(jumpTo: number){
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
        const nextPosition = player.currentPosition + fwd;
        const nextSquare = this.squares[nextPosition];
        player.turnsToWait += nextSquare.turns;
        player.currentPosition = nextSquare.jumpTo;
        if (nextSquare.rollsAgain) {
            this.move(player);
        }
    }

    public static buildOcaBoard(): Board {
        const board = new Board();
        const numSquares = 63;
        for (let i = 0; i < numSquares; i++){
            const square = new Square();
            square.index = i;
            square.jumpTo = i;
            board.squares.push(square);
        }
        let pos = 59;
        let jump = 5;
        const numOcaSquares = 14;
        let lastOcaIndex = 63;
        for (let i = 0; i < numOcaSquares; i++ ){
            const square = new OcaSquare(lastOcaIndex);
            square.index = pos;
            lastOcaIndex = pos;
            pos -= jump;
            jump = jump === 5 ? 4 : 5;
            board.squares[square.index] = square;
            console.log(square.toString());
        }

        return board;
    }
}