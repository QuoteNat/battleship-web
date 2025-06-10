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
  dimensionX = 10;
  dimensionY = 10;
  /**
   * Places a new ship on the gameboard
   * @param {*} length length of the ship
   * @param {[integer, integer]} coordinate first coordinate of the ship
   * @param {DIRECTIONS} direction the direction of the ship, going from coordinate
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

  /**
   * Attempts to place an attack at coordinate
   * @param {[integer, integer]} coordinate Unique attack position
   * @returns True if the attack hits a ship, and false otherwise
   * @throws When coordinate has already received an attack
   */
  receiveAttack(coordinate) {
    for (const hit of this.hits) {
      if (Vector.from(hit).isEqualTo(coordinate))
        throw new Error("Cannot place hits in the same location twice");
    }
    for (const shipContainer of this.ships) {
      if (shipHitDetect(shipContainer, coordinate)) {
        shipContainer.ship.hit();
        this.hits.push(coordinate);
        return true;
      }
    }
    return false;
  }

  /**
   *
   * @returns True if all ships have sunk, false otherwise.
   */
  allShipsSunk() {
    for (const shipContainer of this.ships) {
      if (shipContainer.ship.isSunk() == false) return false;
    }
    return true;
  }
}
