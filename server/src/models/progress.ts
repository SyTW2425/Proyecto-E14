import mongoose, { Schema, Document } from 'mongoose';

interface IProgreso extends Document {
  usuarioId: mongoose.Types.ObjectId;
  libroId: mongoose.Types.ObjectId;
  estadoLectura: 'En progreso' | 'Completado' | 'Por empezar';
  paginasLeidas: number;
  notas?: string;
}

const ProgresoSchema = new Schema<IProgreso>(
  {
    usuarioId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El usuario es obligatorio'],
    },
    libroId: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'El libro es obligatorio'],
    },
    estadoLectura: {
      type: String,
      required: [true, 'El estado de lectura es obligatorio'],
      enum: {
        values: ['En progreso', 'Completado', 'Por empezar'],
        message:
          'El estado de lectura debe ser "En progreso", "Completado" o "Por empezar"',
      },
    },
    paginasLeidas: {
      type: Number,
      required: [true, 'El número de páginas es obligatorio'],
      min: [0, 'El libro debe tener al menos una página'],
    },
    notas: {
      type: String,
      trim: true,
      maxlength: [1000, 'Las notas no pueden tener más de 500 caracteres'],
    },
  },
  { collection: 'Progress' },
);

export default mongoose.model<IProgreso>('Progress', ProgresoSchema);
