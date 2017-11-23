///<reference path="../node_modules/@types/node/index.d.ts"/>
import Game from './game';
import Player from './player';
import { RandomDice } from './dice';
import { writeFile } from 'fs';

const NUMBER_EPOCHS = 1E6;

console.log('Starting el juego de la oca');

const stats = [];
const avgTurns = {}
for (let sides = 1; sides <= 50; sides ++){
    const st = {
        sides: sides,
        turns: {

        }
    };
    console.log(`Dice with ${sides} sides`);
    const dice = new RandomDice(sides);
    let max = 0;
    let avgTurn = 0;
    for (let i = 0; i < NUMBER_EPOCHS; i++) {
        const player = new Player(1, dice);
        const game = new Game([player]);
        game.run();
        if (st.turns[game.numberOfTurns]) {
            st.turns[game.numberOfTurns] += 1;
        } else {
            st.turns[game.numberOfTurns] = 1;
        }
        if (st.turns[game.numberOfTurns] > max ){
            avgTurn = game.numberOfTurns;
            max = st.turns[game.numberOfTurns];
        }

    }
    avgTurns[sides] = {
        p: max / NUMBER_EPOCHS,
        turn: avgTurn
    };
    console.log(`${sides}, ${avgTurns[sides].turn}, ${avgTurns[sides].p}\n`)

    stats.push(st);
    console.log(st);
    let csv = 'turns, p\n';
    for (let row in st.turns){
        csv += `${row}, ${st.turns[row] / NUMBER_EPOCHS}\n`
    }

    writeFile(`./stats/${dice.type}.csv`, csv, (err) => {
        if (err) {
            throw(err);
        }
    });
}

let avgTurnsCSV = "sides, turns, p\n";
for (let row in avgTurns){
    avgTurnsCSV += `${row}, ${avgTurns[row].turn}, ${avgTurns[row].p}\n`
}
writeFile(`./stats/avgturns.csv`, avgTurnsCSV, (err) => {
    if (err) {
        throw(err);
    }
});

// console.log(stats);