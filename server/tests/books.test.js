import request from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import app from '../src/index';
import { describe, it, expect, beforeAll, afterAll, afterEach } from '@jest/globals';
import jest from 'jest-mock';
import Libro from '../src/models/book';

describe('Books Endpoints', () => {
  let token;
  let mockBook;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test'; // Asegura que usamos el entorno de pruebas
    await mongoose.connect(process.env.TEST_MONGODB_URI, {
      dbName: 'tests', // Base de datos de pruebas
    });

    // Generar un token válido
	  token = jwt.sign(
    	{ userId: 'testuser', role: 'user' }, // Datos del usuario
    	process.env.JWT_SECRET, // Clave secreta usada por el servidor
    	{ expiresIn: '1h' } // Tiempo de expiración
	  );
    mockBook = {
      titulo: "Dune",
      autor: "Frank Herbert",
      genero: "Science Fiction",
      paginas: 412,
      sinopsis: "A desert planet holds the key to the galaxy's future in this epic tale of power and betrayal.",
      portada: "https://m.media-amazon.com/images/I/91bNnC0hTFL._AC_UF894,1000_QL80_.jpg"
    };
  });

  afterEach(async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      if (collections[key]) {
        await collections[key].deleteMany({});
      }
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
    console.log('Conexión a la base de datos de pruebas cerrada');
  });
    // Post a book
    it('should add a new book', async () => {

      const response = await request(app).post('/libros').set('Authorization', `Bearer ${token}`).send(mockBook);

      console.log('Response body:', response.body); 

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        'message',
        'Book added successfully'
      );
      expect(response.body).toHaveProperty('book');
      expect(response.body.book).toHaveProperty('titulo', 'Dune');
      expect(response.body.book).toHaveProperty('autor', 'Frank Herbert');
      expect(response.body.book).toHaveProperty('genero', 'Science Fiction');
      expect(response.body.book).toHaveProperty('paginas', 412);
      expect(response.body.book).toHaveProperty('sinopsis', 'A desert planet holds the key to the galaxy\'s future in this epic tale of power and betrayal.');
      expect(response.body.book).toHaveProperty('portada', 'https://m.media-amazon.com/images/I/91bNnC0hTFL._AC_UF894,1000_QL80_.jpg');
    });

    it('should add a new book', async () => {
      mockBook.portada = 'mi_portada.jpg';
      const response = await request(app).post('/libros').set('Authorization', `Bearer ${token}`).send(mockBook);
      
      expect(response.status).toBe(400);
      mockBook.portada = 'https://m.media-amazon.com/images/I/91bNnC0hTFL._AC_UF894,1000_QL80_.jpg';
    });

    it('should return 400 if Bad Request', async () => {
      const response = await request(app).post('/libros').set('Authorization', `Bearer ${token}`).send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Book validation failed: portada: The cover URL is required, ' +
                                                    'sinopsis: The synopsis is required, paginas: The number of pages is required, ' +
                                                    'genero: The genre is required, autor: The author is required, titulo: The title is required');
    });

    // Get all books
    it('should return all books', async () => {

      await request(app).post('/libros').set('Authorization', `Bearer ${token}`).send(mockBook);

      const response = await request(app).get('/libros').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty('titulo', 'Dune');
      expect(response.body[0]).toHaveProperty('autor', 'Frank Herbert');
      expect(response.body[0]).toHaveProperty('genero', 'Science Fiction');
      expect(response.body[0]).toHaveProperty('paginas', 412);
      expect(response.body[0]).toHaveProperty('sinopsis', 'A desert planet holds the key to the galaxy\'s future in this epic tale of power and betrayal.');
      expect(response.body[0]).toHaveProperty('portada', 'https://m.media-amazon.com/images/I/91bNnC0hTFL._AC_UF894,1000_QL80_.jpg');
    });

    it('should return 500 if Internal Server Error', async () => {
      jest.spyOn(Libro, 'find').mockRejectedValueOnce(new Error('Database error'));
    
      const response = await request(app).get('/libros').set('Authorization', `Bearer ${token}`);
    
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
    });

    // Get a book by ID
    it('should return a book by ID', async () => {

      const post_response = await request(app).post('/libros').set('Authorization', `Bearer ${token}`).send(mockBook);

      expect(post_response.status).toBe(201);
      expect(post_response.body).toHaveProperty('book');
      expect(post_response.body.book).toHaveProperty('_id');

      const mockBookID =  post_response.body.book._id;

      const response = await request(app).get(`/libros/${mockBookID}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('titulo', 'Dune');
    });

    it('should return 404 if book not found', async () => {
      const response = await request(app).get('/libros/60d5f99cfc13ae2d10000000').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Book not found');
    });

    it('should return 400 if Bad Request', async () => {
      const response = await request(app).get('/libros/1').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Cast to ObjectId failed for value "1" (type string) at path "_id" for model "Book"');
    });

    // Update a book
    it('should update a book', async () => {
      
      const post_response = await request(app).post('/libros').set('Authorization', `Bearer ${token}`).send(mockBook);

      expect(post_response.status).toBe(201);
      expect(post_response.body).toHaveProperty('book');
      expect(post_response.body.book).toHaveProperty('_id');

      const mockBookID =  post_response.body.book._id;

      const updatedData = { titulo: 'Updated Book Title' };
      const response = await request(app)
        .put(`/libros/${mockBookID}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        'message',
        'Book updated successfully'
      );
      expect(response.body.book).toHaveProperty('titulo', 'Updated Book Title');
    });

    it('should return 404 if book not found', async () => {
      const response = await request(app)
        .put('/libros/60d5f99cfc13ae2d10000000')
        .set('Authorization', `Bearer ${token}`)
        .send({ titulo: 'Non-existent Book' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Book not found');
    });

    it('should return 400 if bad request', async () => {
      const response = await request(app)
        .put('/libros/1')
        .set('Authorization', `Bearer ${token}`)
        .send({ titulo: 'Non-existent Book' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Cast to ObjectId failed for value "1" (type string) at path "_id" for model "Book"');
    });

    // Delete a book
    it('should delete a book', async () => {
      
      const post_response = await request(app).post('/libros').set('Authorization', `Bearer ${token}`).send(mockBook);

      const mockBookID =  post_response.body.book._id;

      const response = await request(app).delete(`/libros/${mockBookID}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        'message',
        'Book deleted successfully'
      );
    });

    it('should return 404 if book not found', async () => {
      
      const response = await request(app).delete('/libros/60d5f99cfc13ae2d10000000').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Book not found');
    });

    it('should return 400 if Bad Request', async () => {
      
      const response = await request(app).delete('/libros/1').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Cast to ObjectId failed for value "1" (type string) at path "_id" for model "Book"');
    });
});
