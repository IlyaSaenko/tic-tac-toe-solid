export default class Stats {
// Создаём класс и конструктор. Принимает один параметр storageKey со значением по умолчанию 'ticTacToeStats'.
// Сохраняем переданный ключ в свойство объекта.
// Создаём объект data — это наша статистика.
// Сразу после создания объекта вызываем метод load().
constructor(storageKey = 'ticTacToeStats') {
  this.storageKey = storageKey;
  this.data = { player: 0, computer: 0, draw: 0 };
  this.load();
}

//increment(kind) — увеличивает счётчик по типу результата игры.
// Проверяем, есть ли такое свойство в объекте data.
// Увеличиваем значение на 1.
// Сразу сохраняем обновлённую статистику в localStorage.
increment(kind) {
  if (this.data[kind] !== undefined) {
    this.data[kind]++;
    this.save();
  }
}

//save() — сохраняет текущую статистику в localStorage.
// Пишем localStorage.setItem — встроенный метод браузера для сохранения данных.
save() {
  localStorage.setItem(this.storageKey, JSON.stringify(this.data));
}

//load() — загружает статистику из localStorage при старте.
// Сохраняем в переменную stored данные по ключу.
// Если что-то есть (не null) — преобразуем строку обратно в объект с помощью JSON.parse и записываем в this.data.
load() {
  const stored = localStorage.getItem(this.storageKey);
  if (stored) this.data = JSON.parse(stored);
}

//getData() — просто возвращает текущую статистику.
// Возвращаем текущую статистику.
getData() {
  return this.data;
}
}
