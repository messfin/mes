const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Routes for specific pages (optional, but good for clean URLs)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web.html'));
});

app.get('/offers', (req, res) => {
    res.sendFile(path.join(__dirname, 'offers.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/demoqa', (req, res) => {
    res.sendFile(path.join(__dirname, 'demoqa.html'));
});

app.get('/elements', (req, res) => {
    res.sendFile(path.join(__dirname, 'elements.html'));
});

app.get('/books', (req, res) => {
    res.sendFile(path.join(__dirname, 'books.html'));
});

app.get('/bookStore', (req, res) => {
    res.sendFile(path.join(__dirname, 'books.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'profile.html'));
});

app.get('/books-api', (req, res) => {
    res.sendFile(path.join(__dirname, 'books-api.html'));
});

app.get('/forms', (req, res) => {
    res.sendFile(path.join(__dirname, 'forms.html'));
});

app.get('/alerts', (req, res) => {
    res.sendFile(path.join(__dirname, 'alerts.html'));
});

app.get('/widgets', (req, res) => {
    res.sendFile(path.join(__dirname, 'widgets.html'));
});

app.get('/interactions', (req, res) => {
    res.sendFile(path.join(__dirname, 'interactions.html'));
});

// Mock API endpoints for testing
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    if (req.method === 'POST') {
        console.log(JSON.stringify(req.body));
    }
    next();
});

const allBooks = [
    {
        isbn: "9781449337711",
        title: "Designing Evolvable Web APIs with ASP.NET",
        subTitle: "Harnessing the Power of the Web",
        author: "Glenn Block et al.",
        publish_date: "2020-06-04T09:12:43.000Z",
        publisher: "O'Reilly Media",
        pages: 238,
        description: "Design and build Web APIs for a broad range of clients—including browsers and mobile devices—that can adapt to change over time. This practical, hands-on guide takes you through the theory and tools you need to build evolvable HTTP services with Microsoft",
        website: "http://chimera.labs.oreilly.com/books/1234000001708/index.html"
    },
    {
        isbn: "9781449331818",
        title: "Learning JavaScript Design Patterns",
        subTitle: "A JavaScript and jQuery Developer's Guide",
        author: "Addy Osmani",
        publish_date: "2020-06-04T09:11:40.000Z",
        publisher: "O'Reilly Media",
        pages: 254,
        description: "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-da",
        website: "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/"
    },
    {
        isbn: "9781449365035",
        title: "Speaking JavaScript",
        subTitle: "An In-Depth Guide for Programmers",
        author: "Axel Rauschmayer",
        publish_date: "2014-02-01T00:00:00.000Z",
        publisher: "O'Reilly Media",
        pages: 460,
        description: "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer with once-simple-now-complex language.",
        website: "http://speakingjs.com/"
    }
];

// Initialize mockBooks with the first two books
let mockBooks = [allBooks[0], allBooks[1]];

// DELETE all books for a user (clear mockBooks)
app.delete('/books-api/BookStore/v1/Books', (req, res) => {
    mockBooks = [];
    res.status(204).send();
});

// POST add book to collection (store in mockBooks)
app.post('/books-api/BookStore/v1/Books', (req, res) => {
    const userId = req.body.userId;
    const isbn = Array.isArray(req.body.collectionOfIsbns) && req.body.collectionOfIsbns[0]?.isbn;
    
    // Check if book already exists (ignoring userId for test stability)
    const exists = mockBooks.some(b => b.isbn === isbn);
    if (exists) {
        return res.status(400).json({ 
            code: "1210", 
            message: "Book already present in the your collection!" 
        });
    }
  const book = allBooks.find(b => b.isbn === isbn);
  if (book) {
    // Add book to collection
    mockBooks.push(book);
    res.json(book);
  } else {
    res.status(404).json({ code: "1205", message: "ISBN not found" });
  }
});

app.get('/books-api/BookStore/v1/Books', (req, res) => {
  const sorted = [...mockBooks].sort((a, b) => a.title.localeCompare(b.title));
  res.json({ books: sorted });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`- Practice Page: http://localhost:${PORT}/web.html`);
    console.log(`- Offers Page:   http://localhost:${PORT}/offers.html`);
    console.log(`- Login Page:    http://localhost:${PORT}/login.html`);
    console.log(`- DemoQA Page:   http://localhost:${PORT}/demoqa.html`);
    console.log(`- Elements Page: http://localhost:${PORT}/elements.html`);
    console.log(`- Books Page:    http://localhost:${PORT}/books.html`);
});
