import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { generosPermitidos } from '../config/generos.js';

export interface IUsuario extends Document {
  username: string;
  correo: string;
  preferenciasLectura: string[];
  password: string;
  comparePassword(password: string): Promise<boolean>;
}

const UsuarioSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'El nombre de usuario es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [4, 'El nombre de usuario debe tener al menos 4 caracteres'],
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
        // Validar que todos los géneros sean válidos
        value.forEach((genero) => {
          if (!generosPermitidos.includes(genero)) {
            throw new Error(
              `El género '${genero}' no es válido. Los géneros permitidos son: ${generosPermitidos.join(', ')}`,
            );
          }
        });
      },
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    },
  },
  { collection: 'User' },
);

UsuarioSchema.index({ username: 1, correo: 1 }, { unique: true });

UsuarioSchema.pre<IUsuario>('save', async function (next) {
  if (!this.isModified('password')) return next(); // Si la contraseña no fue modificada, no la ciframos
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UsuarioSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const Usuario = mongoose.model<IUsuario>('User', UsuarioSchema);
export default Usuario;
