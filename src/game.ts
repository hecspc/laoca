
import Player from './player';
import Board from './board';

export default class Game {
    players: Player[];

    board: Board;
    isFinished: boolean = false;

    numberOfTurns: number;

    constructor(players?: Player[]) {
        this.board = Board.buildOcaBoard();
        this.players = players;
    }

    turn() {
        this.numberOfTurns += 1;
        console.log('-------------------------------------');
        console.log(`      Turn ${this.numberOfTurns}`);
        for (let player of this.players) {
            player.move();
            if (this.board.squares[player.currentPosition] == this.board.winnerSquare) {
                console.log(`Player ${player.id} have won!`);
                this.isFinished = true;
                break;
            }
        }
    }
}