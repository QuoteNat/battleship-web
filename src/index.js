import { Player, Cpu } from "./player";
import "./template.css";
class Game {
  shipLengths = [5, 4, 3, 3, 2];
  constructor() {
    this.player1 = new Player();
    this.player2 = new Cpu(this.shipLengths);
  }

  renderBoards(div, player) {
    div.textContent = "";
    let playerState = player.boardState;
    let tileDivs = [];
    for (let x = 0; x < playerState.width; x += 1) {
      let column = [];
      for (let y = 0; y < playerState.height; y += 1) {
        const tile = document.createElement("div");
        tile.textContent = `(${x}, ${y})`;
        tile.classList = "tile";
        column.push(tile);
      }
      tileDivs.push(column);
    }

    for (const shipCoordinate of playerState.shipCoordinates) {
      tileDivs[shipCoordinate[0]][shipCoordinate[1]].classList += " ship";
    }

    for (const column of tileDivs) {
      let columnDiv = document.createElement("div");
      for (const tile of column) {
        columnDiv.appendChild(tile);
      }
      div.appendChild(columnDiv);
    }
  }
}

let game = new Game();
const player2grid = document.getElementById("player-2-grid");
game.renderBoards(player2grid, game.player2);
