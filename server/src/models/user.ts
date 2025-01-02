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
      required: [true, 'The username is required'],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [4, 'The username must be at least 4 characters long'],
      maxlength: [20, 'The username is too long'],
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('The email is not valid');
        }
      },
    },
    preferenciasLectura: {
      type: [String],
      required: true,
      validate(value: string[]) {
        if (value.length < 1) {
          throw new Error('At least one genre is required');
        }
        // Validar que todos los géneros sean válidos
        value.forEach((genero) => {
          if (!generosPermitidos.includes(genero)) {
            throw new Error(
              `The genre '${genero}' is not valid. The valid genres are: ${generosPermitidos.join(', ')}`,
            );
          }
        });
      },
    },
    password: {
      type: String,
      required: [true, 'The password is required'],
      minlength: [6, 'The password must be at least 6 characters long'],
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
