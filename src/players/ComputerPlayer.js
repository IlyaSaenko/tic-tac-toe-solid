import AbstractPlayer from "./AbstractPlayer.js";
//Создаём класс, а в нём async метод
// 1️⃣ Делаем небольшую паузу, чтобы ход компьютера выглядел "человечным"
// await заставляет игру подождать, пока "компьютер думает"
// 2️⃣ Получаем список всех ПУСТЫХ клеток на игровом поле
// Метод внутри board возвращает массив индексов свободных ячеек
// 3️⃣ Случайным образом выбираем одну из свободных клеток
// Это и будет ход компьютера — простой рандомный бот
// 4️⃣ Возвращаем выбранный индекс игре
// Game.js продолжит ход: поставит символ, проверит победу и т.д.

export default class ComputerPlayer extends AbstractPlayer {
  async getMove(board) {
    await new Promise(resolve => {
      setTimeout(resolve, 2000)
    });
    const emptyIndices = board.getEmptyIndices();
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }
}
