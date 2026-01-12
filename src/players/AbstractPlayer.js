export default class AbstractPlayer {
  constructor(name, marker) {
    if (new.target === AbstractPlayer) throw new Error("AbstractPlayer нельзя создавать напрямую");
    this.name = name;
    this.marker = marker;
  }

  getMove(board) {
    throw new Error("Метод getMove должен быть реализован в наследнике")
  }
}
