export default class DOMAdapter {
  constructor() {
    this.boardContainer = document.getElementById('board');
    this.currentTurn = document.getElementById('current-turn');
    this.playerNameInput = document.getElementById('player-name');
    this.markX = document.getElementById('mark-x');
    this.markO = document.getElementById('mark-o');
    this.startBtn = document.getElementById('start-btn');
    this.restartBtn = document.getElementById('restart-btn');
    this.initialScreen = document.getElementById('initial-screen');
    this.gameScreen = document.getElementById('game-screen');
    this.statsContainer = document.getElementById('stats');
  }
}
