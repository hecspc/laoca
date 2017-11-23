
import { Dice } from './dice';
import Game from './game';
import { Square } from './board';

export default class Player {

    currentPosition: number = 0;
    turnsToWait: number = 0;

    constructor(public id:number, public dice: Dice){

    }
}