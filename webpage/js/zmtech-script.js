document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.querySelector('h3').textContent;
            
            if (category === 'Elements') {
                window.location.href = '/elements';
            } else if (category === 'Book Store Application') {
                window.location.href = '/books';
            } else if (category === 'Forms') {
                window.location.href = '/forms';
            } else if (category === 'Alerts, Frame & Windows') {
                window.location.href = '/alerts';
            } else if (category === 'Widgets') {
                window.location.href = '/widgets';
            } else if (category === 'Interactions') {
                window.location.href = '/interactions';
            } else {
                alert(`You clicked on ${category}. This section is under construction in this local demo.`);
            }
        });
    });
});
