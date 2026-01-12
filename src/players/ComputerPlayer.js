import AbstractPlayer from "./AbstractPlayer.js";

export default class ComputerPlayer extends AbstractPlayer {
  async getMove(board) {
    await new Promise(resolve => {
      setTimeout(resolve, 1000)
    });
    const emptyIndices = board.getEmptyIndices();
    
    for (let idx of emptyIndices) {
      board.state[idx] = this.marker;
      if (board.checkWin(this.marker)) {
        board.state[idx] = '';
        return idx;
      }
      board.state[idx] = '';
    }

    const playerMarker = this.marker === 'X' ? 'O' : 'X';
    for (let idx of emptyIndices) {
      board.state[idx] = playerMarker;
      if (board.checkWin(playerMarker)) {
        board.state[idx] = '';
        return idx;
      }
      board.state[idx] = '';
    }


    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }
}
