import { Gameboard, DIRECTIONS } from "./gameboard.js";
let gameboard;
beforeEach(() => {
  gameboard = new Gameboard();
});

test("Place ship", () => {
  let newShip = gameboard.placeShip(2, [1, 1], DIRECTIONS.DOWN);
  expect(newShip).not.toBeNull();
});

describe("Receive attack", () => {
  beforeEach(() => gameboard.placeShip(5, [0, 0], DIRECTIONS.RIGHT));
  test("Receive attack at start", () =>
    expect(gameboard.receiveAttack([0, 0])).toBe(true));
  test("Receive attack in middle", () =>
    expect(gameboard.receiveAttack([1, 0])).toBe(true));
  test("Receive attack after end", () =>
    expect(gameboard.receiveAttack([0, 5])).toBe(false));
  test("Receive attack that misses", () =>
    expect(gameboard.receiveAttack([10, 10])).toBe(false));
});
