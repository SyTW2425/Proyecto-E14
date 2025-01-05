import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index';
import { describe, it, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';

describe('Auth Endpoints - Signup', () => {
  beforeAll(async () => {
    process.env.NODE_ENV = 'test'; // Asegura que usamos el entorno de pruebas
    await mongoose.connect(process.env.TEST_MONGODB_URI, {
      dbName: 'tests', // Base de datos de pruebas
    });
  });

  beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        if (collections[key]) {
            await collections[key].deleteMany({});
        }
    }
});


  afterAll(async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      await collections[key].deleteMany({}); // Limpia todos los documentos
    }

    await mongoose.disconnect();
    console.log('Conexión a la base de datos de pruebas cerrada');
  });

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
});
