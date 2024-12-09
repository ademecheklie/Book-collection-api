import express from "express";
import {
  createBook,
  deleteBook,
  favoriteBook,
  getAllBooks,
  getBookById,
  getBooks,
  getFavoriteBooks,
  recommendedBooks,
  updateBook,
} from "../controller/bookController.js";
import { authorizeRoles, verifyToken } from "../middleware/middleware.js";

const router = express.Router();

router.get("/all", authorizeRoles("admin"), getAllBooks);
router.post("/", authorizeRoles("user"), createBook);
router.put("/:id", authorizeRoles("user"), updateBook);
router.delete("/:id", deleteBook);
router.patch("/:id/favorite", authorizeRoles("user"), favoriteBook);
router.get("/recommended", recommendedBooks);
router.get("/favorite", verifyToken, getFavoriteBooks);
router.get("/", getBooks);
router.get("/:id", getBookById);

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management API
 */

/**
 * @swagger
 * /books/all:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Successfully created a book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Successfully updated the book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       403:
 *         description: Forbidden - You don't have permission to update this book
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the book
 *       403:
 *         description: Forbidden - You don't have permission to delete this book
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /books/{id}/favorite:
 *   patch:
 *     summary: Toggle favorite status of a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Favorite status updated
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /books/recommended:
 *   get:
 *     summary: Get a random recommended book
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Successfully retrieved a recommended book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: No books available
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /books/favorite:
 *   get:
 *     summary: Get all favorite books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved favorite books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get books by user's favorites
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved books by user's favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - isbn
 *         - publishedYear
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the book
 *         title:
 *           type: string
 *           description: Title of the book
 *         author:
 *           type: string
 *           description: Author of the book
 *         isbn:
 *           type: string
 *           description: ISBN number of the book
 *         publishedYear:
 *           type: integer
 *           description: Year the book was published
 *         isFavorite:
 *           type: boolean
 *           description: Indicates if the book is marked as favorite
 *         createdBy:
 *           type: string
 *           description: ID of the user who created the book
 */

export default router;
