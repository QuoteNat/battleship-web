import { DIRECTIONS, Gameboard } from "./gameboard";
function placeRandomShips(gameboard, shipLengths) {
  for (const shipLength of shipLengths) {
    let shipPlaced = false;
    while (!shipPlaced) {
      try {
        gameboard.placeShip(
          shipLength,
          [randInt(gameboard.dimensionX), randInt(gameboard.dimensionY)],
          DIRECTIONS[Object.keys(DIRECTIONS)[randInt(3)]],
        );
        shipPlaced = true;
      } catch {
        shipPlaced = false;
      }
    }
  }
}

export class Player {
  previousMoves = [];
  constructor(shipLengths) {
    this.gameboard = new Gameboard();
    placeRandomShips(this.gameboard, shipLengths);
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
  hasLost() {
    return this.gameboard.allShipsSunk();
  }
  receiveAttack(coordinate) {
    let attackStatus;
    try {
      attackStatus = this.gameboard.receiveAttack(coordinate);
    } catch {
      throw "Can't attack the same position twice.";
    }
    return attackStatus;
  }

  get boardState() {
    return this.gameboard.state;
  }
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}

// Fisher yates implementation
// https://www.geeksforgeeks.org/how-to-shuffle-an-array-using-javascript/
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate random index
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indices i and j
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export class Cpu extends Player {
  moves = [];
  constructor(shipLengths) {
    super(shipLengths).gameboard = new Gameboard();
    // Create a series of random moves for the cpu
    for (let x = 0; x < this.gameboard.dimensionX; x += 1) {
      for (let y = 0; y < this.gameboard.dimensionY; y += 1) {
        this.moves.push([x, y]);
      }
    }
    shuffle(this.moves);
    console.log(shipLengths);
    placeRandomShips(this.gameboard, shipLengths);
  }
  doMove() {
    return this.moves.pop();
  }
}
