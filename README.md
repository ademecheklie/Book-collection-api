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
- JWT: Secure token-based authentication


## Endpoints

### Authentication Endpoints

| Method | Endpoint     | Description                         |
|--------|--------------|-------------------------------------|
| POST   | `/auth/signup` | Register a new user                |
| POST   | `/auth/login`  | Authenticate a user and get a token|


### Books API Endpoints


| Method | Endpoint                     | Description                                    |
|--------|------------------------------|------------------------------------------------|
| GET    | `/books/all`                     | Get all books(requires `admin` role)   |      
| GET    | `/books`                     | Get all books a user marked as favorite(requires `user` role)                          |
| POST   | `/books`                     | Add a new book (requires `user` role)        |
| PUT    | `/books/:id`                 | Update a book by ID (requires `user` role)   |
| DELETE | `/books/:id`                 | Delete a book by ID   |
| PATCH  | `/books/:id/favorite`        | Mark or unmark a book as a favorite (requires `user` role )          |
| GET    | `/books/recommended`         | Get a random recommended book              |   
| GET    | `/books/:id`                     | Get a book by id    |
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

- **Sign Up a New User**
  - `POST /auth/signup`
  - Example Request:
    ```http
    POST https://book-collection-api-one.vercel.app/auth/signup
    Content-Type: application/json

    {
      "name": "John Doe",
      "username": "johndoe",
      "email": "johndoe@example.com",
      "password": "password123",
      "role": "user"
    }
    ```

- **Log In a User**
  - `POST /auth/login`
  - Example Request:
    ```http
    POST https://book-collection-api-one.vercel.app/auth/login
    Content-Type: application/json

    {
      "username": "johndoe",
      "password": "password123"
    }
    ```

### Books

- **Get All Books**
  - `GET /books/all`
  - Requires authentication and admin role
  - Example Request:
    ```http
    GET https://book-collection-api-one.vercel.app/books
    Authorization:  your.jwt.token
    ```

- **Create a New Book**
  - `POST /books`
  - Requires authentication and user role
  - Example Request:
    ```http
    POST https://book-collection-api-one.vercel.app/books
    Authorization: your.jwt.token
    Content-Type: application/json

    {
      "title": "The Pragmatic Programmer",
      "author": "Andrew Hunt",
      "isbn": "9780201616224",
      "publishedYear": 1999
    }
    ```

- **Update a Book by ID**
  - `PUT /books/:id`
  - Requires authentication and user role
  - Example Request:
    ```http
    PUT https://book-collection-api-one.vercel.app/books/60c72b2f9b1d8c001c8e4b8e
    Authorization:  your.jwt.token
    Content-Type: application/json

    {
      "title": "The Pragmatic Programmer (Updated Edition)",
      "author": "Andrew Hunt",
      "isbn": "9780201616224",
      "publishedYear": 1999
    }
    ```

- **Delete a Book by ID**
  - `DELETE /books/:id`
  - Requires authentication and user/admin role
  - Example Request:
    ```http
    DELETE https://book-collection-api-one.vercel.app/books/60c72b2f9b1d8c001c8e4b8e
    Authorization:  your.jwt.token
    ```

- **Toggle Favorite Status of a Book**
  - `PATCH /books/:id/favorite`
  - Requires authentication and user role
  - Example Request:
    ```http
    PATCH https://book-collection-api-one.vercel.app/books/60c72b2f9b1d8c001c8e4b8e/favorite
    Authorization:  your.jwt.token
    ```

- **Get a Recommended Book**
  - `GET /books/recommended`
  - Requires authentication
  - Example Request:
    ```http
    GET https://book-collection-api-one.vercel.app/books/recommended
    Authorization:  your.jwt.token.
    ```

- **Get All Favorite Books**
  - `GET /books/`
  - Requires authentication and user role
  - Example Request:
    ```http
    GET https://book-collection-api-one.vercel.app/books/favorite
    Authorization: your.jwt.token.here
    ```

- **Get a Book by ID**
  - `GET /books/:id`
  - Requires authentication
  - Example Request:
    ```http
    GET https://book-collection-api-one.vercel.app/books/60c72b2f9b1d8c001c8e4b8e
    Authorization:  your.jwt.token.
    ```

## Models

### User

- `id` - The auto-generated ID of the user
- `name` - The name of the user
- `username` - The username of the user
- `email` - The email of the user
- `password` - The password of the user
- `role` - The role of the user (admin/user) default is user

### Book

- `id` - The auto-generated ID of the book
- `title` - The title of the book
- `author` - The author of the book
- `isbn` - The ISBN of the book
- `publishedYear` - The published year of the book
- `createdBy` - The ID of the user who created the book
- `isFavorite` - The favorite status of the book default is false

## Authorization

For protected endpoints, include the `Authorization` header with your JWT token:

```http
Authorization:  your.jwt.token
