import './styles/svb-table.scss';

export default class SvbTable {
    constructor() {
        this.data = null;
        this.element = null;
        this.activeRow = null;

        this.render();
        this.initEventListeners();
    }

    render() {
        this.element = document.createElement('div');
        this.element.classList.add('svb-table-wrapper');

        // Создаем контейнер с фиксированной высотой и прокруткой
        const tableContainer = document.createElement('div');

        tableContainer.classList.add('table-container');

        // Создаем элемент таблицы
        this.table = document.createElement('table');
        this.table.classList.add('svb-table');

        // Добавляем таблицу в контейнер
        tableContainer.appendChild(this.table);

        // Добавляем контейнер в основной элемент
        this.element.appendChild(tableContainer);
    }

    renderHeader() {
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');

        // Добавляем ячейку для номера строки
        const thEnum = document.createElement('th');

        thEnum.textContent = '№';
        tr.appendChild(thEnum);

        const columns = this.data.columns;
        const settings = this.data.settings;

        columns.forEach((columnName) => {
            if (columnName === 'uuid') return; // Пропускаем колонку 'uuid'

            const th = document.createElement('th');

            th.dataset.name = settings[columnName].name;

            // Контейнер для содержимого заголовка
            const headerContainer = document.createElement('div');

            headerContainer.classList.add('header-container');

            // Текст заголовка
            const thText = document.createElement('span');

            thText.textContent = settings[columnName].represent;
            thText.classList.add('th-text');
            headerContainer.appendChild(thText);

            // Иконка блокировки
            const lockIcon = document.createElement('span');

            lockIcon.classList.add('icon', 'icon-lock');
            lockIcon.innerHTML = '🔒';
            headerContainer.appendChild(lockIcon);

            // Иконка сортировки
            const sortIcon = document.createElement('span');

            sortIcon.classList.add('icon', 'icon-sort');
            sortIcon.innerHTML = '🔛';
            headerContainer.appendChild(sortIcon);

            // Иконка фильтра
            const filterIcon = document.createElement('span');

            filterIcon.classList.add('icon', 'icon-filter');
            filterIcon.innerHTML = '⚙️';
            headerContainer.appendChild(filterIcon);

            // Добавляем контейнер в ячейку заголовка
            th.appendChild(headerContainer);
            tr.appendChild(th);
        });

        thead.appendChild(tr);

        // Заменяем существующий thead, если он есть
        const existingThead = this.table.querySelector('thead');

        if (existingThead) {
            this.table.replaceChild(thead, existingThead);
        } else {
            this.table.appendChild(thead);
        }
    }

