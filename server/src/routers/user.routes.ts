import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updatePreferences,
  changePassword,
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const userRouter = Router();

// Get all users (Admin or protected)
userRouter.get('/', authMiddleware, getAllUsers);
// Get user by ID
userRouter.get('/:id', authMiddleware, getUserById);
// Update user profile
userRouter.put('/:id', authMiddleware, updateUser);
// Delete user account
userRouter.delete('/:id', authMiddleware, deleteUser);
// Update reading preferences
userRouter.put('/:id/preferences', authMiddleware, updatePreferences);
// Update password
userRouter.put('/:id/password', authMiddleware, changePassword);

export default userRouter;
