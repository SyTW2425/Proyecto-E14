import { Router, json } from 'express';
import Nota from '../models/note';

const note_router = Router();

note_router.use(json());

// Crear una nota
note_router.post('/', async (req, res) => {
	try {
		const nota = new Nota(req.body);
		const savedNota = await nota.save();
		res.status(201).json(savedNota);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
});

// Leer todas las notas
note_router.get('/', async (req, res) => {
	try {
		const notas = await Nota.find();
		res.json(notas);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

// Leer una nota por su ID
note_router.get('/:id', async (req, res) => {
	try {
		const nota = await Nota.findById(req.params.id);
		if (nota) {
			res.json(nota);
		} else {
			res.status(404).json({ error: 'Nota no encontrada' });
		}
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

// Actualizar una nota por su ID
note_router.put('/:id', async (req, res) => {
	try {
		const nota = await Nota.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (nota) {
			res.json(nota);
		} else {
			res.status(404).json({ error: 'Nota no encontrada' });
		}
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

// Eliminar una nota por su ID
note_router.delete('/:id', async (req, res) => {
	try {
		const nota = await Nota.findByIdAndDelete(req.params.id);
		if (nota) {
			res.json(nota);
		} else {
			res.status(404).json({ error: 'Nota no encontrada' });
		}
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

export default note_router;