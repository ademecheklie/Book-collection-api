import express from "express";
import {
  createBook,
  deleteBook,
  favoriteBook,
  getAllBooks,
  getBookById,
  getFavoriteBooks,
  recommendedBooks,
  updateBook,
} from "../controller/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.patch("/:id/favorite", favoriteBook);
router.get('/recommended', recommendedBooks);
router.get('/favorite', getFavoriteBooks)
router.get('/:id', getBookById)
export default router;
