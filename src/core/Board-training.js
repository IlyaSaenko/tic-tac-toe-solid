// export default — этот класс будет основным экспортируемым из файла
// class Board — объявляем класс с именем Board

//constructor()//todo
// constructor(boardContainer) — конструктор вызывается при new Board(...)
// boardContainer — ссылка на DOM-элемент <div id="board">, куда будем рисовать поле
// сохраняем контейнер
// внутреннее состояние доски: ['', '', ...] — массив из 9 пустых строк
// сюда будем складывать созданные <div class="cell">
// массив обработчиков кликов (чтобы потом снять их все разом)
export default class Board {
  constructor(boardContainer) {
    this.boardContainer = boardContainer;
    this.state = Array(9).fill('');
    this.cells = [];
    this.clickHandlers = [];
  }

  //create()//todo
  // Метод create() — создаёт/пересоздаёт игровое поле в HTML
  // очищаем контейнер (для новой игры)
  // сбрасываем состояние
  // очищаем массив клеток
  // очищаем обработчики
  // Цикл от 0 до 8 — создаём 9 клеток
  // создаём <div>
  // добавляем класс .cell (для стилей)
  // data-index="0" … data-index="8" — чтобы знать номер клетки
  // вставляем в контейнер
  // запоминаем ссылку на DOM-элемент
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

  //waitForClick()//todo
  // async waitForClick() — асинхронный метод, который ждёт клика по свободной клетке
  // возвращает промис, который разрешится числом — индексом клетки
  // создаём промис вручную, потому что клик — событие из будущего
  // обработчик клика
  // берём индекс из data-index
  // если клетка пустая — это валидный ход
  // разрешаем промис — отдаём индекс наружу
  // если занята — просто игнорируем клик
  // Вешаем один и тот же handler на все клетки
  // Сохраняем обработчик в массив — чтобы потом можно было снять
  async waitForClick() {
    return new Promise(resolve => {
      const handler = (event) => {
        const idx = event.target.dataset.index;
        if (this.state[idx] === '') {
          resolve(idx);
        }
      };
      this.cells.forEach(cell => {
        cell.addEventListenet('click', handler);
      });
      this.clickHandlers.push(handler);
    });
  }

  //removeClickHandlers()//todo
  // Убирает все обработчики кликов с доски
  // проходим по всем 9 клеткам
  // для каждой клетки проходим по всем сохранённым обработчикам
  // removeEventListener требует точно ту же функцию, что и addEventListener
  // убираем именно ЭТОТ handler с именно ЭТОЙ клетки
  // ← КЛЮЧЕВОЙ момент: removeEventListener СРАБОТАЕТ ТОЛЬКО если передать
  // ТОЧНО ТУ ЖЕ САМУЮ функцию, которую мы раньше передали в addEventListener
  // поэтому мы и сохраняли их в массив this.clickHandlers
  // после того как сняли все обработчики — очищаем массив
  // теперь он готов к следующей игре
  removeClickHandlers() {
    this.cells.forEach(cell => {
      this.clickHandlers.forEach(handler => cell.removeClickHandlers('click', handler));
    });
    this.clickHandlers = [];
  }

  //setMarker()//todo
  // Ставит крестик или нолик в клетку
  // обновляем внутреннее состояние
  // находим DOM-элемент по индексу
  // защита от ошибок
  // пишем X или O
  // добавляем класс 'X' или 'O' (для стилей)
  setMarker(index, marker) {
    this.state[index] = marker;
    const cell = this.cells[index];
    if (!cell) return;
    cell.textContent = marker;
    cell.classList.add(marker);
  }

  //isFull()//todo
  // Проверяет, заполнена ли доска полностью (для ничьи) 
  // every — проходит по массиву, возвращает true, если все элементы ≠ ''
  isFull() {
    this.state.every(v => v !== '');
  }

  //disable()//todo
  // Делает доску "мёртвой" — убирает все обработчики (чтобы нельзя было кликать после конца игры)
  //проходим по массиву
  // клонируем элемент
  // заменяем оригинал на клон — все обработчики слетают
  disable() {
    this.cells.forEach(cell => {
      const clone = cell.cloneNode(true);
      cell.replaceWith(clone);
    });
  }

  //getEmptyIndices()//todo
  // Возвращает массив индексов пустых клеток — нужен боту
  // если пусто — возвращаем индекс, иначе null
  // убираем null-ы
  getEmptyIndices() {
    const emptyIndices = this.state
      .map((v, i) => v === '' ? i : null)
      .filter(i => i !== null);

    return emptyIndices;
  }

  //checkWin()//todo
  // Проверяет, выиграл ли игрок с переданным marker ('X' или 'O')
  // все возможные выигрышные комбинации
  // find — возвращает первый элемент, для которого условие true
  // все три клетки в линии равны marker?
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

  //highlightWinningCells(pattern)//todo
  // Подсвечивает выигрышную линию (добавляет класс .win)
  // если ничья или нет победы — выходим
  // добавляем класс победным клеткам
  highlightWinningCells(pattern) {
    if (!pattern) return;
    pattern.forEach(i => this.cells[i].classList.add('win'));
  }
}
