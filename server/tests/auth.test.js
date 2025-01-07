import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('Auth Endpoints', () => {
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

  describe('POST /auth/signup', () => {
    it('should register a new user and return a token', async () => {
      const mockUser = {
        username: 'testuser',
        correo: 'testuser@example.com',
        preferenciasLectura: ['Drama'],
        password: 'password123',
      };

      const response = await request(app).post('/auth/signup').send(mockUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        'message',
        'User succesfully registered',
      );
      expect(response.body).toHaveProperty('token');
    });

    it('should return an error when trying to register with an existing email', async () => {
      const duplicateUser = {
        username: 'testuser2',
        correo: 'testuser@example.com', // Same email as before
        preferenciasLectura: ['Fantasy'],
        password: 'anotherpassword',
      };

      const response = await request(app).post('/auth/signup').send(duplicateUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        'error',
        'The correo is taken. Please, choose another.',
      );
    });
  });

  describe('POST /auth/signin', () => {
    it('should log in an existing user and return a token', async () => {
      const loginData = {
        correo: 'testuser@example.com',
        password: 'password123',
      };

      const response = await request(app).post('/auth/signin').send(loginData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Successful login');
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('username', 'testuser');
    });

    it('should return an error for non-existing email', async () => {
      const loginData = {
        correo: 'nonexistent@example.com',
        password: 'password123',
      };

      const response = await request(app).post('/auth/signin').send(loginData);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'User not found');
    });

    it('should return an error for incorrect password', async () => {
      const loginData = {
        correo: 'testuser@example.com',
        password: 'wrongpassword',
      };

      const response = await request(app).post('/auth/signin').send(loginData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Incorrect password');
    });
  });
});
