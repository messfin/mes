const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde",
    "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
    "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
    "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
    "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece",
    "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
    "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan",
    "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
    "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
    "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama",
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
    "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
    "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

document.addEventListener('DOMContentLoaded', () => {
    // Auto Suggest Logic
    const suggestInput = document.getElementById('autocomplete');
    const suggestionsList = document.getElementById('suggestions-list');

    suggestInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        suggestionsList.innerHTML = '';
        
        if (value.length > 0) {
            const filtered = countries.filter(c => c.toLowerCase().startsWith(value));
            
            if (filtered.length > 0) {
                suggestionsList.classList.add('active');
                filtered.forEach(country => {
                    const div = document.createElement('div');
                    div.classList.add('suggestion-item');
                    div.textContent = country;
                    div.addEventListener('click', () => {
                        suggestInput.value = country;
                        suggestionsList.classList.remove('active');
                    });
                    suggestionsList.appendChild(div);
                });
            } else {
                suggestionsList.classList.remove('active');
            }
        } else {
            suggestionsList.classList.remove('active');
        }
    });

    // Hide click outside
    document.addEventListener('click', (e) => {
        if (e.target !== suggestInput) {
            suggestionsList.classList.remove('active');
        }
    });

    // Alert & Confirm Logic
    const nameInput = document.getElementById('name');
    
    document.getElementById('alertbtn').addEventListener('click', () => {
        const name = nameInput.value || "User";
        alert(`Hello ${name}, share this practice page and share your knowledge`);
    });

    document.getElementById('confirmbtn').addEventListener('click', () => {
        const name = nameInput.value || "User";
        const result = confirm(`Hello ${name}, Are you sure you want to confirm?`);
        console.log(result ? "Confirmed" : "Cancelled");
    });

    // Hide / Show Logic
    const displayedText = document.getElementById('displayed-text');
    
    document.getElementById('hide-textbox').addEventListener('click', () => {
        displayedText.style.display = 'none';
    });

    document.getElementById('show-textbox').addEventListener('click', () => {
        displayedText.style.display = 'block';
    });

    // Window / Tab Logic (Simulation)
    document.getElementById('openwindow').addEventListener('click', () => {
        window.open('http://www.google.com', '_blank', 'width=800,height=600');
    });

    document.getElementById('opentab').addEventListener('click', () => {
        window.open('https://rahulshettyacademy.com/', '_blank');
    });
});
