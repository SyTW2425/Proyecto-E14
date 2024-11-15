import mongoose, { Schema, Document } from 'mongoose';

export interface INota extends Document {
    contenido: string;
    fechaCreacion: Date; 
    etiquetas: string[]; 
    usuarioId: mongoose.Types.ObjectId; 
}

const NotaSchema: Schema = new Schema({
    contenido: { type: String, required: true }, 
    fechaCreacion: { type: Date, default: Date.now }, 
    etiquetas: { type: [String], default: [] }, 
    usuarioId: { type: Schema.Types.ObjectId, ref: 'user', required: true }, 
}, { collection: 'note' }); 

const Nota = mongoose.model<INota>('note', NotaSchema);
export default Nota;
