# Books Collection API

This is a RESTful API for managing a collection of books. It allows users to create, update, delete, and retrieve books, with features like marking books as favorites and getting recommended books.

---

## Features

- Create a new book
- Update an existing book
- Delete a book by ID
- Get all books
- Get details of a single book by ID
- Mark or unmark a book as a favorite
- Fetch all favorite books
- Get a random book recommendation

---

## Tech Stack

- Node.js: Server runtime
- Express.js: Web framework
- MongoDB: NoSQL database
- Mongoose: Object Data Modeling (ODM) for MongoDB
- dotenv: Environment variable management



## Endpoints

### Books API Endpoints

| Method | Endpoint                     | Description                                    |
|--------|------------------------------|------------------------------------------------|
| GET    | `/books`                     | Get all books                                 |
| POST   | `/books`                     | Add a new book                                |
| PUT    | `/books/:id`                 | Update a book by ID                           |
| DELETE | `/books/:id`                 | Delete a book by ID                           |
| PATCH  | `/books/:id/favorite`        | Mark or unmark a book as a favorite           |
| GET    | `/books/recommended`         | Get a random recommended book                |
| GET    | `/books/favorite`            | Get all favorite books                        |

---

## Setup Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/ademecheklie/Book-collection-api.git
   cd Book-collection-api

2. Install dependencies:
```bash
     npm install

3. Configure environment variables:

Create a .env file in the root directory and add the following:

```bash
MONGO_URI = "your_mongodb_connection_string"
4. Start the server:
```bash
npm start

The server will run at http://localhost:3000.
