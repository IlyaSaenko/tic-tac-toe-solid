import DOMAdapter from './ui/DOMAdapter.js';
import Board from './core/Board.js';
import Game from './core/Game.js';
import HumanPlayer from './players/HumanPlayer.js';
import ComputerPlayer from './players/ComputerPlayer.js';
import Stats from './stats/Stats.js';

class App {
  constructor() {
    this.ui = new DOMAdapter();
    this.stats = new Stats();
    this.game = null;

    this.initEvents();
    this.renderStats();
  }

  initEvents() {
    this.ui.startBtn.addEventListener('click', () => this.startGame());
    this.ui.restartBtn.addEventListener('click', () => this.restartGame());
  }

  async startGame() {
    const name = this.ui.playerNameInput.value.trim() || 'Игрок';
    const playerMarker = this.ui.markX.checked ? 'X' : this.ui.markO.checked ? 'O' : 'X';
    const computerMarker = playerMarker === 'X' ? 'O' : 'X';

    const player = new HumanPlayer(name, playerMarker);
    const computer = new ComputerPlayer('Компьютер', computerMarker);

    const board = new Board(this.ui.boardContainer);

    this.game = new Game(
      player,
      computer,
      board,
      this.ui.currentTurn,
      (result) => {
        this.stats.increment(result);
        this.renderStats();
      }
    );

    this.ui.initialScreen.classList.add('hidden');
    this.ui.gameScreen.classList.remove('hidden');

    await this.game.start();
    this.renderStats();
  }

  restartGame() {
    this.ui.initialScreen.classList.remove('hidden');
    this.ui.gameScreen.classList.add('hidden');
    this.ui.playerNameInput.value = '';
    this.ui.markX.checked = true;
    this.ui.markO.checked = false;
    this.ui.currentTurn.textContent = '';
    this.ui.boardContainer.innerHTML = '';
    this.renderStats();
  }

  renderStats() {
    const data = this.stats.getData();
    this.ui.statsContainer.innerHTML = `Статистика: <strong>${data.player}</strong> : <strong>${data.computer}</strong> (ничьи: <strong>${data.draw}</strong>)`;
  }
}

new App();
