import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';

export interface ILibro extends Document {
  titulo: string;
  autor: string;
  genero: string;
  fechaPublicacion: Date;
  paginas: number;
  sinopsis: string;
  isbn: string;
}

const LibroSchema: Schema = new Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
      minlength: [1, 'El título no puede estar vacío'],
      maxlength: [100, 'El título es demasiado largo'],
    },
    autor: {
      type: String,
      required: [true, 'El autor es obligatorio'],
      trim: true,
      minlength: [1, 'El autor no puede estar vacío'],
      maxlength: [70, 'El autor es demasiado largo'],
    },
    genero: {
      type: String,
      required: [true, 'El género es obligatorio'],
      trim: true,
      minlength: [1, 'El género no puede estar vacío'],
      maxlength: [50, 'El género es demasiado largo'],
    },
    fechaPublicacion: {
      type: Date,
      required: [true, 'La fecha de publicación es obligatoria'],
    },
    paginas: {
      type: Number,
      required: [true, 'El número de páginas es obligatorio'],
      min: [1, 'El libro debe tener al menos una página'],
    },
    sinopsis: {
      type: String,
      required: [true, 'La sinopsis es obligatoria'],
      trim: true,
      minlength: [1, 'La sinopsis no puede estar vacía'],
      maxlength: [600, 'La sinopsis es demasiado larga'],
    },
    isbn: {
      type: String,
      required: [true, 'El ISBN es obligatorio'],
      unique: true,
      trim: true,
      validate: {
        validator: (value: string) => {
          console.log('Validando ISBN:', value); // Agrega este log
          return validator.isISBN(value);
        },
        message: 'El ISBN no es válido',
      },
    },
  },
  { collection: 'Book' },
);



LibroSchema.index({ titulo: 1, autor: 1 }, { unique: true }); // Esto es para evitar duplicados de títulos y autores (pueden haber varios libros con el mismo título pero de distintos autores)

const Libro = mongoose.model<ILibro>('Book', LibroSchema);
export default Libro;
