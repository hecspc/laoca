///<reference path="../node_modules/@types/node/index.d.ts"/>
import Game from './game';
import Player from './player';
import { ConstantDice, RandomDice } from './dice';
import { writeFile } from 'fs';

const NUMBER_EPOCHS = 100000; //1E6;

console.log('Starting el juego de la oca');

const sides = [1, 2, 4, 6, 8, 10, 12, 20];

const clashes = [];

for (let dP1 = 1; dP1 < 11; dP1++){
    const sideP1 = sides[dP1];
    const diceP1 = new ConstantDice(dP1);
    for (let dP2 = 0; dP2 < sides.length; dP2++) {
        const sideP2 = sides[dP2];
        const diceP2 = new RandomDice(sideP2);
        const diff = dP1 === dP2 ? '' : '';
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

/*
const stats = [];
const avgTurns = {}
for (let sides = 10; sides <= 10; sides ++){
    const st = {
        sides: sides,
        turns: {

        }
    };
    console.log(`Dice with ${sides} full sides`);
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
*/