# Тестовое задание: Реализация класса SvbTable

## Описание проекта

Этот проект включает разработку класса **SvbTable**, который отображает интерактивную таблицу для работы с документами. Таблица поддерживает основные функции для работы с данными, взаимодействие с пользователем и отвечает требованиям к дизайну.

---

## Функциональность

### ✅ Реализовано:

- **Отображение таблицы**:
  - Адаптация таблицы под размеры окна.
  - Фиксация шапки и подвала при скроллинге.
- **Работа с данными**:
  - Метод `loadRows(data)` для загрузки новых данных в таблицу.
  - Метод `addRow(rowData)` для добавления строки.
  - Метод `removeRow(uuid)` для удаления строки по идентификатору.
  - Уникальные идентификаторы строк (dataset `uuid`).
- **Интерактивность**:
  - Подсветка строки при наведении курсора.
  - Метод `getActiveRow()` для получения активной строки.
- **Управление значениями**:
  - Метод `setValue(uuid, columnName, value)` для изменения значения ячейки.
  - Метод `getValue(uuid, columnName)` для получения значения ячейки.
- **Форматирование данных**:
  - Преобразование дат из формата `YYYY-MM-DD HH:MM:SS` в `DD.MM.YYYY`.

### ❌ Не реализовано:

- Возможность изменения ширины столбца пользователем.
- Возможность закрепить произвольный столбец.
- Методы для заполнения подвала таблицы по имени столбца.

---

## Структура проекта

- **index.html**: содержит базовую разметку и элемент `<div id="table-wrapper">` для вставки таблицы.
- **main.js**: отвечает за инициализацию таблицы, загрузку данных и вставку таблицы в DOM.
- **src/api/get-list.js**: возвращает тестовые данные для отображения в таблице.
- **src/components/svb-table/**:
  - **SvbTable.js**: основной код таблицы.
  - **styles/svb-table.scss**: стили таблицы.

---

## Как запустить проект

1. **Склонируйте репозиторий:**
   ```bash
   git clone https://github.com/MelsovEZ/Test-Assignment.git
   ```

2. **Установите зависимости:**
   ```bash
   npm install
   ```

3. **Запустите проект:**
   ```bash
   npm run serve
   ```

---

## Примеры использования методов

- **Добавление строки:**
  ```javascript
  svbTable.addRow(['uuid-строки', '2024-12-01 10:00:00', 'Данные...']);
  ```

- **Удаление строки:**
  ```javascript
  svbTable.removeRow('uuid-строки');
  ```

- **Установка значения:**
  ```javascript
  svbTable.setValue('uuid-строки', 'имя-столбца', 'новое значение');
  ```

- **Получение значения:**
  ```javascript
  const value = svbTable.getValue('uuid-строки', 'имя-столбца');
  ```

- **Получение активной строки:**
  ```javascript
  const activeRow = svbTable.getActiveRow();
  console.log('Активная строка UUID:', activeRow.dataset.uuid);
  ```

---

## Дополнительная информация

### Форматирование дат

В файле `main.js` реализована функция `formatDate(dateString)`, которая преобразует строки дат из формата `YYYY-MM-DD HH:MM:SS` в `DD.MM.YYYY` для лучшего восприятия данных.

### Стилизация

Почти все стили разработаны в соответствии с макетом из Figma.

---

## Итог

Хотя на выполнение задания было выделено достаточно времени, из-за занятости работой и переездом я смог уделить проекту всего 4-5 часов. Выполнил все базовые требования. Бонусные задачи не успел завершить либо отказался от их реализации из-за неудовлетворительных, для меня, результатов.