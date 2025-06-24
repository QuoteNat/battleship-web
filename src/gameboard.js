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

export function getShipCoordinates(shipContainer) {
  let coordinates = [];
  switch (shipContainer.direction) {
    case DIRECTIONS.UP:
      for (
        let i = shipContainer.coordinate[1];
        i > shipContainer.coordinate[1] - shipContainer.ship.length;
        i -= 1
      ) {
        coordinates.push([shipContainer.coordinate[0], i]);
      }
      break;
    case DIRECTIONS.DOWN:
      for (
        let i = shipContainer.coordinate[1];
        i < shipContainer.coordinate[1] + shipContainer.ship.length;
        i += 1
      ) {
        coordinates.push([shipContainer.coordinate[0], i]);
      }
      break;
    case DIRECTIONS.LEFT:
      for (
        let i = shipContainer.coordinate.x;
        i > shipContainer.coordinate.x - shipContainer.ship.length;
        i -= 1
      ) {
        coordinates.push([i, shipContainer.coordinate.y]);
      }
      break;
    case DIRECTIONS.RIGHT:
      for (
        let i = shipContainer.coordinate.y;
        i < shipContainer.coordinate.y + shipContainer.ship.length;
        i += 1
      ) {
        coordinates.push([i, shipContainer.coordinate.y]);
      }
      break;
  }
  return coordinates;
}

export class Gameboard {
  ships = [];
  hits = [];
  // TODO: Set board dimensions via the constructor
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
    let coordinates = getShipCoordinates(newShip);
    for (const coordinate of coordinates) {
      if (
        coordinate[0] >= this.dimensionX ||
        coordinate[0] < 0 ||
        coordinate[1] >= this.dimensionY ||
        coordinate[1] < 0
      )
        throw new Error("Can't place ship out of bounds");
    }
    for (const ship of this.ships) {
      for (const coordinate of coordinates) {
        if (shipHitDetect(ship, coordinate)) {
          throw new Error("Can't place ship intersecting existing ship");
        }
      }
    }
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
    this.hits.push(coordinate);
    for (const shipContainer of this.ships) {
      if (shipHitDetect(shipContainer, coordinate)) {
        shipContainer.ship.hit();
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

  get state() {
    let shipCoordinates = [];
    for (const shipContainer of this.ships) {
      shipCoordinates = shipCoordinates.concat(
        getShipCoordinates(shipContainer),
      );
    }
    console.log(shipCoordinates);
    return {
      hits: this.hits,
      shipCoordinates: shipCoordinates,
      width: this.dimensionX,
      height: this.dimensionY,
    };
  }
}
