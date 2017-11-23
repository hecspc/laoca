
import Player from './player';
import Board from './board';

export default class Game {
    players: Player[] = [];

    board: Board;
    isFinished: boolean = false;

    numberOfTurns: number = 0;

    constructor(players?: Player[]) {
        this.board = Board.buildOcaBoard();
        if (players) {
            this.players = players;
        }
    }

    run() {
        while (!this.isFinished) {
            this.turn();
        }
    }

    turn() {
        if (this.players.length === 0){
            throw new Error('No players defined!');
        }
        this.numberOfTurns += 1;
        // console.log('-------------------------------------');
        // console.log(`      Turn ${this.numberOfTurns}`);
        for (let player of this.players) {
            this.board.move(player);
            if (this.board.squares[player.currentPosition] == this.board.winnerSquare) {
                // console.log(`Player ${player.id} have won!`);
                this.isFinished = true;
                break;
            }
        }
    }
}