    renderBody() {
        const tbody = document.createElement('tbody');

        this.data.rows.forEach((rowData, rowIndex) => {
            const tr = document.createElement('tr');
            const uuid = rowData[0];

            tr.dataset.uuid = uuid;

            // Добавляем ячейку для номера строки
            const tdEnum = document.createElement('td');

            tdEnum.textContent = rowIndex + 1; // Текущий номер строки
            tr.appendChild(tdEnum);

            rowData.forEach((cellData, index) => {
                const columnName = this.data.columns[index];

                if (columnName === 'uuid') return; // Пропускаем колонку 'uuid'

                const td = document.createElement('td');

                td.dataset.name = columnName;

                // Если cellData является объектом с 'r' (представление)
                if (typeof cellData === 'object' && cellData !== null && cellData.r !== undefined) {
                    td.textContent = cellData.r;
                } else {
                    td.textContent = cellData;
                }

                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });

        // Заменяем существующий tbody, если он есть
        const existingTbody = this.table.querySelector('tbody');

        if (existingTbody) {
            this.table.replaceChild(tbody, existingTbody);
        } else {
            this.table.appendChild(tbody);
        }
    }

    renderFooter() {
        const tfoot = document.createElement('tfoot');
        const tr = document.createElement('tr');

        // Добавляем ячейку для номера строки (может быть пустой)
        const tdEnum = document.createElement('td');

        tdEnum.textContent = ''; // Или можно добавить общее число элементов
        tr.appendChild(tdEnum);

        const columns = this.data.columns;
        const settings = this.data.settings;

        columns.forEach((columnName) => {
            if (columnName === 'uuid') return; // Пропускаем колонку 'uuid'

            const td = document.createElement('td');

            td.dataset.name = settings[columnName].name;

            // Здесь вы можете добавить содержимое футера для каждой колонки
            td.textContent = ''; // Или любые итоговые значения

            tr.appendChild(td);
        });

        tfoot.appendChild(tr);

        // Заменяем существующий tfoot, если он есть
        const existingTfoot = this.table.querySelector('tfoot');

        if (existingTfoot) {
            this.table.replaceChild(tfoot, existingTfoot);
        } else {
            this.table.appendChild(tfoot);
        }
    }

    loadRows(data) {
        this.data = data;

        // Рендеринг таблицы
        this.renderHeader();
        this.renderBody();
        this.renderFooter();
    }

    setActiveRow(row) {
        if (this.activeRow) {
            this.activeRow.classList.remove('active');
        }

        this.activeRow = row;
        this.activeRow.classList.add('active');
    }

    getActiveRow() {
        return this.activeRow;
    }

    addRow(rowData) {
        const tbody = this.table.querySelector('tbody');
        const tr = document.createElement('tr');
        const uuid = rowData[0];

        tr.dataset.uuid = uuid;

        // Добавляем ячейку для номера строки
        const rowCount = tbody.children.length + 1; // Получаем текущий номер строки
        const tdEnum = document.createElement('td');

        tdEnum.textContent = rowCount;
        tr.appendChild(tdEnum);

        rowData.forEach((cellData, index) => {
            const columnName = this.data.columns[index];

            if (columnName === 'uuid') return;

            const td = document.createElement('td');

            td.dataset.name = columnName;

            if (typeof cellData === 'object' && cellData !== null && cellData.r !== undefined) {
                td.textContent = cellData.r;
            } else {
                td.textContent = cellData;
            }

            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    }

    removeRow(uuid) {
        const tbody = this.table.querySelector('tbody');
        const row = tbody.querySelector(`tr[data-uuid="${uuid}"]`);

        if (row) {
            tbody.removeChild(row);
        }

        // Пересчет номеров строк
        Array.from(tbody.children).forEach((row, index) => {
            row.firstChild.textContent = index + 1;
        });
    }

    setValue(uuid, columnName, value) {
        const tbody = this.table.querySelector('tbody');
        const row = tbody.querySelector(`tr[data-uuid="${uuid}"]`);

        if (row) {
            const td = Array.from(row.children).find(td => td.dataset.name === columnName);

            if (td) {
                td.textContent = value;
            }
        }
    }

    getValue(uuid, columnName) {
        const tbody = this.table.querySelector('tbody');
        const row = tbody.querySelector(`tr[data-uuid="${uuid}"]`);

        if (row) {
            const td = Array.from(row.children).find(td => td.dataset.name === columnName);

            if (td) {
                return td.textContent;
            }
        }

        return null;
    }

    initEventListeners() {
    // Подсветка строки при наведении
        this.table.addEventListener('mouseover', (event) => {
            const row = event.target.closest('tr');

            if (row && row.parentNode.tagName === 'TBODY') {
                row.classList.add('hover');
            }
        });

        this.table.addEventListener('mouseout', (event) => {
            const row = event.target.closest('tr');

            if (row && row.parentNode.tagName === 'TBODY') {
                row.classList.remove('hover');
            }
        });

        // Установка активной строки при клике
        this.table.addEventListener('click', (event) => {
            const row = event.target.closest('tr');

            if (row && row.parentNode.tagName === 'TBODY') {
                this.setActiveRow(row);
            }
        });
    }
}
