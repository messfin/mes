// Books data matching DemoQA books
const books = [
    {
        isbn: "9781449325862",
        title: "Git Pocket Guide",
        subTitle: "A Working Introduction",
        author: "Richard E. Silverman",
        publish_date: "2020-06-04T08:48:39.000Z",
        publisher: "O'Reilly Media",
        pages: 234,
        description: "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system.",
        website: "http://chimera.labs.oreilly.com/books/1230000000561/index.html",
        image: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    },
    {
        isbn: "9781449331818",
        title: "Learning JavaScript Design Patterns",
        subTitle: "A JavaScript and jQuery Developer's Guide",
        author: "Addy Osmani",
        publish_date: "2020-06-04T09:11:40.000Z",
        publisher: "O'Reilly Media",
        pages: 254,
        description: "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript.",
        website: "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/",
        image: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    },
    {
        isbn: "9781449337711",
        title: "Designing Evolvable Web APIs with ASP.NET",
        subTitle: "Harnessing the Power of the Web",
        author: "Glenn Block et al.",
        publish_date: "2020-06-04T09:12:43.000Z",
        publisher: "O'Reilly Media",
        pages: 238,
        description: "Design and build Web APIs for a broad range of clients—including browsers and mobile devices.",
        website: "http://chimera.labs.oreilly.com/books/1234000001708/index.html",
        image: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    },
    {
        isbn: "9781449365035",
        title: "Speaking JavaScript",
        subTitle: "An In-Depth Guide for Programmers",
        author: "Axel Rauschmayer",
        publish_date: "2014-02-01T00:00:00.000Z",
        publisher: "O'Reilly Media",
        pages: 460,
        description: "Like it or not, JavaScript is everywhere these days, from browser to server to mobile.",
        website: "http://speakingjs.com/",
        image: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    },
    {
        isbn: "9781491904244",
        title: "You Don't Know JS",
        subTitle: "ES6 & Beyond",
        author: "Kyle Simpson",
        publish_date: "2015-12-27T00:00:00.000Z",
        publisher: "O'Reilly Media",
        pages: 278,
        description: "No matter how much experience you have with JavaScript, odds are you don't fully understand the language.",
        website: "https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20&%20beyond",
        image: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    },
    {
        isbn: "9781491950296",
        title: "Programming JavaScript Applications",
        subTitle: "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
        author: "Eric Elliott",
        publish_date: "2014-07-01T00:00:00.000Z",
        publisher: "O'Reilly Media",
        pages: 254,
        description: "Take advantage of JavaScript's power to build robust web-scale or enterprise applications.",
        website: "http://chimera.labs.oreilly.com/books/1234000000262/index.html",
        image: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    },
    {
        isbn: "9781593275846",
        title: "Eloquent JavaScript, Second Edition",
        subTitle: "A Modern Introduction to Programming",
        author: "Marijn Haverbeke",
        publish_date: "2014-12-14T00:00:00.000Z",
        publisher: "No Starch Press",
        pages: 472,
        description: "JavaScript lies at the heart of almost every modern web application.",
        website: "http://eloquentjavascript.net/",
        image: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    },
    {
        isbn: "9781593277574",
        title: "Understanding ECMAScript 6",
        subTitle: "The Definitive Guide for JavaScript Developers",
        author: "Nicholas C. Zakas",
        publish_date: "2016-09-03T00:00:00.000Z",
        publisher: "No Starch Press",
        pages: 352,
        description: "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language.",
        website: "https://leanpub.com/understandinges6/read",
        image: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    }
];

// Check if we're viewing a specific book
const urlParams = new URLSearchParams(window.location.search);
const bookIsbn = urlParams.get('book');

if (bookIsbn) {
    // Show book detail view
    showBookDetail(bookIsbn);
} else {
    // Show book list view
    showBookList();
}

