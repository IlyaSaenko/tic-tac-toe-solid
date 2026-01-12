// export default class HumanPlayer extends AbstractPlayer {
//   getMove(board) {
//     return new Promise(resolve => {
//       const handler = (event) => {
//         const idx = Number(event.target.dataset.index);
//         if (board.state[idx] === '') {
//           board.removeClickHandlers();
//           resolve(idx);
//         }
//       }
//       board.cells.forEach(cell => cell.addEventListener('click', handler));
//       board.clickHandlers.push(handler);
//     })
//   }
// }


import AbstractPlayer from "./AbstractPlayer.js";
//создаём класс HumanPlayer
// 1️⃣ Создаём метод, который должен вернуть Promise, чтобы игра могла "ждать" клик игрока
// 2️⃣ Создаём обработчик клика по клетке
// Он срабатывает каждый раз, когда пользователь кликает по любой клетке пол
// 3️⃣ Определяем индекс той клетки, по которой кликнули
// Читаем data-index у HTML-элемента
// 4️⃣ Проверка: нельзя ходить в занятую клетку
// Если там уже X или O — просто игнорируем клик
// 5️⃣ Удаляем все обработчики кликов с доски
// Чтобы игрок не мог поставить второй ход подряд
// И чтобы не было утечек памяти
// 6️⃣ Сообщаем игре, какой индекс выбрал пользователь
// resolve завершает Promise → Game.js продолжает игру
// 7️⃣ Вешаем обработчик клика на каждую клетку поля
// Теперь каждый клик попадёт в handler
// 8️⃣ Запоминаем handler в board.clickHandlers
// Нужно для последующего удаления всех обработчиков

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
