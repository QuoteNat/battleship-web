import { Player, Cpu } from "./player";
import "./template.css";
class Game {
  shipLengths = [5, 4, 3, 3, 2];
  constructor() {
    this.player1 = new Player();
    this.player2 = new Cpu(this.shipLengths);
  }

  renderBoards() {
    const player2Grid = document.getElementById("player-2-grid");
    player2Grid.textContent = "";
    let player2board = this.player2.boardState;
    console.log(player2board);
    let tileDivs = [];
    for (let x = 0; x < player2board.width; x += 1) {
      let column = [];
      for (let y = 0; y < player2board.height; y += 1) {
        const tile = document.createElement("div");
        tile.textContent = `(${x}, ${y})`;
        tile.classList = "tile";
        column.push(tile);
      }
      tileDivs.push(column);
    }

    console.log(player2board.shipCoordinates);
    for (const shipCoordinate of player2board.shipCoordinates) {
      console.log(shipCoordinate);
      tileDivs[shipCoordinate[0]][shipCoordinate[1]].classList += " ship";
    }

    for (const column of tileDivs) {
      let columnDiv = document.createElement("div");
      for (const tile of column) {
        columnDiv.appendChild(tile);
      }
      player2Grid.appendChild(columnDiv);
    }
  }
}

let game = new Game();
game.renderBoards();
