import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import Libro from '../src/models/book';

describe('Books Endpoints', () => {
  beforeAll(async () => {
    process.env.NODE_ENV = 'test'; // Asegura que usamos el entorno de pruebas
    await mongoose.connect(process.env.TEST_MONGODB_URI, {
      dbName: 'tests', // Base de datos de pruebas
    });
  });

  afterAll(async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      await collections[key].deleteMany({}); // Limpia todos los documentos
    }

    await mongoose.disconnect();
    console.log('Conexión a la base de datos de pruebas cerrada');
  });

  describe('POST /books', () => {
    it('should add a new book', async () => {
      const mockBook = {
        title: 'Sample Book',
        author: 'Test Author',
        genre: 'Fiction',
        year: 2023,
      };

      const response = await request(app).post('/books').send(mockBook);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        'message',
        'Book added successfully'
      );
      expect(response.body).toHaveProperty('book');
      expect(response.body.book).toHaveProperty('title', 'Sample Book');
    });
  });

  describe('GET /books', () => {
    it('should return all books', async () => {
      const response = await request(app).get('/books');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /books/:id', () => {
    it('should return a book by ID', async () => {
      const mockBook = new Libro({
        title: 'Sample Book',
        author: 'Test Author',
        genre: 'Fiction',
        year: 2023,
      });
      await mockBook.save();

      const response = await request(app).get(`/books/${mockBook._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title', 'Sample Book');
    });

    it('should return 404 if book not found', async () => {
      const response = await request(app).get('/books/60d5f99cfc13ae2d10000000');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Book not found');
    });
  });

  describe('PUT /books/:id', () => {
    it('should update a book', async () => {
      const mockBook = new Libro({
        title: 'Sample Book',
        author: 'Test Author',
        genre: 'Fiction',
        year: 2023,
      });
      await mockBook.save();

      const updatedData = { title: 'Updated Book Title' };
      const response = await request(app)
        .put(`/books/${mockBook._id}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        'message',
        'Book updated successfully'
      );
      expect(response.body.book).toHaveProperty('title', 'Updated Book Title');
    });

    it('should return 404 if book not found', async () => {
      const response = await request(app)
        .put('/books/60d5f99cfc13ae2d10000000')
        .send({ title: 'Non-existent Book' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Book not found');
    });
  });

  describe('DELETE /books/:id', () => {
    it('should delete a book', async () => {
      const mockBook = new Libro({
        title: 'Sample Book',
        author: 'Test Author',
        genre: 'Fiction',
        year: 2023,
      });
      await mockBook.save();

      const response = await request(app).delete(`/books/${mockBook._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        'message',
        'Book deleted successfully'
      );
    });

    it('should return 404 if book not found', async () => {
      const response = await request(app).delete('/books/60d5f99cfc13ae2d10000000');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Book not found');
    });
  });
});
