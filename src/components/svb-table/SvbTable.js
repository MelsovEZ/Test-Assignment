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

        // Создание элекмента таблицы
        this.table = document.createElement('table');
        this.table.classList.add('svb-table');

        // Добавление таблицы в обертку
        this.element.appendChild(this.table);
    }

    renderHeader() {
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');

        // Добавление ячейки с порядковым номером
        const thEnum = document.createElement('th');

        thEnum.textContent = '№';
        tr.appendChild(thEnum);

        const columns = this.data.columns;
        const settings = this.data.settings;

        columns.forEach((columnName) => {
            if (columnName === 'uuid') return; // Пропустить колонку uuid

            const th = document.createElement('th');

            th.textContent = settings[columnName].represent;
            th.dataset.name = settings[columnName].name;
            tr.appendChild(th);
        });

        thead.appendChild(tr);

        // Заменить существующий thead, если он есть
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

            // Добавление ячейки с порядковым номером
            const tdEnum = document.createElement('td');

            tdEnum.textContent = rowIndex + 1; // Счетчик текущего номера строки
            tr.appendChild(tdEnum);

            rowData.forEach((cellData, index) => {
                const columnName = this.data.columns[index];

                if (columnName === 'uuid') return; // Пропустить колонку uuid

                const td = document.createElement('td');

                td.dataset.name = columnName;

                // Если данные в ячейке объект, содержащий значение и его представление
                if (typeof cellData === 'object' && cellData !== null && cellData.r !== undefined) {
                    td.textContent = cellData.r;
                } else {
                    td.textContent = cellData;
                }

                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });

        // Заменить существующий tbody, если он есть
        const existingTbody = this.table.querySelector('tbody');

        if (existingTbody) {
            this.table.replaceChild(tbody, existingTbody);
        } else {
            this.table.appendChild(tbody);
        }
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

        // Подсветка строки при клике
        this.table.addEventListener('click', (event) => {
            const row = event.target.closest('tr');

            if (row && row.parentNode.tagName === 'TBODY') {
                this.setActiveRow(row);
            }
        });
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

    loadRows(data) {
        this.data = data;

        // Отрисовка таблицы
        this.renderHeader();
        this.renderBody();
    }

    addRow(rowData) {
        const tbody = this.table.querySelector('tbody');
        const tr = document.createElement('tr');
        const uuid = rowData[0];

        tr.dataset.uuid = uuid;

        // Добавление ячейки с порядковым номером
        const rowCount = tbody.children.length + 1; // Полчение порядкового номера строки
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

        // Пересчет порядковых номеров строк
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

    renderHeader() {
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');

        // Добавление ячейки с порядковым номером
        const thEnum = document.createElement('th');

        thEnum.textContent = '№';
        tr.appendChild(thEnum);

        const columns = this.data.columns;
        const settings = this.data.settings;

        columns.forEach((columnName) => {
            if (columnName === 'uuid') return; // Пропустить колонку uuid

            const th = document.createElement('th');

            th.dataset.name = settings[columnName].name;

            // Текст заголовка
            const thText = document.createElement('span');

            thText.textContent = settings[columnName].represent;
            thText.classList.add('th-text');
            th.appendChild(thText);

            // Иконка
            const thIcon = document.createElement('span');

            thIcon.classList.add('th-icon');
            thIcon.innerHTML = '⚙️'; // Замените на нужную иконку
            th.appendChild(thIcon);

            tr.appendChild(th);
        });

        thead.appendChild(tr);

        // Заменить существующий thead, если он есть
        const existingThead = this.table.querySelector('thead');

        if (existingThead) {
            this.table.replaceChild(thead, existingThead);
        } else {
            this.table.appendChild(thead);
        }
    }

    renderHeader() {
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');

        // Добавление ячейки с порядковым номером
        const thEnum = document.createElement('th');

        thEnum.textContent = '№';
        tr.appendChild(thEnum);

        const columns = this.data.columns;
        const settings = this.data.settings;

        columns.forEach((columnName) => {
            if (columnName === 'uuid') return; // Пропустить колонку uuid

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
            lockIcon.innerHTML = '🔒'; // Замените на нужный символ или иконку
            headerContainer.appendChild(lockIcon);

            // Иконка сортировки
            const sortIcon = document.createElement('span');

            sortIcon.classList.add('icon', 'icon-sort');
            sortIcon.innerHTML = '🔛'; // Замените на нужный символ или иконку
            headerContainer.appendChild(sortIcon);

            // Иконка фильтра
            const filterIcon = document.createElement('span');

            filterIcon.classList.add('icon', 'icon-filter');
            filterIcon.innerHTML = '⚙️'; // Замените на нужный символ или иконку
            headerContainer.appendChild(filterIcon);

            // Добавление контейнера в заголовок
            th.appendChild(headerContainer);
            tr.appendChild(th);
        });

        thead.appendChild(tr);

        // Заменить существующий thead, если он есть
        const existingThead = this.table.querySelector('thead');

        if (existingThead) {
            this.table.replaceChild(thead, existingThead);
        } else {
            this.table.appendChild(thead);
        }
    }

}
