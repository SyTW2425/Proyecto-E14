import { Request, Response } from 'express';
import UserBook from '../models/UserBook.js';

// Add a book to a user's library
export const addUserBook = async (req: Request, res: Response) => {
  try {
    const { usuarioId, libroId } = req.body;

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

// // Update reading progress
// export const updatePagesRead = async (req: Request, res: Response) => {
//   try {
//     const { usuarioId, libroId, paginasLeidas, totalPaginas } = req.body;

//     // Validación de parámetros
//     if (!usuarioId || !libroId || totalPaginas == null || paginasLeidas == null) {
//       return res.status(400).json({
//         error: "Missing required fields: usuarioId, libroId, paginasLeidas, or totalPaginas",
//       });
//     }

//     if (paginasLeidas < 0 || paginasLeidas > totalPaginas) {
//       return res.status(400).json({
//         error: "Pages read must be between 0 and the total number of pages",
//       });
//     }

//     // Calcular el progreso
//     const progreso = totalPaginas > 0 ? (paginasLeidas / totalPaginas) * 100 : 0;

//     // Actualizar el progreso en la base de datos
//     const userBook = await UserBook.findOneAndUpdate(
//       { usuarioId, libroId },
//       { paginasLeidas, progreso },
//       { new: true }
//     );

//     if (!userBook) {
//       return res.status(404).json({ error: "Book not found in user library" });
//     }

//     res.status(200).json({ message: "Pages read and progress updated", userBook });
//   } catch (error) {
//     console.error("Error in updatePagesRead:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


// // Update reading status
// export const updateReadingStatus = async (req: Request, res: Response) => {
//   try {
//     const { usuarioId, libroId, estadoLectura } = req.body;

//     const userBook = await UserBook.findOneAndUpdate(
//       { usuarioId, libroId },
//       { estadoLectura },
//       { new: true },
//     );

//     if (!userBook) {
//       return res.status(404).json({ error: 'Book not found in user library' });
//     }

//     res.status(200).json({ message: 'Reading status updated', userBook });
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   }
// };

// Update reading progress
export const updatePagesRead = async (req: Request, res: Response) => {
  try {
    const { usuarioId, libroId, paginasLeidas, totalPaginas } = req.body;

    // Validación de parámetros requeridos
    if (!usuarioId || !libroId || totalPaginas == null || paginasLeidas == null) {
      return res.status(400).json({
        error: "Missing required fields: usuarioId, libroId, paginasLeidas, or totalPaginas",
      });
    }

    // Validación de rango de páginas leídas
    if (paginasLeidas < 0 || paginasLeidas > totalPaginas) {
      return res.status(400).json({
        error: "Pages read must be between 0 and the total number of pages",
      });
    }

    // Calcular progreso y estado de lectura
    const progreso = totalPaginas > 0 ? (paginasLeidas / totalPaginas) * 100 : 0;
    const estadoLectura =
      paginasLeidas === 0
        ? "Pending"
        : paginasLeidas === totalPaginas
        ? "Completed"
        : "Reading";

    // Actualizar el libro del usuario
    const userBook = await UserBook.findOneAndUpdate(
      { usuarioId, libroId },
      { paginasLeidas, progreso, estadoLectura },
      { new: true }
    );

    if (!userBook) {
      return res.status(404).json({ error: "Book not found in users library" });
    }

    res.status(200).json({ message: "Pages read and progress updated", userBook });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};


// Update reading status
export const updateReadingStatus = async (req: Request, res: Response) => {
  try {
    const { usuarioId, libroId, estadoLectura } = req.body;

    if (!usuarioId || !libroId || !estadoLectura) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const userBook = await UserBook.findOneAndUpdate(
      { usuarioId, libroId },
      { estadoLectura },
      { new: true } // Devuelve el documento actualizado
    );

    if (!userBook) {
      return res.status(404).json({ error: "Book not found in users library" });
    }

    res.status(200).json({ message: "Reading status updated", userBook });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};


// Add a note to a book
export const addNote = async (req: Request, res: Response) => {
  try {
    const { usuarioId, libroId, content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Note content cannot be empty' });
    }

    const userBook = await UserBook.findOneAndUpdate(
      { usuarioId, libroId },
      { $push: { notas: { content } } },
      { new: true, runValidators: true }
    );

    if (!userBook) {
      return res.status(404).json({ error: 'Book not found in user library' });
    }

    res.status(201).json({ message: 'Note added', userBook });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};


// Remove a note from a book
export const removeNote = async (req: Request, res: Response) => {
  try {
    const { usuarioId, libroId, notaId } = req.body;

    const userBook = await UserBook.findOneAndUpdate(
      { usuarioId, libroId },
      { $pull: { notas: { _id: notaId } } },
      { new: true }
    );

    if (!userBook) {
      return res.status(404).json({ error: 'Book not found in user library' });
    }

    res.status(200).json({ message: 'Note removed', userBook });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a note in a book
export const updateNote = async (req: Request, res: Response) => {
  try {
    const { usuarioId, libroId, notaId, content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Note content cannot be empty' });
    }

    const userBook = await UserBook.findOneAndUpdate(
      { usuarioId, libroId, 'notas._id': notaId },
      { $set: { 'notas.$.content': content } },
      { new: true, runValidators: true }
    );

    if (!userBook) {
      return res.status(404).json({ error: 'Book or note not found in user library' });
    }

    res.status(200).json({ message: 'Note updated', userBook });
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

// Get details of a specific book in user's library
export const getUserBookDetails = async (req: Request, res: Response) => {
  try {
    const { usuarioId, libroId } = req.params;

    const userBook = await UserBook.findOne({ usuarioId, libroId }).populate(
      'libroId',
    );

    if (!userBook) {
      return res.status(404).json({ error: 'Book not found in user library' });
    }

    res.status(200).json(userBook);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Remove a book from user's library
export const removeUserBook = async (req: Request, res: Response) => {
  try {
    const { usuarioId, libroId } = req.body;

    const userBook = await UserBook.findOneAndDelete({ usuarioId, libroId });

    if (!userBook) {
      return res.status(404).json({ error: 'Book not found in user library' });
    }

    res.status(200).json({ message: 'Book removed from library', userBook });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
