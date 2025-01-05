import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import app from '../src/index';
import Usuario from '../src/models/user';
import mongoose from 'mongoose';
import jest from 'jest-mock';

describe('Users Endpoints', () => {
    // Variables auxiliares
    let token;
    let mockUser2Id;
    const mockUser2 = {
        username: 'testuser2',
        correo: 'testuser2@example.com',
        password: 'password123',
        preferenciasLectura: ['Romance', 'Fantasy'],
    };

    beforeEach(async () => {
        // Clear the database before each test
        await Usuario.deleteMany({});
    });

    beforeAll(async () => {
        // Ensure not calling mongoose.connect() multiple times
        if (mongoose.connection.readyState === 0) {
            const dbUri = process.env.TEST_DB_URI || 'mongodb://localhost:27017/testdb';
            await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            });
        }
        
        // Create test user and get token
        await Usuario.create(mockUser2);
        const res = await request(app).post('/auth/signin').send({
            correo: mockUser2.correo,
            password: mockUser2.password,
        });
        token = res.body.token;
        mockUser2Id = res.body.user._id;
        
    });
      
    afterAll(async () => {
        // Clear the database and close the connection
        await Usuario.deleteMany({});
        await mongoose.connection.close();
    });

    it('should add a new user with wrong email', async () => {
        mockUser2.correo = 'testuser2example.com';
        try {
            await Usuario.create(mockUser2); 
            throw new Error('Expected an error but did not get one');
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toMatch(/email/); 
        }
        mockUser2.correo = 'testuser2@example.com';
    });
    
    it('should add a new user with wrong preferenciasLectura', async () => {
        mockUser2.preferenciasLectura = [];
        try {
            await Usuario.create(mockUser2); 
            throw new Error('Expected an error but did not get one');
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toMatch(/preferenciasLectura/); 
        }
        mockUser2.correo = ['Romance', 'Fantasy'];
    });
    
    it('should add a new user with wrong preferenciasLectura', async () => {
        mockUser2.preferenciasLectura = ['Dreiker'];
        try {
            await Usuario.create(mockUser2); 
            throw new Error('Expected an error but did not get one');
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toMatch(/preferenciasLectura/); 
        }
        mockUser2.correo = ['Romance', 'Fantasy'];
    });

    // it('should return all users without passwords', async () => {
    //     const res = await request(app)
    //         .get('/usuarios')
    //         .set('Authorization', `Bearer ${token}`); 
    //     expect(res.status).toBe(200);
    //     expect(Array.isArray(res.body)).toBe(true);
    //     expect(res.body[0]).toHaveProperty('username', mockUser2.username);
    //     expect(res.body[0]).not.toHaveProperty('password');
    // });
    it('should return 500 if internal error in getAllUsers', async () => {
        jest.spyOn(Usuario, 'find').mockRejectedValueOnce(new Error('Database error'));
        const res = await request(app)
            .get('/usuarios')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('error', 'Database error');
    });
    it('should return 500 if internal error in getUserById', async () => {
        jest.spyOn(Usuario, 'findById').mockRejectedValueOnce(new Error('Database error'));
        const res = await request(app)
            .get(`/usuarios/${mockUser2Id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('error', 'Database error');
    });

    // it('should return a single user by ID', async () => {
    //     const res = await request(app)
    //         .get(`/usuarios/${mockUser2Id}`)
    //         .set('Authorization', `Bearer ${token}`);
    //     expect(res.status).toBe(200);
    //     expect(res.body).toHaveProperty('username', 'testuser2');
    //     expect(res.body).not.toHaveProperty('password');
    // });

    it('should return 404 if user is not found', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app)
            .get(`/usuarios/${fakeId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'User not found');
    });

    // it('should update a user profile', async () => {
    //     const updatedData = { username: 'updateduser' };

    //     const res = await request(app)
    //         .put(`/usuarios/${mockUser2Id}`)
    //         .set('Authorization', `Bearer ${token}`)
    //         .send(updatedData);
    //     expect(res.status).toBe(200);
    //     expect(res.body).toHaveProperty('message', 'User updated successfully');
    //     expect(res.body.updatedUser).toHaveProperty('username', 'updateduser');
    // });

    it('should return 404 if user is not found', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app)
            .put(`/usuarios/${fakeId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ username: 'nonexistentuser' });

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'User not found');
    });

    it('should return 400 if Bad Request', async () => {
        const res = await request(app)
            .put(`/usuarios/${mockUser2Id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ username: 'a' });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'Validation failed: username: The username must be at least 4 characters long');
    });

    // it('should delete a user account', async () => {
    //     const res = await request(app)
    //         .delete(`/usuarios/${mockUser2Id}`)
    //         .set('Authorization', `Bearer ${token}`);

    //     expect(res.status).toBe(200);
    //     expect(res.body).toHaveProperty('message', 'User deleted successfully');
    // });

    it('should return 404 if user is not found', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app)
            .delete(`/usuarios/${fakeId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'User not found');
    });
    it('should return 500 if internal error in deleteUser', async () => {
        jest.spyOn(Usuario, 'findByIdAndDelete').mockRejectedValueOnce(new Error('Database error'));
        const res = await request(app)
            .delete(`/usuarios/${mockUser2Id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('error', 'Database error');
    });
});
