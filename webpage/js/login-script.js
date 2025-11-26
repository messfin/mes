document.addEventListener('DOMContentLoaded', () => {
    const userRadio = document.querySelector('input[value="user"]');
    const adminRadio = document.querySelector('input[value="admin"]');
    const modal = document.getElementById('info-modal');
    const modalBtn = document.getElementById('okayBtn');
    const signInBtn = document.getElementById('signInBtn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const termsCheckbox = document.getElementById('terms');

    // Handle User Radio Click (Show Modal)
    userRadio.addEventListener('change', () => {
        if (userRadio.checked) {
            modal.classList.add('active');
        }
    });

    // Handle Modal Close
    modalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Handle Sign In
    signInBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const username = usernameInput.value;
        const password = passwordInput.value;
        const isTermsChecked = termsCheckbox.checked;

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        if (!isTermsChecked) {
            alert("Please agree to the terms and conditions.");
            return;
        }

        // Simple validation simulation
        if (username === "mesfin" && password === "1234") {
            // Store username in localStorage for use in other pages
            localStorage.setItem('username', username);
            // Simulate successful login
            signInBtn.textContent = "Signing In...";
            setTimeout(() => {
                window.location.href = "profile.html"; // Redirect to profile page
            }, 1500);
        } else {
            alert("Incorrect username or password.");
        }
    });
});
