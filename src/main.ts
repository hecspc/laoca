///<reference path="../node_modules/@types/node/index.d.ts"/>
import Game from './game';
import Player from './player';
import { ConstantDice, RandomDice } from './dice';
import { writeFile } from 'fs';

const NUMBER_EPOCHS = 1E6;

console.log('Starting el juego de la oca');

const sides = [1, 2, 4, 6, 8, 10, 12, 20, 100];

const stats = [];
const avgTurns = {}
for (let dP1 = 0; dP1 < sides.length; dP1++){
    const side = sides[dP1];
    const st = {
        sides: side,
        turns: []
    };
    console.log(`Dice with ${side} full sides`);
    const dice = new RandomDice(side);
    let max = 0;
    let modeTurn = 0;
    let avg = 0;
    const results = [];
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
            modeTurn = game.numberOfTurns;
            max = st.turns[game.numberOfTurns];
        }
        avg += game.numberOfTurns;
        results.push(game.numberOfTurns);
    }
    avg /= NUMBER_EPOCHS;
    let std = 0;
    for (let i = 0; i < NUMBER_EPOCHS; i++) {
        std += (results[i] - avg) * (results[i] - avg);
    }
    std /= NUMBER_EPOCHS;
    avgTurns[side] = {
        p: max / NUMBER_EPOCHS,
        mode: modeTurn,
        avg,
        std
    };
    console.log(`${side}, ${avgTurns[side].mode}, ${avgTurns[side].p}, ${avgTurns[side].avg}, ${avgTurns[side].std}\n`);

    stats.push(st);

    let csv = 'turns, p\n';
    for (let i = 1; i < st.turns.length; i++){
        const p = st.turns[i] ? st.turns[i] / NUMBER_EPOCHS : 0;
        csv += `${i}, ${p}\n`
    }

    writeFile(`./stats/${dice.type}.csv`, csv, (err) => {
        if (err) {
            throw(err);
        }
    });
}

let avgTurnsCSV = "sides, mode, pMode, avg, std \n";
for (let row in avgTurns){
    avgTurnsCSV += `${row}, ${avgTurns[row].mode}, ${avgTurns[row].p}, ${avgTurns[row].avg}, ${avgTurns[row].std}\n`;
}
writeFile(`./stats/avgturns.csv`, avgTurnsCSV, (err) => {
    if (err) {
        throw(err);
    }
});


const clashes = [];

for (let dP1 = 0; dP1 < sides.length; dP1++){
    const sideP1 = sides[dP1];
    const diceP1 = new RandomDice(sideP1);
    for (let dP2 = dP1; dP2 < sides.length; dP2++) {
        const sideP2 = sides[dP2];
        const diceP2 = new RandomDice(sideP2);
        const diff = dP1 === dP2 ? '_' : '';
        const clash:any = { };
        clash[diceP1.type] = 0;
        clash[diceP2.type + diff] = 0;
        clash.tie = 0;

        for (let i = 0; i < NUMBER_EPOCHS; i++){
            const player1 = new Player(1, diceP1);
            const player2 = new Player(2, diceP2);
            const game = new Game([player1, player2]);
            game.run();
            if (!game.winner){
                clash.tie += 1;
            }else {
                const type = game.winner.dice.type;
                const label = game.winner.id === 2 ? type + diff: type;
                clash[label] += 1;
            }
        }

        clash.tie /= NUMBER_EPOCHS;
        clash[diceP1.type] /= NUMBER_EPOCHS;
        clash[diceP2.type + diff] /= NUMBER_EPOCHS;
        console.log(clash);
    }
}


// console.log(stats);
