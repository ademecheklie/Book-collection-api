# Books Collection API

This is a RESTful API for managing a collection of books. It allows users to perform CRUD operations, manage favorite books, get personalized recommendations, and offers authentication and role-based access control.

---

## Features

-CRUD Operations:
Add, update, retrieve, and delete books.

-Favorites Management:
Mark or unmark books as favorites.
Fetch all favorite books.

-Recommendations:
Get a random book recommendation.

-Authentication and Authorization
-User Authentication:
JWT-based authentication for secure access.
Signup and login endpoints for user management.
-Role-Based Access Control (RBAC):
Restricts certain operations based on user roles (admin, user).

---

## Data Validation

The following fields are required and validated when creating or updating a book:

- title: Must be a non-empty string.
- author: Must be a non-empty string.
- isbn: Must be a valid ISBN number.
- publishedYear: Must be a valid year.

## Tech Stack

- Node.js: Server runtime
- Express.js: Web framework for node.js
- MongoDB: NoSQL database
- Mongoose: Object Data Modeling (ODM) for MongoDB
- dotenv: Environment variable management
- Vercel: Deployment platform
-JWT: Secure token-based authentication


## Endpoints

### Authentication Endpoints

| Method | Endpoint     | Description                         |
|--------|--------------|-------------------------------------|
| POST   | `/auth/signup` | Register a new user                |
| POST   | `/auth/login`  | Authenticate a user and get a token|


### Books API Endpoints


| Method | Endpoint                     | Description                                    |
|--------|------------------------------|------------------------------------------------|
| GET    | `/books/all`                     | Get all books(requires `admin` role)                             |
| POST   | `/books`                     | Add a new book (requires `user` role)        |
| PUT    | `/books/:id`                 | Update a book by ID (requires `user` role)   |
| DELETE | `/books/:id`                 | Delete a book by ID   |
| PATCH  | `/books/:id/favorite`        | Mark or unmark a book as a favorite           |
| GET    | `/books/recommended`         | Get a random recommended book                 |
| GET    | `/books/favorite`            | Get all favorite books                        |

---

## Setup Instructions

1. Clone this repository:

 git clone https://github.com/ademecheklie/Book-collection-api.git
cd Book-collection-api

2. Install dependencies:

     npm install

3. Configure environment variables:

Create a .env file in the root directory and add the following:
- MONGO_URI = "your_mongodb_connection_string"
- PORT = 5000
- SECRET = "your_jwt_secrew_key"

4. Start the server:

npm start

## Deployment

The API is live and accessible at:
Base URL: https://book-collection-api-one.vercel.app/

## API Endpoints and Usage Examples

### Authentication

#### Register a User
- POST `/auth/signup`
- Example Request:
  {
    "username": "john_doe",
    "email": "user@example.com"
    "password": "securepassword",
    "role": "user"
  }


#### Login
- POST `/auth/login`
- Example Request:
  {
    "username": "john_doe",
    "password": "securepassword"
  }


### Fetch All Books  (Admin role required)
- GET /books/all
- Fetch all books in the collection.
- Example Request:
 - GET https://book-collection-api-one.vercel.app/books

### Add a New Book  (user role required)
- POST /books
- Add a new book to the collection. Requires title, author, isbn, and publishedYear.
- Example Request:
 - POST https://book-collection-api-one.vercel.app/books 
- {
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "isbn": "9780061127865",
    "publishedYear": 1999
}

### Update a Book (user role required)
- PUT /books/:id
- Update a book's details by ID.
- Example Request:
 - PUT https://book-collection-api-one.vercel.app/books/<book_id>
- {
    "title": "The Alchemist - Updated",
    "author": "Paulo Coelho",
    "isbn": "9780061122415",
    "publishedYear": 1989
}

### Delete a Book
- DELETE /books/:id
- Remove a book from the collection by its ID.
- Example Request:
- DELETE https://book-collection-api-one.vercel.app/books/<book_id>

### Mark or Unmark a Book as Favorite
- PATCH /books/:id/favorite
- Toggle the isFavorite status of a book by its ID.
- Example Request:
 - PATCH https://book-collection-api-one.vercel.app/books/<book_id>/favorite

### Fetch All Favorite Books (user role required)
- GET /books/favorite
- Retrieve all books marked as favorites.
- Example Request:
 - GET https://book-collection-api-one.vercel.app/books/favorite

### Get a Random Book Recommendation
- GET /books/recommended
- Fetch a randomly selected book from the collection.
- Example Request:
 - GET https://book-collection-api-one.vercel.app/books/recommended

## Authorization
For protected endpoints, include the `Authorization` header with your JWT token:
```http
Authorization: Bearer your.jwt.token.here
```
