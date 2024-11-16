import { Router, json } from 'express';
import Usuario from '../models/user.js';

const user_router = Router();

user_router.use(json());

// Crear un usuario
user_router.post('/', async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        const savedUsuario = await usuario.save();
        res.status(201).json(savedUsuario);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Leer todos los usuarios
user_router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Leer un usuario por su ID
user_router.get('/:id', async (req, res) => {
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

// Actualizar un usuario por su ID
user_router.put('/:id', async (req, res) => {
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

// Eliminar un usuario por su ID
user_router.delete('/:id', async (req, res) => {
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
