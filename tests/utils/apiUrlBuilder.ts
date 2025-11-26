import apiPath from './apiPaths';
import baseAPIUrl from './environmentBaseUrl';
import endpoints from './apiEndpoints';

function bindUrl(endpoint: string, env: string, userId?: string, isbn?: string) {
  // Parse endpoint: e.g., "api.books.books/post" -> ["api", "books", "books"]
  const parts = endpoint.replace(/\/.+$/, '').split('.');
  
  const endpointParts: string[] = [];
  const envKey = (env && env in baseAPIUrl && env !== 'ci') ? env : 'local';
  const envConfig = baseAPIUrl[envKey as keyof typeof baseAPIUrl];
  const baseUrl = (typeof envConfig === 'object' && 'api' in envConfig) 
    ? envConfig.api 
    : baseAPIUrl.local.api;
  
  // Add base URL
  endpointParts.push(baseUrl);
  
  // Handle nested path structure: api.account.user, api.books.books, etc.
  if (parts.length >= 3) {
    const category = parts[1]; // account or books
    const subCategory = parts[2]; // user, books, book, generateToken, authorized
    
    const categoryPaths = apiPath[category as keyof typeof apiPath];
    if (categoryPaths && typeof categoryPaths === 'object') {
      const path = categoryPaths[subCategory as keyof typeof categoryPaths];
      if (path) {
        endpointParts.push(path);
      }
    }
  } else if (parts.length === 2) {
    // Fallback for old format: api.books -> BookStore/v1/Books
    const category = parts[1];
    const categoryPath = apiPath[category as keyof typeof apiPath];
    if (typeof categoryPath === 'string') {
      endpointParts.push(categoryPath);
    } else if (typeof categoryPath === 'object' && categoryPath.books) {
      endpointParts.push(categoryPath.books);
    }
  }
        
  // Add userId for account endpoints that need it
  if (endpoint === endpoints.account.getUser || endpoint === endpoints.account.deleteUser) {
    if (userId) {
      endpointParts.push(userId);
    }
  }
  
  // Add ISBN for PUT book endpoint: PUT /BookStore/v1/Books/{ISBN}
  if (endpoint === endpoints.books.put && isbn) {
    endpointParts.push(isbn);
  }

  return endpointParts.join('/');
}

function searchParamsForUrl(page: string, userId?: string, isbn?: string) {
  let queryParams: Record<string, string> = {};

  switch (page) {
    case endpoints.books.deleteAll:
      if (userId) {
        queryParams = { UserId: userId };
      }
      break;
    case endpoints.books.getByIsbn:
      if (isbn) {
        queryParams = { ISBN: isbn };
      }
      break;
    default:
      queryParams = {};
  }

  return new URLSearchParams(queryParams).toString();
}

export function buildUrl(endpoint: string, userId?: string, isbn?: string) {
  const env = process.env.ENV || 'local';
  const url = [
    bindUrl(endpoint, env, userId, isbn),
    searchParamsForUrl(endpoint, userId, isbn),
  ]
  .filter(Boolean)
  .join('?');
  
  return url;
}

/**
 * API URL Builder - Based on DemoQA Swagger Documentation (https://demoqa.com/swagger/#/)
 * 
 * Examples:
 * 
 * Delete all books:
 *   endpoint: endpoints.books.deleteAll
 *   endpoint string: 'api.books.books/delete'
 *   parts: [ 'api', 'books', 'books' ]
 *   endpointParts: [ 'https://demoqa.com', 'BookStore/v1/Books' ]
 *   queryParams: { UserId: '1117e3d4-9f6e-45a7-a8a9-db3ecf7b9603' }
 *   final URL: https://demoqa.com/BookStore/v1/Books?UserId=1117e3d4-9f6e-45a7-a8a9-db3ecf7b9603
 * 
 * Add book to collection:
 *   endpoint: endpoints.books.post
 *   endpoint string: 'api.books.books/post'
 *   final URL: https://demoqa.com/BookStore/v1/Books
 * 
 * Get user by ID:
 *   endpoint: endpoints.account.getUser
 *   endpoint string: 'api.account.user/get'
 *   final URL: https://demoqa.com/Account/v1/User/{userId}
 * 
 * Get book by ISBN:
 *   endpoint: endpoints.books.getByIsbn
 *   endpoint string: 'api.books.book/get'
 *   queryParams: { ISBN: '9781449365035' }
 *   final URL: https://demoqa.com/BookStore/v1/Book?ISBN=9781449365035
 */
