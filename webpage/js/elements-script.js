// Web Tables Data and Functions (global scope for hash handler access)
let users = [
    { firstName: "Cierra", lastName: "Vega", age: 39, email: "cierra@example.com", salary: 10000, department: "Insurance" },
    { firstName: "Alden", lastName: "Cantrell", age: 45, email: "alden@example.com", salary: 12000, department: "Compliance" },
    { firstName: "Kierra", lastName: "Gentry", age: 29, email: "kierra@example.com", salary: 2000, department: "Legal" }
];

function renderTable(data) {
    const tableBody = document.getElementById('table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    data.forEach((user, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.salary}</td>
            <td>${user.department}</td>
            <td>
                <button class="action-btn edit-btn" data-index="${index}">✏️</button>
                <button class="action-btn delete-btn" data-index="${index}">🗑️</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    // Attach event listeners to new buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => editUser(e.target.dataset.index));
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => deleteUser(e.target.dataset.index));
    });
}

function editUser(index) {
    const user = users[index];
    const modal = document.getElementById('registrationModal');
    document.getElementById('editIndex').value = index;
    document.getElementById('firstName').value = user.firstName;
    document.getElementById('lastName').value = user.lastName;
    document.getElementById('userEmailModal').value = user.email;
    document.getElementById('age').value = user.age;
    document.getElementById('salary').value = user.salary;
    document.getElementById('department').value = user.department;
    modal.style.display = 'block';
}

