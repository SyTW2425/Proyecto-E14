import { Router } from 'express';
import {
  addUserBook,
  updateProgress,
  updateReadingStatus,
  addNote,
  getUserBooks,
} from '../controllers/userBook.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const userBookRouter = Router();

// Add a book to the library
userBookRouter.post('/', authMiddleware, addUserBook);
// Update reading progress
userBookRouter.patch('/progress', authMiddleware, updateProgress);
// Update reading status
userBookRouter.patch('/status', authMiddleware, updateReadingStatus);
// Add a note
userBookRouter.patch('/notes', authMiddleware, addNote);
// Get all books in a user's library
userBookRouter.get('/:usuarioId', authMiddleware, getUserBooks);

export default userBookRouter;
