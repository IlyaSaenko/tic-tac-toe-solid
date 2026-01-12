export default class Game {
  constructor(player, computer, boardContainer, currentTurnElement, onFinish = null) {
    this.board = boardContainer;
    this.player = player;
    this.computer = computer;
    this.currentTurnElement = currentTurnElement;
    this.currentPlayer = null;
    this.isGameOver = false;
    this.onFinish = onFinish;
  }

  async start() {
    this.isGameOver = false;
    this.board.create();

    this.currentPlayer = this.player.marker === 'X' ? this.player : this.computer;
    await this.loopGame();
  }

  async loopGame() {
    while (!this.isGameOver) {
      this.updateTurnText();

      let idx;
      if (this.currentPlayer.getMove) {
        idx = await this.currentPlayer.getMove(this.board);
      }

      if (idx !== undefined) {
        this.board.setMarker(idx, this.currentPlayer.marker);
      }

      const winCombo = this.board.checkWin(this.currentPlayer.marker);
      if (winCombo) return this.endGame(this.currentPlayer);
      if (this.board.isFull()) return this.endGame(null);

      this.currentPlayer = this.currentPlayer === this.player ? this.computer : this.player;
    }
  }

  updateTurnText() {
    this.currentTurnElement.textContent = `Ход: ${this.currentPlayer.name} (${this.currentPlayer.marker})`;
  }

  endGame(winner) {
    if (winner) {
      this.board.highlightWinningCells(this.board.checkWin(winner.marker));
      this.currentTurnElement.textContent = `${winner.name} победил! 🎉`;
    } else {
      this.currentTurnElement.textContent = 'Ничья 🤝';
    }
    
    this.board.disable();
    this.isGameOver = true;

    if (this.onFinish) {
      const kind = winner === this.player ? 'player' : winner === this.computer ? 'computer' : 'draw';
      this.onFinish(kind);
    }
  }
}
