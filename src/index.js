import { Player, Cpu } from "./player";
import "./template.css";
class Game {
  shipLengths = [5, 4, 3, 3, 2];
  currentPlayer = 1;

  constructor() {
    this.player1 = new Player(this.shipLengths);
    this.player2 = new Cpu(this.shipLengths);
  }

  renderBoards(player1BoardDiv, player2BoardDiv) {
    game._renderBoard(player1BoardDiv, game.player1, false, false);
    game._renderBoard(player2BoardDiv, game.player2, true, true);
  }
  _renderBoard(div, player, hidden, attackable) {
    div.textContent = "";
    let playerState = player.boardState;
    let tileDivs = [];
    for (let x = 0; x < playerState.width; x += 1) {
      let column = [];
      for (let y = 0; y < playerState.height; y += 1) {
        const tile = document.createElement("div");
        // tile.textContent = `(${x}, ${y})`;
        tile.classList = "tile";
        if (hidden) tile.classList += " hidden";
        if (attackable) {
          tile.addEventListener("click", (e) => {
            let coordinate = [e.target.dataset.x, e.target.dataset.y];
            console.log(coordinate);
          });
          tile.classList += " attackable";
        }
        tile.dataset.x = `${x}`;
        tile.dataset.y = `${y}`;
        column.push(tile);
      }
      tileDivs.push(column);
    }

    if (!hidden) {
      for (const shipCoordinate of playerState.shipCoordinates) {
        tileDivs[shipCoordinate[0]][shipCoordinate[1]].classList += " ship";
      }
    }

    for (const hit of playerState.hits) {
      tileDivs[hit[0]][hit[1]].textContent = "X";
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
const player1grid = document.getElementById("player-1-grid");
const player2grid = document.getElementById("player-2-grid");
game.renderBoards(player1grid, player2grid);
