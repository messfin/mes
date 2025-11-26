export default {
  books: {
    // GET /BookStore/v1/Books - Get all books
    getAll: 'api.books.books/get',
    // GET /BookStore/v1/Book?ISBN={isbn} - Get book by ISBN
    getByIsbn: 'api.books.book/get',
    // POST /BookStore/v1/Books - Add books to collection
    post: 'api.books.books/post',
    // PUT /BookStore/v1/Books/{ISBN} - Replace book in collection
    put: 'api.books.books/put',
    // DELETE /BookStore/v1/Books?UserId={userId} - Delete all books
    deleteAll: 'api.books.books/delete',
    // DELETE /BookStore/v1/Book - Delete book by ISBN
    delete: 'api.books.book/delete',
  },
  account: {
    // POST /Account/v1/User - Create user
    createUser: 'api.account.user/post',
    // GET /Account/v1/User/{userId} - Get user by ID
    getUser: 'api.account.user/get',
    // DELETE /Account/v1/User/{userId} - Delete user
    deleteUser: 'api.account.user/delete',
    // POST /Account/v1/GenerateToken - Generate token
    generateToken: 'api.account.generateToken/post',
    // POST /Account/v1/Authorized - Authorized
    authorized: 'api.account.authorized/post',
  }
};
