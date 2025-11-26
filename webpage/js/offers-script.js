const initialData = [
    { name: "Wheat", price: 67, discount: 23 },
    { name: "Tomato", price: 37, discount: 26 },
    { name: "Strawberry", price: 23, discount: 11 },
    { name: "Rice", price: 37, discount: 15 },
    { name: "Potato", price: 34, discount: 12 },
    { name: "Pumpkin", price: 13, discount: 8 },
    { name: "Pineapple", price: 21, discount: 18 },
    { name: "Orange", price: 22, discount: 12 },
    { name: "Onion", price: 25, discount: 12 },
    { name: "Musk Melon", price: 20, discount: 10 },
    { name: "Mushroom", price: 75, discount: 25 },
    { name: "Mango", price: 75, discount: 20 },
    { name: "Grapes", price: 35, discount: 20 },
    { name: "Corn", price: 75, discount: 25 },
    { name: "Cauliflower", price: 60, discount: 20 },
    { name: "Carrot", price: 56, discount: 18 },
    { name: "Brinjal", price: 35, discount: 15 },
    { name: "Beans", price: 82, discount: 30 },
    { name: "Banana", price: 45, discount: 15 },
    { name: "Apple", price: 72, discount: 25 },
    { name: "Almond", price: 250, discount: 50 },
    { name: "Walnut", price: 180, discount: 40 },
    { name: "Pista", price: 300, discount: 60 },
    { name: "Cashew", price: 200, discount: 45 },
    { name: "Fig", price: 150, discount: 35 }
];

let currentData = [...initialData];
let currentPage = 1;
let pageSize = 10;
let sortCol = 'name';
let sortAsc = true;

document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    setupEventListeners();
});

function setupEventListeners() {
    // Page Size
    document.getElementById('page-size').addEventListener('change', (e) => {
        pageSize = parseInt(e.target.value);
        currentPage = 1;
        renderTable();
    });

    // Search
    document.getElementById('search-input').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        currentData = initialData.filter(item => 
            item.name.toLowerCase().includes(term)
        );
        currentPage = 1;
        renderTable();
    });

    // Sorting Headers
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const col = th.dataset.sort;
            if (sortCol === col) {
                sortAsc = !sortAsc;
            } else {
                sortCol = col;
                sortAsc = true;
            }
            sortData();
            renderTable();
        });
    });
}

function sortData() {
    currentData.sort((a, b) => {
        let valA = a[sortCol];
        let valB = b[sortCol];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
    });
}

function renderTable() {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    // Pagination Logic
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, currentData.length);
    const pageData = currentData.slice(startIndex, endIndex);

    pageData.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.discount}</td>
        `;
        tbody.appendChild(tr);
    });

    renderPagination();
    updateSortIcons();
}

function renderPagination() {
    const paginationEl = document.getElementById('pagination');
    paginationEl.innerHTML = '';

    const totalPages = Math.ceil(currentData.length / pageSize);

    if (totalPages <= 1) return;

    // First & Prev
    addPageButton('First', 1, currentPage === 1);
    addPageButton('Prev', currentPage - 1, currentPage === 1);

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        addPageButton(i, i, false, i === currentPage);
    }

    // Next & Last
    addPageButton('Next', currentPage + 1, currentPage === totalPages);
    addPageButton('Last', totalPages, currentPage === totalPages);
}

function addPageButton(text, pageNum, disabled, active = false) {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.disabled = disabled;
    if (active) btn.classList.add('active');
    
    btn.addEventListener('click', () => {
        currentPage = pageNum;
        renderTable();
    });

    document.getElementById('pagination').appendChild(btn);
}

function updateSortIcons() {
    document.querySelectorAll('th[data-sort] span').forEach(span => span.textContent = '↕');
    const activeTh = document.querySelector(`th[data-sort="${sortCol}"] span`);
    if (activeTh) {
        activeTh.textContent = sortAsc ? '↑' : '↓';
    }
}
