document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('practiceForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');
    const fileInput = document.getElementById('picture');
    const fileName = document.getElementById('fileName');

    // File upload display
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                fileName.textContent = e.target.files[0].name;
            } else {
                fileName.textContent = 'No file chosen';
            }
        });
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {};
            
            // Process form data
            data.studentName = `${formData.get('firstName')} ${formData.get('lastName')}`;
            data.email = formData.get('email');
            data.gender = formData.get('gender') || 'Not specified';
            data.mobile = formData.get('mobile');
            data.dateOfBirth = formData.get('dateOfBirth');
            data.subjects = formData.get('subjects');
            
            // Get hobbies
            const hobbies = [];
            document.querySelectorAll('input[name="hobbies"]:checked').forEach(checkbox => {
                hobbies.push(checkbox.value);
            });
            data.hobbies = hobbies.join(', ') || 'None';
            
            data.picture = fileInput.files.length > 0 ? fileInput.files[0].name : 'No file chosen';
            data.currentAddress = formData.get('currentAddress');
            data.state = formData.get('state');
            data.city = formData.get('city');
            
            // Display in modal
            displaySuccessModal(data);
        });
    }

    function displaySuccessModal(data) {
        // Populate modal table
        document.getElementById('modalStudentName').textContent = data.studentName;
        document.getElementById('modalEmail').textContent = data.email;
        document.getElementById('modalGender').textContent = data.gender;
        document.getElementById('modalMobile').textContent = data.mobile;
        document.getElementById('modalDOB').textContent = data.dateOfBirth;
        document.getElementById('modalSubjects').textContent = data.subjects;
        document.getElementById('modalHobbies').textContent = data.hobbies;
        document.getElementById('modalPicture').textContent = data.picture;
        document.getElementById('modalAddress').textContent = data.currentAddress;
        document.getElementById('modalStateCity').textContent = `${data.state} ${data.city}`;
        
        // Show modal
        successModal.style.display = 'flex';
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            successModal.style.display = 'none';
            form.reset();
            fileName.textContent = 'No file chosen';
        });
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.style.display = 'none';
            form.reset();
            fileName.textContent = 'No file chosen';
        }
    });

});
