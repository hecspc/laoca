
import Player from './player';
import Board from './board';

export default class Game {
    players: Player[] = [];

    board: Board;
    isFinished: boolean = false;

    numberOfTurns: number = 0;
    winner: Player;

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
        }

        for (let player of this.players) {
            if (player.currentPosition === this.board.winnerSquare.index) {
                this.isFinished = true;
                this.winner = this.winner ? null : player;
            }
        }

    }
}