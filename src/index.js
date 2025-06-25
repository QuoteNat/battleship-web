import { Player, Cpu } from "./player";
import "./template.css";
class Game {
  shipLengths = [5, 4, 3, 3, 2];
  currentPlayer = 1;
  vsCpu = true;
  gameover = false;

  constructor() {
    this.player1 = new Player(this.shipLengths);
    this.player2 = new Cpu(this.shipLengths);
    this.player1grid = document.getElementById("player-1-grid");
    this.player2grid = document.getElementById("player-2-grid");
    this.statusDiv = document.getElementById("status");
  }

  renderBoards() {
    if (!this.gameover) {
      game._renderBoard(this.player1grid, game.player1, false, false);
      game._renderBoard(this.player2grid, game.player2, false, true);
    } else {
      game._renderBoard(this.player1grid, game.player1, false, false);
      game._renderBoard(this.player2grid, game.player2, false, false);
    }
  }

  updateStatusMessage(message) {
    this.statusDiv.textContent = message;
  }

  _receiveAttack(coordinate) {
    let player = this.currentPlayer == 1 ? this.player2 : this.player1;
    try {
      player.receiveAttack(coordinate);
      if (player.hasLost()) {
        this.updateStatusMessage("Player has won the game!");
        this.gameover = true;
        this.renderBoards();
        return;
      }
      if (this.vsCpu) {
        this.currentPlayer = 2;
        this.player1.receiveAttack(this.player2.doMove());
        if (this.player1.hasLost()) {
          this.updateStatusMessage("CPU has won the game!");
          this.gameover = true;
          this.renderBoards();
          return;
        }
        this.currentPlayer = 1;
      }
      this.renderBoards();
    } catch {
      // Do nothing when move is invalid
      return;
    }
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
            this._receiveAttack(coordinate);
          });
          tile.classList += " attackable";
        }
        tile.dataset.x = `${x}`;
        tile.dataset.y = `${y}`;
        column.push(tile);
      }
      tileDivs.push(column);
    }

    for (const shipCoordinate of playerState.shipCoordinates) {
      tileDivs[shipCoordinate[0]][shipCoordinate[1]].classList += " ship";
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
game.renderBoards();

const startCpuGameButton = document.getElementById("start-cpu-game");
startCpuGameButton.addEventListener("click", () => {
  game = new Game();
  game.renderBoards();
});
