# Books Collection API

This is a RESTful API for managing a collection of books. It allows users to create, update, delete, and retrieve books, with features like marking books as favorites and getting recommended books.

---

## Features

-CRUD Operations:
Add, update, retrieve, and delete books.

-Favorites Management:
Mark or unmark books as favorites.
Fetch all favorite books.

-Recommendations:
Get a random book recommendation.

---

## Data Validation

The following fields are required and validated when creating or updating a book:

title: Must be a non-empty string.
author: Must be a non-empty string.
isbn: Must be a valid ISBN number.
publishedYear: Must be a valid year.

## Tech Stack

- Node.js: Server runtime
- Express.js: Web framework
- MongoDB: NoSQL database
- Mongoose: Object Data Modeling (ODM) for MongoDB
- dotenv: Environment variable management
- Vercel: Deployment platform


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

 git clone https://github.com/ademecheklie/Book-collection-api.git
cd Book-collection-api

2. Install dependencies:

     npm install

3. Configure environment variables:

Create a .env file in the root directory and add the following:
MONGO_URI = "your_mongodb_connection_string"

4. Start the server:

npm start

## Deployment

The API is live and accessible at:
Base URL: https://book-collection-api-one.vercel.app/

