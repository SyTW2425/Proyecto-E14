import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/user.js';
import { MongoError } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt';

// Registro
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, correo, preferenciasLectura, password } = req.body;

    const nuevoUsuario = new Usuario({
      username,
      correo,
      preferenciasLectura,
      password,
    });
    await nuevoUsuario.save();

    const token = jwt.sign({ id: nuevoUsuario._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', token });
  } catch (error) {
    if ((error as MongoError).code === 11000) {
      const field = Object.keys(
        (error as MongoError & { keyValue: Record<string, unknown> }).keyValue,
      )[0]; // Obtener el campo duplicado
      res.status(400).json({
        error: `El ${field} ya está en uso. Por favor, elige otro.`,
      });
    } else {
      res.status(400).json({ error: (error as Error).message });
    }
  }
};

// Inicio de sesión
export const login = async (req: Request, res: Response) => {
  try {
    const { correo, password } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario)
      return res.status(404).json({ error: 'Usuario no encontrado' });

    const isMatch = await usuario.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
