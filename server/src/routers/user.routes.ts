import { Router, json } from 'express';
import Usuario from '../models/user.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const user_router = Router();

user_router.use(json());

// Crear un usuario (sin autenticación, porque es para registr
user_router.post('/', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    const savedUsuario = await usuario.save();
    res.status(201).json(savedUsuario);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Leer todos los usuarios (protegido por autenticación)
user_router.get('/', authMiddleware, async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Leer un usuario por su ID (protegido por autenticación)
user_router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Actualizar un usuario por su ID (protegido por autenticación)
user_router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Esto asegura que se realice la validación
    });
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Eliminar un usuario por su ID (protegido por autenticación)
user_router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default user_router;
