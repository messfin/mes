document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation Logic ---
    const navItems = document.querySelectorAll('.sidebar .nav-item');
    const sections = document.querySelectorAll('.alert-section');

    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => section.classList.remove('active'));
        // Show target section
        const target = document.getElementById(sectionId);
        if (target) target.classList.add('active');

        // Update nav
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + sectionId) {
                item.classList.add('active');
            }
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const sectionId = href.substring(1);
                showSection(sectionId);
            }
        });
    });

    // Default show first section
    if (window.location.hash) {
        showSection(window.location.hash.substring(1));
    } else {
        showSection('browser-windows');
    }

    // --- Browser Windows Logic ---
    const tabBtn = document.getElementById('tabButton');
    const windowBtn = document.getElementById('windowButton');
    const msgWindowBtn = document.getElementById('msgWindowButton');

    if (tabBtn) {
        tabBtn.addEventListener('click', () => {
            window.open('/sample-page.html', '_blank');
        });
    }

    if (windowBtn) {
        windowBtn.addEventListener('click', () => {
            window.open('/sample-page.html', '_blank', 'width=500,height=400');
        });
    }

    if (msgWindowBtn) {
        msgWindowBtn.addEventListener('click', () => {
            window.open('/sample-page.html', '_blank', 'width=300,height=200');
        });
    }

    // --- Alerts Logic ---
    const alertBtn = document.getElementById('alertButton');
    const timerAlertBtn = document.getElementById('timerAlertButton');
    const confirmBtn = document.getElementById('confirmButton');
    const promptBtn = document.getElementById('promtButton');

    if (alertBtn) {
        alertBtn.addEventListener('click', () => {
            alert('You clicked a button');
        });
    }

    if (timerAlertBtn) {
        timerAlertBtn.addEventListener('click', () => {
            setTimeout(() => {
                alert('This alert appeared after 5 seconds');
            }, 5000);
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            const result = confirm('Do you confirm action?');
            const resultSpan = document.getElementById('confirmResult');
            if (result) {
                resultSpan.textContent = 'You selected Ok';
                resultSpan.className = 'alert-success';
            } else {
                resultSpan.textContent = 'You selected Cancel';
                resultSpan.className = 'alert-danger';
            }
        });
    }

    if (promptBtn) {
        promptBtn.addEventListener('click', () => {
            const name = prompt('Please enter your name');
            const resultSpan = document.getElementById('promptResult');
            if (name) {
                resultSpan.textContent = `You entered ${name}`;
                resultSpan.className = 'alert-success';
            }
        });
    }

    // --- Modal Dialogs Logic ---
    const smallModalBtn = document.getElementById('showSmallModal');
    const largeModalBtn = document.getElementById('showLargeModal');
    const closeSmallModal = document.getElementById('closeSmallModal');
    const closeLargeModal = document.getElementById('closeLargeModal');
    const smallModal = document.getElementById('smallModal');
    const largeModal = document.getElementById('largeModal');

    function openModal(modal) {
        modal.style.display = 'flex';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    if (smallModalBtn) {
        smallModalBtn.addEventListener('click', () => openModal(smallModal));
    }

    if (largeModalBtn) {
        largeModalBtn.addEventListener('click', () => openModal(largeModal));
    }

    if (closeSmallModal) {
        closeSmallModal.addEventListener('click', () => closeModal(smallModal));
    }

    if (closeLargeModal) {
        closeLargeModal.addEventListener('click', () => closeModal(largeModal));
    }

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target === smallModal) closeModal(smallModal);
        if (e.target === largeModal) closeModal(largeModal);
    });

});
