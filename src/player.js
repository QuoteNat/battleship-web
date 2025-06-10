import { Gameboard } from "./gameboard";

export class Player {
  previousMoves = [];
  constructor() {
    this.gameboard = new Gameboard();
  }
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}

export class Cpu extends Player {
  doMove() {
    let x = randInt(10);
    let y = randInt(10);
    this.gameboard.receiveAttack([x, y]);
    return [x, y];
  }
}
