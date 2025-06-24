import expect from "expect";
import { Gameboard, DIRECTIONS } from "./gameboard.js";
let gameboard;
beforeEach(() => {
  gameboard = new Gameboard();
});

test("Place ship", () => {
  let newShip = gameboard.placeShip(2, [1, 1], DIRECTIONS.DOWN);
  expect(newShip).not.toBeNull();
});

test("Don't let new ships intersect old ships", () => {
  gameboard.placeShip(2, [1, 1], DIRECTIONS.DOWN);

  expect(() => gameboard.placeShip(2, [1, 1], DIRECTIONS.UP)).toThrow(Error);
  expect(() => gameboard.placeShip(2, [1, 2], DIRECTIONS.UP)).toThrow(Error);
  expect(() => gameboard.placeShip(2, [1, 3], DIRECTIONS.UP)).toThrow(Error);
});

test("Don't let ships be placed out of bounds", () => {
  expect(() => gameboard.placeShip(2, [-1, -1], DIRECTIONS.UP)).toThrow(Error);
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

describe("Attack tracking", () => {
  beforeEach(() => {
    gameboard.placeShip(1, [0, 0], DIRECTIONS.RIGHT);
    gameboard.receiveAttack([0, 0]);
  });

  test("Attacking in same position twice should throw an error", () => {
    expect(() => gameboard.receiveAttack([0, 0])).toThrow();
  });

  test("Track whether all ships are sunk or not", () =>
    expect(gameboard.allShipsSunk()).toBe(true));
});
