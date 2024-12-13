import Book from "../model/book.js";
import User from "../model/user.js";
import mongoose from "mongoose";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error:  error.message });
  }
};

export const createBook = async (req, res) => {
  const { title, author, isbn, publishedYear } = req.body;
  try {
    const newBook = new Book({
      title,
      author,
      isbn,
      publishedYear,
      createdBy: req.user.id,
    });
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, publishedYear, isFavorite } = req.body;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You don't have permission to update this book" });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.isbn = isbn || book.isbn;
    book.publishedYear = publishedYear || book.publishedYear;
    book.isFavorite = isFavorite !== undefined ? isFavorite : book.isFavorite;

    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }}

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You don't have permission to delete this book" });
    }
await book.deleteOne();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const favoriteBook = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; 
  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isFavorite = user.favorites.includes(id);

    if (isFavorite) {
      user.favorites = user.favorites.filter((bookId) => bookId.toString() !== id);
    } else {
      user.favorites.push(id);
    }
    await user.save();
    res.status(200).json({
      message: isFavorite
        ? "Book removed from favorites"
        : "Book added to favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json("Book not found");
    res.status(200).json(book);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  } 
}

export const recommendedBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0) return res.status(404).json({ error: 'No books available' });
    const randomBook = books[Math.floor(Math.random() * books.length)];
    res.status(200).json(randomBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getUserFavoriteBooks = async (req, res) => {

  try {
    if (!req.user || !Array.isArray(req.user.favorites) || req.user.favorites.length === 0) {
      return res.status(400).json({ message: "No favorites found." });
    }
    const favoriteBookIds = req.user.favorites.map(id =>new mongoose.Types.ObjectId(id));
    const favoriteBooks = await Book.find({
      _id: { $in: favoriteBookIds }
    }).populate("createdBy", "name username");

    res.status(200).json(favoriteBooks);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving favorite books.",
      details: error.message,
    });
  }
};