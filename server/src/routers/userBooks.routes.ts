import { Router } from 'express';
import {
  addUserBook,
  updatePagesRead,
  updateReadingStatus,
  addNote,
  getUserBooks,
  removeNote,
  getUserBookDetails,
  removeUserBook,
} from '../controllers/userBook.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const userBookRouter = Router();

// Add a book to the library
userBookRouter.post('/', authMiddleware, addUserBook);
// Update reading progress
userBookRouter.patch('/progress', authMiddleware, updatePagesRead);
// Update reading status
userBookRouter.patch('/status', authMiddleware, updateReadingStatus);
// Add a note
userBookRouter.patch('/notes', authMiddleware, addNote);
// Get all books in a user's library
userBookRouter.get('/:usuarioId', authMiddleware, getUserBooks);
// Remove a note
userBookRouter.delete('/notes', authMiddleware, removeNote); 
// Get details of a book in a user's library
userBookRouter.get('/:usuarioId/:libroId', authMiddleware, getUserBookDetails); 
// Remove a book from the users library
userBookRouter.delete('/', authMiddleware, removeUserBook); 

export default userBookRouter;
