import Book from "../model/book.js";

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
    if (book.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
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
  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json("Book not found");
    book.isFavorite = !book.isFavorite;
    await book.save();
    res.status(200).json("Favorite status updated");
  }
  catch (error) {
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

export const getFavoriteBooks = async (req, res) => {
  try {
    const books = await Book.find({ isFavorite: true });
    res.status(200).json(books);
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

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ _id: { $in: req.user.favorites } }).populate("createdBy", "name username");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};