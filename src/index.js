import { Player, Cpu } from "./player";
import "./template.css";
class Game {
  shipLengths = [5, 4, 3, 3, 2];
  constructor() {
    this.player1 = new Player();
    this.player2 = new Cpu(this.shipLengths);
  }
}

let game = new Game();
