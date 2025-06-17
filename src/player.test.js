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
