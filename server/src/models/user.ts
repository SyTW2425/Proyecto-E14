import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';

export interface IUsuario extends Document {
  username: string;
  correo: string;
  preferenciasLectura: string[];
  //password: string;           Para cuando se implemente la autenticación
}

const UsuarioSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'El nombre de usuario es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [4, 'El nombre de usuario debe tener al menos 3 caracteres'],
      maxlength: [20, 'El nombre de usuario es demasiado largo'],
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('El correo electrónico no es válido');
        }
      },
    },
    preferenciasLectura: {
      type: [String],
      required: true,
      validate(value: string[]) {
        if (value.length < 1) {
          throw new Error('Debes seleccionar al menos un género literario');
        }
      },
    },
  },
  { collection: 'User' },
);

const Usuario = mongoose.model<IUsuario>('User', UsuarioSchema);
export default Usuario;
