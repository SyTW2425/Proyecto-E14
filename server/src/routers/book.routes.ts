import { Router } from 'express';
import {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/book.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const bookRouter = Router();

// Add a new book
bookRouter.post('/', authMiddleware, addBook);
// Get all books
bookRouter.get('/', authMiddleware, getAllBooks);
// Get a book by ID
bookRouter.get('/:id', authMiddleware, getBookById);
// Update a book
bookRouter.put('/:id', authMiddleware, updateBook);
// Delete a book
bookRouter.delete('/:id', authMiddleware, deleteBook);

export default bookRouter;
