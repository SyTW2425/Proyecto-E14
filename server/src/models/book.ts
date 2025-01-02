import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';
import { generosPermitidos } from '../config/generos.js';

export interface ILibro extends Document {
  titulo: string;
  autor: string;
  genero: string;
  paginas: number;
  sinopsis: string;
  portada: string;
}

const LibroSchema: Schema = new Schema(
  {
    titulo: {
      type: String,
      required: [true, 'The title is required'],
      trim: true,
      minlength: [1, 'The title cannot be empty'],
      maxlength: [100, 'The title is too long'],
    },
    autor: {
      type: String,
      required: [true, 'The author is required'],
      trim: true,
      minlength: [1, 'The author cannot be empty'],
      maxlength: [70, 'The author is too long'],
    },
    genero: {
      type: String,
      required: [true, 'The genre is required'],
      trim: true,
      enum: generosPermitidos,
    },
    paginas: {
      type: Number,
      required: [true, 'The number of pages is required'],
      min: [1, 'The number of pages must be greater than 0'],
    },
    sinopsis: {
      type: String,
      required: [true, 'The synopsis is required'],
      trim: true,
      minlength: [1, 'The synopsis cannot be empty'],
      maxlength: [400, 'The synopsis is too long'],
    },
    portada: {
      type: String,
      required: [true, 'The cover URL is required'],
      trim: true,
      validate(portada: string) {
        if (
          !validator.isURL(portada, {
            protocols: ['http', 'https'],
            require_protocol: true,
          })
        ) {
          throw new Error('The cover URL is not valid');
        }
      },
    },
  },
  { collection: 'Book' },
);

LibroSchema.index({ titulo: 1, autor: 1 }, { unique: true }); // Esto es para evitar duplicados de títulos y autores (pueden haber varios libros con el mismo título pero de distintos autores)

const Libro = mongoose.model<ILibro>('Book', LibroSchema);
export default Libro;
