import getList from './src/api/get-list';
import SvbTable from './src/components/svb-table/SvbTable';
import './src/scss/main.scss';

const request = getList();
const tableWrapper = document.querySelector('#table-wrapper');
// Мок данные
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
const uuidToRemove = '89326d90-fd15-4070-a8a0-538e2c9dd386';

request.then((response) => {
    request.then((response) => {
        const svbTable = new SvbTable();

        svbTable.loadRows(response);
        svbTable.addRow(newRow);
        svbTable.removeRow(uuidToRemove);

        tableWrapper.appendChild(svbTable.element);
    });
})
