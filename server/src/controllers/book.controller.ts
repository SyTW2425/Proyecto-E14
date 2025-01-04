import { Request, Response } from 'express';
import Libro from '../models/book.js';

// Add a new book
export const addBook = async (req: Request, res: Response) => {
  try {
    const book = new Libro(req.body);
    const savedBook = await book.save();
    res
      .status(201)
      .json({ message: 'Book added successfully', book: savedBook });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Get all books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Libro.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get a book by ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await Libro.findById(id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedBook = await Libro.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
    res
      .status(200)
      .json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBook = await Libro.findByIdAndDelete(id);
    if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
    res
      .status(200)
      .json({ message: 'Book deleted successfully', book: deletedBook });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
