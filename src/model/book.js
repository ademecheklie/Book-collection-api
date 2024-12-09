import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
      trim: true,
      maxlength: [100, 'Title must be at most 100 characters'],
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      maxlength: [50, 'Author must be at most 50 characters'],
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
      validate: {
        validator: (value) =>
          /^(97(8|9))?\d{9}(\d|X)$/.test(value), 
        message: (props) => `${props.value} is not a valid ISBN format please insert the right one`,
      },
    },
    publishedYear: {
      type: Number,
      required: [true, 'Published year is required'],
      min: [1500, 'Published year must be later than 1500'],
      max: [new Date().getFullYear(), 'Published year cannot be in the future'],
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);
export default Book;
