import Ship from "./ship.js";
import Vector from "./vector.js";
export const DIRECTIONS = Object.freeze({
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
});

function shipHitDetect(shipContainer, coordinate) {
  switch (shipContainer.direction) {
    case DIRECTIONS.UP:
      if (
        coordinate[1] >= shipContainer.coordinate[1] &&
        coordinate[1] <= shipContainer.coordinate[1] + shipContainer.length &&
        coordinate[0] == shipContainer.coordinate[0]
      )
        return true;
      break;
    case DIRECTIONS.DOWN:
      if (
        coordinate[1] <= shipContainer.coordinate[1] &&
        coordinate[1] >=
          shipContainer.coordinate[1] - shipContainer.ship.length &&
        coordinate[0] == shipContainer.coordinate[0]
      )
        return true;
      break;
    case DIRECTIONS.LEFT:
      if (
        coordinate[0] <= shipContainer.coordinate[0] &&
        coordinate[0] >=
          shipContainer.coordinate[0] - shipContainer.ship.length &&
        coordinate[1] == shipContainer.coordinate[1]
      )
        return true;
      break;
    case DIRECTIONS.RIGHT:
      if (
        coordinate[0] >= shipContainer.coordinate[0] &&
        coordinate[0] <=
          shipContainer.coordinate[0] + shipContainer.ship.length &&
        coordinate[1] == shipContainer.coordinate[1]
      )
        return true;
      break;
  }
  return false;
}

export class Gameboard {
  ships = [];
  hits = [];
  /**
   * Places a new ship on the gameboard
   * @param {*} length length of the ship
   * @param {[integer, integer]} coordinate first coordinate of the ship
   * @param {[integer, integer]} direction the direction of the ship, going from coordinate
   * @returns A reference to the placed ship
   */
  placeShip(length, coordinate, direction) {
    let newShip = {
      ship: new Ship(length),
      coordinate: Vector.from(coordinate),
      direction: direction,
    };
    this.ships.push(newShip);
    return newShip;
  }

  receiveAttack(coordinate) {
    for (const shipContainer of this.ships) {
      if (
        shipContainer.coordinate.isEqualTo(coordinate) ||
        shipHitDetect(shipContainer, coordinate)
      ) {
        shipContainer.ship.hit();
        return true;
      }
    }
    return false;
  }
}
