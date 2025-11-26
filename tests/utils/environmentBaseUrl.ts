/**
 * Environment Base URLs
 * API Endpoint: http://localhost:3000/books-api
 * Home URL: http://localhost:3000
 */
export default {
    ci: {
      prefix: 'https://demoqa',
      suffix: '.com',
    },
    local: {
      api: 'http://localhost:3000/books-api',
      home: 'http://localhost:3000',
    },
    production: {
      api: 'http://localhost:3000/books-api',
      home: 'http://localhost:3000',
    },
    staging: {
      api: 'http://localhost:3000/books-api',
      home: 'http://localhost:3000',
    },
};
  