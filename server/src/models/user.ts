import mongoose, { Schema, Document } from 'mongoose';

export interface IUsuario extends Document {
    nombre: string;
    correo: string;
    preferenciasLectura: string[];
}

const UsuarioSchema: Schema = new Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    preferenciasLectura: { type: [String], required: true },
}, { collection: 'user' });

const Usuario = mongoose.model<IUsuario>('user', UsuarioSchema);
export default Usuario;
