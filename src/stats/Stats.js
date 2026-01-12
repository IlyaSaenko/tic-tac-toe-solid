export default class Stats {
  constructor(storageKey = 'ticTacToeStats') {
    this.storageKey = storageKey;
    this.data = { player: 0, computer: 0, draw: 0 };
    this.load();
  }

  increment(kind) {
    if (this.data[kind] !== undefined) {
      this.data[kind]++;
      this.save();
    }
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  }

  load() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) this.data = JSON.parse(stored);
  }

  getData() {
    return this.data;
  }
}
