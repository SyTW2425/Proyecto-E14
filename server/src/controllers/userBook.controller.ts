import { Request, Response } from 'express';
import UserBook from '../models/UserBook.js';

// Add a book to a user's library
export const addUserBook = async (req: Request, res: Response) => {
  try {
    const { usuarioId, libroId } = req.body;

    // Check if the book is already in the user's library
    const existingEntry = await UserBook.findOne({ usuarioId, libroId });
    if (existingEntry) {
      return res
        .status(400)
        .json({ error: 'Book already exists in user library' });
    }

    const userBook = new UserBook({ usuarioId, libroId });
    await userBook.save();
    res.status(201).json({ message: 'Book added to user library', userBook });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Update reading progress
export const updateProgress = async (req: Request, res: Response) => {
  try {
    const { usuarioId, libroId, progreso } = req.body;

    const userBook = await UserBook.findOneAndUpdate(
      { usuarioId, libroId },
      { progreso },
      { new: true },
    );

    if (!userBook) {
      return res.status(404).json({ error: 'Book not found in user library' });
    }

    res.status(200).json({ message: 'Progress updated', userBook });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update reading status
export const updateReadingStatus = async (req: Request, res: Response) => {
  try {
    const { usuarioId, libroId, estadoLectura } = req.body;

    const userBook = await UserBook.findOneAndUpdate(
      { usuarioId, libroId },
      { estadoLectura },
      { new: true },
    );

    if (!userBook) {
      return res.status(404).json({ error: 'Book not found in user library' });
    }

    res.status(200).json({ message: 'Reading status updated', userBook });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Add a note to a book
export const addNote = async (req: Request, res: Response) => {
  try {
    const { usuarioId, libroId, nota } = req.body;

    const userBook = await UserBook.findOneAndUpdate(
      { usuarioId, libroId },
      { $push: { notas: nota } },
      { new: true },
    );

    if (!userBook) {
      return res.status(404).json({ error: 'Book not found in user library' });
    }

    res.status(200).json({ message: 'Note added', userBook });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get all books in a user's library
export const getUserBooks = async (req: Request, res: Response) => {
  try {
    const { usuarioId } = req.params;

    const userBooks = await UserBook.find({ usuarioId }).populate('libroId');
    res.status(200).json(userBooks);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