function deleteUser(index) {
    const deleteModal = document.getElementById('deleteModal');
    window.deleteIndex = index;
    deleteModal.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {

    // Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section-content');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            
            // Allow normal navigation for absolute paths (Login, Book Store, Profile, etc.)
            if (href && href.startsWith('/')) {
                return; // Let the browser handle navigation
            }
            
            // Handle hash navigation for element sections
            e.preventDefault();
            
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));

            // Add active class to clicked
            item.classList.add('active');
            
            // Show corresponding section
            const targetId = href.substring(1);
            document.getElementById(targetId).classList.add('active');
            
            // Render table if web-tables section is shown
            if (targetId === 'web-tables') {
                setTimeout(() => renderTable(users), 100);
            }
        });
    });

    // Handle initial hash on page load
    function handleHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            sections.forEach(sec => sec.classList.remove('active'));
            navItems.forEach(nav => nav.classList.remove('active'));
            
            const targetSection = document.getElementById(hash);
            const targetNav = document.querySelector(`a[href="#${hash}"]`);
            
            if (targetSection) {
                targetSection.classList.add('active');
            }
            if (targetNav) {
                targetNav.classList.add('active');
            }
            
            // Render table if web-tables section is shown
            if (hash === 'web-tables') {
                setTimeout(() => renderTable(users), 100);
            }
        }
    }
    
    // Call on load and hash change
    handleHash();
    window.addEventListener('hashchange', handleHash);

    // Text Box Logic
    const textBoxForm = document.getElementById('userForm');
    const outputBox = document.getElementById('output');

    textBoxForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const currentAddress = document.getElementById('currentAddress').value;
        const permanentAddress = document.getElementById('permanentAddress').value;

        document.getElementById('name').textContent = name;
        document.getElementById('email').textContent = email;
        document.getElementById('currentAddr').textContent = currentAddress;
        document.getElementById('permAddr').textContent = permanentAddress;

        outputBox.classList.add('visible');
    });

    // Check Box Logic
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const checkboxes = document.querySelectorAll('.checkbox-tree input[type="checkbox"]');
    const resultCheckbox = document.getElementById('selected-items');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('open');
            const children = btn.parentElement.nextElementSibling;
            if (children) {
                children.classList.toggle('hidden');
            }
        });
    });

    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const selected = Array.from(checkboxes)
                .filter(c => c.checked)
                .map(c => c.parentElement.textContent.trim())
                .join(', ');
            resultCheckbox.textContent = selected;
        });
    });

    // Radio Button Logic
    const radios = document.querySelectorAll('input[name="like"]');
    const resultRadio = document.getElementById('radio-selected');

    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                resultRadio.textContent = radio.value;
            }
        });
    });


    // Web Tables Modal Logic
    const modal = document.getElementById('registrationModal');
    const closeModal = document.querySelector('.close-modal');
    const registrationForm = document.getElementById('registrationForm');

    // Modal Logic
    document.getElementById('add-record-btn').addEventListener('click', () => {
        document.getElementById('editIndex').value = '-1';
        registrationForm.reset();
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const index = parseInt(document.getElementById('editIndex').value);
        const newUser = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('userEmailModal').value,
            age: document.getElementById('age').value,
            salary: document.getElementById('salary').value,
            department: document.getElementById('department').value
        };

        if (index === -1) {
            users.push(newUser);
        } else {
            users[index] = newUser;
        }
        
        renderTable(users);
        modal.style.display = 'none';
    });

    function editUser(index) {
        const user = users[index];
        document.getElementById('editIndex').value = index;
        document.getElementById('firstName').value = user.firstName;
        document.getElementById('lastName').value = user.lastName;
        document.getElementById('userEmailModal').value = user.email;
        document.getElementById('age').value = user.age;
        document.getElementById('salary').value = user.salary;
        document.getElementById('department').value = user.department;
        modal.style.display = 'block';
    }

    // Delete Modal Logic
    const deleteModal = document.getElementById('deleteModal');
    const closeDeleteModal = document.querySelector('.close-delete-modal');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    let deleteIndex = -1;

    function deleteUser(index) {
        deleteIndex = index;
        deleteModal.style.display = 'block';
    }

    confirmDeleteBtn.addEventListener('click', () => {
        if (deleteIndex > -1) {
            users.splice(deleteIndex, 1);
            renderTable(users);
            deleteModal.style.display = 'none';
            deleteIndex = -1;
        }
    });

    cancelDeleteBtn.addEventListener('click', () => {
        deleteModal.style.display = 'none';
        deleteIndex = -1;
    });

    closeDeleteModal.addEventListener('click', () => {
        deleteModal.style.display = 'none';
        deleteIndex = -1;
    });

    window.addEventListener('click', (e) => {
        if (e.target == deleteModal) {
            deleteModal.style.display = 'none';
            deleteIndex = -1;
        }
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    document.getElementById('search-box').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = users.filter(user => 
            user.firstName.toLowerCase().includes(term) || 
            user.lastName.toLowerCase().includes(term)
        );
        renderTable(filtered);
    });

    // Buttons Logic
    document.getElementById('doubleClickBtn').addEventListener('dblclick', () => {
        document.getElementById('doubleClickMessage').textContent = "You have done a double click";
    });

    document.getElementById('rightClickBtn').addEventListener('contextmenu', (e) => {
        e.preventDefault();
        document.getElementById('rightClickMessage').textContent = "You have done a right click";
    });

    document.getElementById('dynamicClickBtn').addEventListener('click', () => {
        document.getElementById('dynamicClickMessage').textContent = "You have done a dynamic click";
    });

    // Links Logic
    const apiLinks = ['created', 'no-content', 'moved', 'bad-request', 'unauthorized', 'forbidden', 'invalid-url'];
    const linkResponse = document.getElementById('link-response');

    apiLinks.forEach(id => {
        document.getElementById(id).addEventListener('click', () => {
            linkResponse.innerHTML = `<p>Link has sent an API call to /${id}</p><p>Status: Simulated Response</p>`;
        });
    });

    // Upload and Download Logic
    const uploadFile = document.getElementById('uploadFile');
    const uploadedFilePath = document.getElementById('uploadedFilePath');

    if (uploadFile) {
        uploadFile.addEventListener('change', (e) => {
            const fileName = e.target.files[0] ? e.target.files[0].name : '';
            if (fileName) {
                uploadedFilePath.innerHTML = `C:\\fakepath\\${fileName}`;
            }
        });
    }

    document.getElementById('downloadButton')?.addEventListener('click', () => {
        alert("Download functionality simulated.");
    });

    // Dynamic Properties Logic
    const enableAfter = document.getElementById('enableAfter');
    const colorChange = document.getElementById('colorChange');
    const visibleAfter = document.getElementById('visibleAfter');

    if (enableAfter) {
        setTimeout(() => {
            enableAfter.disabled = false;
        }, 5000);
    }

    if (colorChange) {
        setTimeout(() => {
            colorChange.classList.add('text-danger');
        }, 5000);
    }

    if (visibleAfter) {
        setTimeout(() => {
            visibleAfter.style.display = 'inline-block';
        }, 5000);
    }
});
