import AbstractPlayer from "./AbstractPlayer.js";

export default class HumanPlayer extends AbstractPlayer {
  getMove(board) {
    return new Promise(resolve => {
      const handler = (event) => {
        const idx = Number(event.target.dataset.index);
        if (board.state[idx] === '') {
          board.removeClickHandlers();
          resolve(idx);
        }
      }
      board.cells.forEach(cell => {
        cell.addEventListener('click', handler);
      });
      board.clickHandlers.push(handler);
    })
  }
}
