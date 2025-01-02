import mongoose, { Schema, Document } from 'mongoose';

export interface IUserBook extends Document {
  usuarioId: mongoose.Types.ObjectId; // Relación con el usuario
  libroId: mongoose.Types.ObjectId; // Relación con el libro
  progreso: number; // Porcentaje de progreso (0-100)
  estadoLectura: 'Pending' | 'Reading' | 'Completed'; // Estado del libro
  notas: string[]; // Notas del usuario sobre este libro
}

const UserBookSchema = new Schema<IUserBook>({
  usuarioId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The user is required'],
  },
  libroId: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: [true, 'The book is required'],
  },
  progreso: {
    type: Number,
    default: 0,
    min: [0, 'Progress cannot be less than 0'],
    max: [100, 'Progress cannot exceed 100'],
  },
  estadoLectura: {
    type: String,
    enum: ['Pending', 'Reading', 'Cmpleted'],
    default: 'Pending',
  },
  notas: {
    type: [String],
    default: [],
  },
});

UserBookSchema.index({ usuarioId: 1, libroId: 1 }, { unique: true }); // Evitar duplicados

const UserBook = mongoose.model<IUserBook>('UserBook', UserBookSchema);
export default UserBook;
