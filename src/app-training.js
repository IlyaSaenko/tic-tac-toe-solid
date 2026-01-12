// Импортируем классы
import DOMAdapter from './ui/DOMAdapter.js';
import Game from './core/Game.js';
import HumanPlayer from './players/HumanPlayer.js';
import ComputerPlayer from './players/ComputerPlayer.js';
import Stats from './stats/Stats.js';

// Создаём главный класс приложения — точку входа всего проекта
class App {
  // Конструктор — вызывается один раз при запуске приложения
  // Создаём объект UI: внутри него лежат все DOM-элементы (кнопки, поля, экраны)
  // Создаём объект статистики: он сам загрузит данные из localStorage
  // Поле для объекта игры.
  // Сначала игры нет — она создаётся только при старте
  // Подключаем обработчики событий (кнопки)
  // Сразу отображаем статистику при загрузке страницы
  constructor () {
    this.ui = new DOMAdapter();
    this.stats = new Stats();
    this.game = null;
    this.initEvents();
    this.renderStats();
  }

  // initEvents() //todo
  // Метод для навешивания обработчиков событий
  // При клике на кнопку "Старт" запускаем игру
  // Используем стрелочную функцию, чтобы this был App
  // При клике на кнопку "Рестарт" возвращаемся к начальному экрану
  initEvents() {
    this.ui.startBtn.addEventListener('click', () => this.startGame());
    this.ui.restartBtn.addEventListener('click', () => this.restartGame());
  }

  // startGame() //todo
  // Асинхронный метод запуска игры
  // Асинхронный, потому что внутри будет await game.start()
  async startGame() {
  // Получаем имя игрока из input
  // Убираем пробелы
  // Если пусто — подставляем "Игрок"
  const name = this.ui.playerNameInput.value.trim() || 'Игрок';

  // Определяем маркер игрока:
  // если выбран X — берём X
  // иначе если выбран O — берём O
  // иначе по умолчанию X
  const playerMarker = 
    this.ui.markX.checked ? 'X' :
    this.ui.markO.checked ? 'O' :
    'X';

  // Маркер компьютера — противоположный маркеру игрока
  const computerMarker = playerMarker === 'X' ? 'O' : 'X';

  // Создаём объект игрока-человека
  const player = new HumanPlayer(name, playerMarker);

  // Создаём объект игрока-компьютера
  const computer = new ComputerPlayer('Компьютер', computerMarker);

  // Создаём объект игры
  // Передаём:
  // 1. игрока
  // 2. компьютер
  // 3. контейнер доски
  // 4. элемент для текста текущего хода
  // 5. callback, который вызовется при завершении игры
  // result — 'player', 'computer' или 'draw'
  // Увеличиваем соответствующее значение статистики
  // Перерисовываем статистику в интерфейсе
  const game = new Game(
    player,
    computer,
    this.ui.boardContainer,
    this.ui.currentTurn,
    (result) => {
      this.stats.increment(result);
      this.renderStats();
    }
  );

  // Прячем начальный экран
  // Показываем экран игры
  // Запускаем игру и ждём, пока она полностью завершится
  // После завершения игры ещё раз обновляем статистику
  this.ui.initialScreen.classList.add('hidden');
  this.ui.gameScreen.classList.remove('hidden');
  await this.game.start();
  this.renderStats();
}


  // restartGame() //todo
  // Метод перезапуска (возврат к начальному экрану)
  // Показываем начальный экран
  // Прячем экран игры
  // Очищаем поле ввода имени
  // Сбрасываем выбор маркеров на X
  // Очищаем текст текущего хода
  // Полностью очищаем доску
  // Перерисовываем статистику
  restartGame() {
    this.ui.initialScreen.classList.remove('hidden');
    this.ui.gameScreen.classList.add('hidden');
    this.playerNameInput.value = '';
    this.ui.markX.checked = true;
    this.ui.markO.checked = false;
    this.ui.currentTurn.textContent = '';
    this.ui.boardContainer.innerHTML = '';
    this.renderStats();
  }

  // renderStats() //todo
  // Метод отрисовки статистики
  // Получаем объект статистики:
  // { player, computer, draw }
  // Формируем HTML со значениями статистики
  // и вставляем его в DOM
  renderStats() {
    const data = this.stats.getData();
    this.ui.statsContainer.innerHTML =
      `Статистика — <strong>${data.player}</strong> : <strong>${data.computer}</strong> (ничьи: <strong>${data.draw}</strong>)`;
  }
}

// Создаём экземпляр App
// В этот момент:
// - вызывается constructor
// - подключаются события
// - загружается статистика
// - приложение начинает работать
new App();
