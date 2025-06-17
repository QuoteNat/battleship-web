import { DIRECTIONS } from "./gameboard";
import { Player, Cpu } from "./player";
test("Player constructor", () => {
  expect(new Player()).not.toBeNull();
});

test("CPU move", () => {
  let cpu = new Cpu();
  let move = cpu.doMove();
  expect(move[0]).not.toBeNull();
  expect(move[1]).not.toBeNull();
});

test("Player move", () => {
  let player = new Player();
  expect(player.doMove([1, 1])).toBe(true);
  expect(player.doMove([1, 1])).toBe(false);
});

test("Place ship", () => {
  let player = new Player();
  expect(player.placeShip([1, 1], DIRECTIONS.DOWN, 2)).toBe(true);
});

test("Can't place ship out of bounds", () => {
  let player = new Player();
  expect(player.placeShip([-1, -1], DIRECTIONS.DOWN, 2)).toBe(false);
});

test("Can't place a ship inside another ship", () => {
  let player = new Player();
  player.placeShip([1, 1], DIRECTIONS.DOWN, 2);
  expect(player.placeShip([1, 1], DIRECTIONS.DOWN, 2)).toBe(false);
});
