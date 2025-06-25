import expect from "expect";
import { DIRECTIONS } from "./gameboard";
import { Player, Cpu } from "./player";
const shipLengths = [];

test("Player constructor", () => {
  expect(new Player(shipLengths)).not.toBeNull();
});

test("CPU move", () => {
  let cpu = new Cpu([1]);
  let move = cpu.doMove();
  expect(move[0]).not.toBeNull();
  expect(move[1]).not.toBeNull();
});

test("Player move", () => {
  let player = new Player(shipLengths);
  expect(player.doMove([1, 1])).toBe(true);
  expect(player.doMove([1, 1])).toBe(false);
});

test("Place ship", () => {
  let player = new Player(shipLengths);
  expect(player.placeShip([1, 1], DIRECTIONS.DOWN, 2)).toBe(true);
});

test("Can't place ship out of bounds", () => {
  let player = new Player(shipLengths);
  expect(player.placeShip([-1, -1], DIRECTIONS.DOWN, 2)).toBe(false);
});

test("Can't place a ship inside another ship", () => {
  let player = new Player(shipLengths);
  player.placeShip([1, 1], DIRECTIONS.DOWN, 2);
  expect(player.placeShip([1, 1], DIRECTIONS.DOWN, 2)).toBe(false);
});

test("Player can tell whether it has lost or not", () => {
  let player = new Player(shipLengths);
  player.placeShip([1, 1], DIRECTIONS.DOWN, 1);
  expect(player.hasLost()).toBe(false);
  player.receiveAttack([1, 1]);
  expect(player.hasLost()).toBe(true);
});
