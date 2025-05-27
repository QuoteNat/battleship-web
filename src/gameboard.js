import Ship from "./ship.js"

class Gameboard {
    ships = [];
    hits = [];

    /**
     * Places a new ship on the gameboard
     * @param {*} length length of the ship
     * @param {*} coordinate first coordinate of the ship
     * @param {*} direction the direction of the ship
     * @returns A reference to the placed ship
     */
    placeShip(length, coordinate, direction) {
        let newShip = {
            ship: new Ship(length),
            coordinate: coordinate,
            direction: direction
        };
        this.ships.push(newShip);
        return newShip;
    }
}

export default Gameboard;