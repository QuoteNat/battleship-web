import expect from "expect";
import Ship from "./ship";

let testShip;
beforeEach(() => {
  testShip = new Ship(5);
});

test("Ship constructor", () => {
  // let testShip = new Ship(5);
  expect(testShip.length).toBe(5);
});

test("Hit function", () => {
  testShip.hit();
  expect(testShip.hits).toBe(1);
});

test("Is sunk", () => {
  expect(testShip.isSunk()).toBe(false);
  for (let i = 0; i < 5; i++) {
    testShip.hit();
  }
  expect(testShip.isSunk()).toBe(true);
});
