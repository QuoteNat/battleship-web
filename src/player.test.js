import { Player, Cpu } from "./player";
test("Player constructor", () => {
  expect(new Player()).not.toBeNull();
});

test("Random move", () => {
  let cpu = new Cpu();
  let move = cpu.doMove();
  expect(move[0]).not.toBeNull();
  expect(move[1]).not.toBeNull();
});
