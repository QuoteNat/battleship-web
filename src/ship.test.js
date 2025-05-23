import Ship from "./ship";

test("Ship constructor", () => {
    let testShip = new Ship(5);
    expect(testShip.length).toBe(5);
});