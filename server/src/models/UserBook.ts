import mongoose, { Schema, Document } from 'mongoose';

export interface IUserBook extends Document {
  usuarioId: mongoose.Types.ObjectId;
  libroId: mongoose.Types.ObjectId;
  progreso: number;
  paginasLeidas: number; 
  estadoLectura: 'Pending' | 'Reading' | 'Completed';
  notas: { _id: mongoose.Types.ObjectId; content: string }[];
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
    validate: {
      validator: Number.isInteger,
      message: 'Progress must be an integer value',
    },
  },
  paginasLeidas: {
    type: Number,
    default: 0,
    min: [0, 'Pages read cannot be less than 0'],
  },
  estadoLectura: {
    type: String,
    enum: ['Pending', 'Reading', 'Completed'],
    default: 'Pending',
  },
  notas: [
    {
      _id: { type: Schema.Types.ObjectId, auto: true },
      content: { type: String, required: true },
    },
  ],
});

UserBookSchema.index({ usuarioId: 1, libroId: 1 }, { unique: true });

const UserBook = mongoose.model<IUserBook>('UserBook', UserBookSchema);
export default UserBook;
