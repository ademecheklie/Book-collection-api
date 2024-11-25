import Book from "../model/book.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

export const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();

    res.status(200).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) return res.status(404).json("Book not found");
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) return res.status(404).json("Book not found");
    res.status(200).json("Book deleted successfully");
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
    res.status(200).json("Favorite updated");
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