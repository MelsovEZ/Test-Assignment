import getList from './src/api/get-list';
import SvbTable from './src/components/svb-table/SvbTable';
import './src/scss/main.scss';

const request = getList();
const tableWrapper = document.querySelector('#table-wrapper');

// Мок данных для новой строки
const newRow = [
    'new-uuid-12345',
    '2024-12-01 10:00:00',
    { v: 'attachment-id', r: 'Attachment Name' },
    { v: 'contract-id', r: 'Contract Name' },
    { v: 'project-id', r: 'Project Name' },
    { v: 'contractor-id', r: 'Contractor Name' },
    'Block X',
    { v: 'jobtype-id', r: 'Job Type' },
    '100000',
    '120000',
    '15 d'
];

// UUID строки, которую нужно удалить
const uuidToRemove = '89326d90-fd15-4070-a8a0-538e2c9dd386';

request.then((response) => {
    const svbTable = new SvbTable();

    // Форматируем даты в данных перед загрузкой в таблицу
    const formattedResponse = formatDataDates(response);

    svbTable.loadRows(formattedResponse);

    for (let i = 0; i < 20; i++) {
        svbTable.addRow(formattedNewRow);
    }

    svbTable.removeRow(uuidToRemove);

    tableWrapper.appendChild(svbTable.element);

    // Пример использования метода getActiveRow
    svbTable.table.addEventListener('click', () => {
        const activeRow = svbTable.getActiveRow();

        if (activeRow) {
            console.log('Active Row UUID:', activeRow.dataset.uuid);
        }
    });
});

// Вспомогательная функция для форматирования даты
function formatDate(dateString) {
    // Проверяем, соответствует ли строка формату YYYY-MM-DD HH:MM:SS
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

    if (regex.test(dateString)) {
        const [datePart] = dateString.split(' ');
        const [year, month, day] = datePart.split('-');

        return `${day}.${month}.${year}`;
    }

    return dateString; // Возвращаем оригинальную строку, если она не является датой
}

// Функция для форматирования дат в данных
function formatDataDates(data) {
    const formattedData = { ...data };

    formattedData.rows = data.rows.map((row) => {
        return row.map((cell) => {
            if (typeof cell === 'string') {
                return formatDate(cell);
            } else if (typeof cell === 'object' && cell !== null && cell.r) {
                return { ...cell, r: formatDate(cell.r) };
            } else {
                return cell;
            }
        });
    });

    return formattedData;
}

// Форматируем даты в newRow перед добавлением
const formattedNewRow = newRow.map((cell) => {
    if (typeof cell === 'string') {
        return formatDate(cell);
    } else if (typeof cell === 'object' && cell !== null && cell.r) {
        return { ...cell, r: formatDate(cell.r) };
    } else {
        return cell;
    }
});
