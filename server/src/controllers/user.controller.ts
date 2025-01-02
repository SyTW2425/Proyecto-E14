import { Request, Response } from 'express';
import Usuario from '../models/user.js';

// Get all users (protected route)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await Usuario.find({}, '-password'); // Exclude password field
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get a single user by ID (protected route)
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await Usuario.findById(id, '-password'); // Exclude password field
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update user profile (protected route)
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = await Usuario.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Delete a user account (protected route)
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await Usuario.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
