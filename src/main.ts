import Game from './game';


const game = new Game();

while (!game.isFinished) {
    game.turn();
}