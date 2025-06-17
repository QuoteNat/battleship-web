import { Gameboard } from "./gameboard";
export class Player {
  previousMoves = [];
  constructor() {
    this.gameboard = new Gameboard();
  }
  doMove(position) {
    try {
      this.gameboard.receiveAttack(position);
    } catch {
      return false;
    }
    return true;
  }
  placeShip(position, direction, length) {
    try {
      this.gameboard.placeShip(length, position, direction);
    } catch {
      return false;
    }
    return true;
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