function showBookDetail(isbn) {
    const book = books.find(b => b.isbn === isbn);
    if (!book) {
        document.body.innerHTML = '<h1>Book not found</h1>';
        return;
    }

    const contentArea = document.querySelector('.content-area');
    if (!contentArea) return;

    contentArea.innerHTML = `
        <div class="content-header">
            <h2>${book.title}</h2>
        </div>

        <div class="book-detail" style="max-width: 800px;">
            <div style="display: grid; grid-template-columns: 200px 1fr; gap: 2rem; margin-bottom: 2rem;">
                <div>
                    <img src="${book.image}" alt="${book.title}" style="width: 100%; border-radius: 8px;" onerror="this.src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'">
                </div>
                <div>
                    <div id="title-wrapper" style="margin-bottom: 1rem;">
                        <label style="color: var(--text-secondary); font-size: 0.9rem;">Title</label>
                        <div id="userName-value" style="color: var(--text-primary); font-size: 1.1rem;">${book.title}</div>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="color: var(--text-secondary); font-size: 0.9rem;">Sub Title</label>
                        <div style="color: var(--text-primary);">${book.subTitle}</div>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="color: var(--text-secondary); font-size: 0.9rem;">Author</label>
                        <div style="color: var(--text-primary);">${book.author}</div>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="color: var(--text-secondary); font-size: 0.9rem;">Publisher</label>
                        <div style="color: var(--text-primary);">${book.publisher}</div>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="color: var(--text-secondary); font-size: 0.9rem;">Pages</label>
                        <div style="color: var(--text-primary);">${book.pages}</div>
                    </div>
                    
                    <div id="ISBN-wrapper" style="margin-bottom: 1rem;">
                        <label style="color: var(--text-secondary); font-size: 0.9rem;">ISBN</label>
                        <div style="color: var(--text-primary);">${book.isbn}</div>
                    </div>
                </div>
            </div>

            <div style="margin-bottom: 2rem;">
                <label style="color: var(--text-secondary); font-size: 0.9rem;">Description</label>
                <div style="color: var(--text-primary); line-height: 1.6;">${book.description}</div>
            </div>

            <div style="margin-bottom: 2rem;">
                <label style="color: var(--text-secondary); font-size: 0.9rem;">Website</label>
                <div><a href="${book.website}" target="_blank" style="color: var(--accent-primary);">${book.website}</a></div>
            </div>

            <div style="display: flex; gap: 1rem;">
                <button id="add-to-collection-btn" class="primary-btn">Add To Your Collection</button>
                <button id="back-to-store-btn" class="primary-btn" style="background: var(--bg-secondary);">Back To Book Store</button>
            </div>
        </div>
    `;

    // Add event listeners
    document.getElementById('add-to-collection-btn').addEventListener('click', async () => {
        // Get username from localStorage, profile, or use default
        let username = localStorage.getItem('username') || 'mesfin';
        
        try {
            const response = await fetch('/books-api/BookStore/v1/Books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: username,
                    collectionOfIsbns: [{ isbn: bookIsbn }]
                })
            });
            
            if (response.ok) {
                alert('Book added to your collection!');
            } else {
                const errorData = await response.json();
                if (errorData.message) {
                    alert(errorData.message);
                } else {
                    alert('Failed to add book to collection.');
                }
            }
        } catch (error) {
            console.error('Error adding book:', error);
            alert('An error occurred while adding the book.');
        }
    });

    document.getElementById('back-to-store-btn').addEventListener('click', () => {
        window.location.href = '/books';
    });
}

function showBookList() {
    // Render books table
    function renderBooks(booksToRender) {
        const tableBody = document.getElementById('table-body');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        booksToRender.forEach(book => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${book.image}" alt="${book.title}" style="width: 50px; height: auto;" onerror="this.src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'"></td>
                <td><a href="/books?book=${book.isbn}" class="book-link">${book.title}</a></td>
                <td>${book.author}</td>
                <td>${book.publisher}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // Initial render
    renderBooks(books);
    
    // Search box
    const searchBox = document.getElementById('search-box');
    if (searchBox) {
        searchBox.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredBooks = books.filter(book => 
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm) ||
                book.publisher.toLowerCase().includes(searchTerm)
            );
            renderBooks(filteredBooks);
        });
    }
    
    // Login button
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = '/login';
        });
    }
}
