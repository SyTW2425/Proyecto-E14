import mongoose, { Schema, Document } from 'mongoose';

export interface ILibro extends Document {
    titulo: string;
    autor: string;
    genero: string;
    fechaPublicacion: Date;
    paginas: number;
}

const LibroSchema: Schema = new Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    genero: { type: String, required: true },
    fechaPublicacion: { type: Date, required: true },
    paginas: { type: Number, required: true },
}, { collection: 'book' });

const Libro = mongoose.model<ILibro>('book', LibroSchema);
export default Libro;
