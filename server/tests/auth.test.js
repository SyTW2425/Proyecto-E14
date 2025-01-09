import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index';
import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import Usuario from '../src/models/user'; // Import the Usuario model

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

    it('should return 500 if an internal error occurs during signup', async () => {
      // Mock de Usuario.save para lanzar un error
      jest.spyOn(Usuario.prototype, 'save').mockRejectedValueOnce(new Error('Database error'));
  
      const mockUser = {
        username: 'erroruser',
        correo: 'erroruser@example.com',
        preferenciasLectura: ['Drama'],
        password: 'password123',
      };
  
      const response = await request(app).post('/auth/signup').send(mockUser);
  
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
  
      // Restaurar el mock después del test
      Usuario.prototype.save.mockRestore();
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
      expect(response.body).toHaveProperty('error', 'Incorrect password. Please try again');
    });

    it('should return 500 if an internal error occurs during signin', async () => {
      // Mock de Usuario.findOne para lanzar un error
      jest.spyOn(Usuario, 'findOne').mockRejectedValueOnce(new Error('Database error'));
  
      const loginData = {
        correo: 'testuser@example.com',
        password: 'password123',
      };
  
      const response = await request(app).post('/auth/signin').send(loginData);
  
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
  
      // Restaurar el mock después del test
      Usuario.findOne.mockRestore();
    });
  });  
});
