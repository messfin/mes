document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation Logic ---
    const navItems = document.querySelectorAll('.sidebar .nav-item');
    const sections = document.querySelectorAll('.interaction-section');

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
        showSection('sortable');
    }


    // --- Tab Logic ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Find parent container to scope the tab switch
            const container = btn.closest('.interaction-section');
            const targetId = btn.getAttribute('data-target');
            
            // Remove active class from buttons in this container
            container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Hide all tab contents in this container
            container.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            // Show target content
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add('active');
        });
    });


    // --- Sortable Logic ---
    const sortableLists = [document.getElementById('sortable-list'), document.getElementById('sortable-grid')];
    let draggedItem = null;

    sortableLists.forEach(list => {
        if (list) {
            list.addEventListener('dragstart', (e) => {
                draggedItem = e.target;
                e.target.classList.add('dragging');
            });

            list.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
                draggedItem = null;
            });

            list.addEventListener('dragover', (e) => {
                e.preventDefault();
                const afterElement = getDragAfterElement(list, e.clientY, e.clientX); // Pass X for grid support
                if (afterElement == null) {
                    list.appendChild(draggedItem);
                } else {
                    list.insertBefore(draggedItem, afterElement);
                }
            });
        }
    });

    function getDragAfterElement(container, y, x) {
        const draggableElements = [...container.querySelectorAll('.sortable-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            // Simple distance calculation for grid support
            const offsetX = x - box.left - box.width / 2;
            const offsetY = y - box.top - box.height / 2;
            
            // We use a simplified approach here. For a robust grid sort, libraries are usually better.
            // But for this demo, checking Y offset is primary for lists, and we can add X for grids if needed.
            // For now, let's stick to the previous logic which works well for lists and "okay" for grids flowing.
            // Actually, let's improve it slightly for grids by using Euclidean distance to center.
            
            const distance = Math.hypot(x - (box.left + box.width / 2), y - (box.top + box.height / 2));
            
            if (distance < closest.distance) {
                return { distance: distance, element: child };
            } else {
                return closest;
            }
        }, { distance: Number.POSITIVE_INFINITY }).element;
    }


    // --- Selectable Logic ---
    const selectableLists = [document.getElementById('selectable-list'), document.getElementById('selectable-grid')];
    
    selectableLists.forEach(list => {
        if (list) {
            list.addEventListener('click', (e) => {
                if (e.target.classList.contains('selectable-item')) {
                    e.target.classList.toggle('active');
                }
            });
        }
    });


    // --- Resizable Logic ---
    const resizableBox = document.getElementById('resizableBox');
    const resizeHandle = document.querySelector('.resize-handle');

    if (resizeHandle) {
        let isResizing = false;
        let originalWidth, originalHeight, originalMouseX, originalMouseY;

        resizeHandle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isResizing = true;
            originalWidth = parseFloat(getComputedStyle(resizableBox, null).getPropertyValue('width').replace('px', ''));
            originalHeight = parseFloat(getComputedStyle(resizableBox, null).getPropertyValue('height').replace('px', ''));
            originalMouseX = e.pageX;
            originalMouseY = e.pageY;
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        });

        function resize(e) {
            if (isResizing) {
                const width = originalWidth + (e.pageX - originalMouseX);
                const height = originalHeight + (e.pageY - originalMouseY);
                
                // Min/Max constraints are handled by CSS min-width/max-width but good to enforce here too
                if (width > 100 && width < 500) resizableBox.style.width = width + 'px';
                if (height > 100 && height < 500) resizableBox.style.height = height + 'px';
            }
        }

        function stopResize() {
            isResizing = false;
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResize);
        }
    }


    // --- Droppable Logic ---
    const draggableSource = document.getElementById('draggableSource');
    const dropTarget = document.getElementById('dropTarget');

    if (draggableSource && dropTarget) {
        draggableSource.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', 'dropped');
            e.target.style.opacity = '0.5';
        });

        draggableSource.addEventListener('dragend', (e) => {
            e.target.style.opacity = '1';
        });

        dropTarget.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropTarget.classList.add('drag-over');
        });

        dropTarget.addEventListener('dragleave', (e) => {
            dropTarget.classList.remove('drag-over');
        });

        dropTarget.addEventListener('drop', (e) => {
            e.preventDefault();
            dropTarget.classList.remove('drag-over');
            const data = e.dataTransfer.getData('text/plain');
            if (data === 'dropped') {
                dropTarget.classList.add('dropped');
                // Clear the drop target and move the draggable element into it
                dropTarget.innerHTML = '';
                dropTarget.appendChild(draggableSource);
                draggableSource.style.opacity = '1';
                draggableSource.style.display = 'block';
            }
        });
    }


    // --- Draggable Logic ---
    const dragBox = document.getElementById('dragBox');
    const dragArea = document.querySelector('.draggable-area');

    if (dragBox) {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        dragBox.addEventListener('mousedown', dragStart);
        window.addEventListener('mouseup', dragEnd);
        window.addEventListener('mousemove', drag);

        function dragStart(e) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;

            if (e.target === dragBox) {
                isDragging = true;
            }
        }

        function dragEnd(e) {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                xOffset = currentX;
                yOffset = currentY;

                setTranslate(currentX, currentY, dragBox);
            }
        }

        function setTranslate(xPos, yPos, el) {
            // Boundary checks could be added here
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }
    }

});
