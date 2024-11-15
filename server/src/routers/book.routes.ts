import { Router, json } from 'express';
import Libro from '../models/book';

const book_router = Router();

book_router.use(json());

// Crear un libro
book_router.post('/', async (req, res) => {
	try {
		const libro = new Libro(req.body);
		const savedLibro = await libro.save();
		res.status(201).json(savedLibro);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
});

// Leer todos los libros
book_router.get('/', async (req, res) => {
		try {
				const libros = await Libro.find();
				res.json(libros);
		} catch (error) {
				res.status(500).json({ error: (error as Error).message });
		}
});

// Leer un libro por su ID
book_router.get('/:id', async (req, res) => {
	try {
		const libro = await Libro.findById(req.params.id);
		if (libro) {
			res.json(libro);
		} else {
			res.status(404).json({ error: 'Libro no encontrado' });
		}
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

// Actualizar un libro por su ID
book_router.put('/:id', async (req, res) => {
	try {
		const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (libro) {
			res.json(libro);
		} else {
			res.status(404).json({ error: 'Libro no encontrado' });
		}
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

// Eliminar un libro por su ID
book_router.delete('/:id', async (req, res) => {
	try {
		const libro = await Libro.findByIdAndDelete(req.params.id);
		if (libro) {
			res.json(libro);
		} else {
			res.status(404).json({ error: 'Libro no encontrado' });
		}
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

export default book_router;