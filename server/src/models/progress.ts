// models/progress.ts

import mongoose, { Schema, Document } from 'mongoose';

interface IProgreso extends Document {
    usuarioId: mongoose.Types.ObjectId;
    libroId: mongoose.Types.ObjectId;
    estadoLectura: string;
    porcentajeLeido: number;
    notas?: string;
}

const ProgresoSchema = new Schema<IProgreso>({
    usuarioId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    libroId: { type: Schema.Types.ObjectId, ref: 'book', required: true },
    estadoLectura: { type: String, required: true },
    porcentajeLeido: { type: Number, required: true },
    notas: { type: String }
}, { collection: 'progress' });

export default mongoose.model<IProgreso>('progress', ProgresoSchema);
