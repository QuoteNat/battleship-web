import Gameboard from "./gameboard.js";
let gameboard;
beforeEach(() => { gameboard = new Gameboard(); });

test("Place ship", () => {
    let newShip = gameboard.placeShip(2, [1, 1], [0, -1]);
    expect(newShip).not.toBeNull();
})