export default class Board {
  constructor(boardContainer) {
    this.boardContainer = boardContainer;
    this.state = Array(9).fill('');
    this.cells = [];
    this.clickHandlers = [];
  }

  create() {
    this.boardContainer.innerHTML = '';
    this.state = Array(9).fill('');
    this.cells = [];
    this.clickHandlers = [];

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      this.boardContainer.appendChild(cell);
      this.cells.push(cell);
    }
  }

  async waitForClick() {
    return new Promise(resolve => {
      const handler = (event) => {
        const idx = event.target.dataset.index;
        if (this.state[idx] === '') {
          resolve(idx);
        }
      };
      this.cells.forEach(cell => {
        cell.addEventListener('click', handler);
      });
      this.clickHandlers.push(handler);
    });
  }

  removeClickHandlers() {
    this.cells.forEach(cell => {
      this.clickHandlers.forEach(handler => {
        cell.removeEventListener('click', handler);
      });
    });
  
    this.clickHandlers = [];
  }

  setMarker(index, marker) {
    this.state[index] = marker;
    const cell = this.cells[index];
    if (!cell) return;
    cell.textContent = marker;
    cell.classList.add(marker);
  }

  isFull() {
    return this.state.every(v => v !== '');
  }

  disable() {
    this.cells.forEach(cell => {
      const clone = cell.cloneNode(true);
      cell.replaceWith(clone);
    });
  }

  getEmptyIndices() {
    const emptyIndices = this.state
      .map((v, i) => v === '' ? i : null)
      .filter(i => i !== null);

    return emptyIndices;
  }

  checkWin(marker) {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    const winningPatterns = winPatterns.find(pattern =>
      pattern.every(i => this.state[i] === marker)
    );
    return winningPatterns;
  }

  highlightWinningCells(pattern) {
    if (!pattern) return;
    pattern.forEach(i => this.cells[i].classList.add('win'));
  }
}
