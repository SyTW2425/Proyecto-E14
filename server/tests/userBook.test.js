import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from '@jest/globals';
import app from '../src/index';
import Usuario from '../src/models/user';
import mongoose from 'mongoose';
import jest from 'jest-mock';

describe('UserBook Endpoints', () => {
	// Variables auxiliares
	let token;
	let mockUserId;
	const mockUser = {
		username: 'testuser3',
		correo: 'testuser3@gmail.com',
		password: 'password123',
		preferenciasLectura: ['Romance', 'Fantasy']
	};
	const mockBook = {
		titulo: 'Harry Potter',
		autor: 'J.K. Rowling',
		genero: 'Fantasy',
		paginas: 300,
		sinopsis: 'Harry Potter is a series of seven fantasy novels written by British author, J. K. Rowling.',
		portada: 'https://images-na.ssl-images-amazon.com/images/I/51UoqRAxwEL._SX331_BO1,204,203,200_.jpg'
	};
	let mockBookId;
	beforeAll(async () => {
		// Ensure
		if (mongoose.connection.readyState === 0) {
				const dbUri = process.env.TEST_DB_URI || 'mongodb://localhost:27017/testdb';
				await mongoose.connect(dbUri, {
						useNewUrlParser: true,
						useUnifiedTopology: true
				});
		}
		await Usuario.deleteMany({});
	});
	
	beforeEach(async () => {
		// Create test user and get token
		await Usuario.create(mockUser);
		const res = await request(app).post('/auth/signin').send({
				correo: mockUser.correo,
				password: mockUser.password
		});
		token = res.body.token;
		mockUserId = res.body.user._id;
		// Create test book
		const res2 = await request(app).post('/libros').set('Authorization', `Bearer ${token}`).send(mockBook);
		mockBookId = res2.body.book._id;
	});

	afterEach(async () => {
		const collections = mongoose.connection.collections;

    for (const key in collections) {
      await collections[key].deleteMany({}); // Limpia todos los documentos
    }
	});

	afterAll(async () => {
		// Clear the database and close the connection
		await Usuario.deleteMany({});
		await mongoose.connection.close();
	});

	it('should add a book to a user\'s library', async () => {
		const res = await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId
			});
		const userBookId = res.body.userBook._id;
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('message', 'Book added to user library');
		expect(res.body).toHaveProperty('userBook');
		expect(res.body.userBook).toHaveProperty('usuarioId', mockUserId);
		expect(res.body.userBook).toHaveProperty('libroId', mockBookId);
		expect(res.body.userBook).toHaveProperty('progreso', 0);
		expect(res.body.userBook).toHaveProperty('paginasLeidas', 0);
		expect(res.body.userBook).toHaveProperty('estadoLectura', 'Pending');
		expect(res.body.userBook).toHaveProperty('_id', userBookId);
		expect(res.body.userBook).toHaveProperty('notas', []);
		expect(res.body.userBook).toHaveProperty('__v', 0);
	});

	it ('should get an error if a book already exists', async () => {
		await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId
			});
		const res = await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId
			});
		expect(res.statusCode).toEqual(400);
		expect(res.body).toEqual({ error: 'Book already exists in user library' });
	});

	it('should get an error if user or book does not exist', async () => {
		const fakeId = undefined;
		const res = await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: fakeId
			});
		expect(res.statusCode).toEqual(400);
		expect(res.body).toEqual({ error: 'UserBook validation failed: libroId: The book is required' });

		const res2 = await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: fakeId,
				libroId: mockBookId
			});

		expect(res2.statusCode).toEqual(400);
		expect(res2.body).toEqual({ error: 'UserBook validation failed: usuarioId: The user is required' });
	});

	it('should get all books from a user\'s library', async () => {
		await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId
			});
		const res = await request(app)
			.get(`/userbooks/${mockUserId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveLength(1);
	});

	it('should update the pages read and progress', async () => {
		await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId
			});
    const res = await request(app)
      .patch('/userbooks/progress')
      .set('Authorization', `Bearer ${token}`)
      .send({
        usuarioId: mockUserId,
        libroId: mockBookId,
        paginasLeidas: 150,
        totalPaginas: 300,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Pages read and progress updated');
    expect(res.body.userBook).toHaveProperty('progreso', 50);
    expect(res.body.userBook).toHaveProperty('paginasLeidas', 150);
  });

	it('should not update the pages read and progress due to unvalid parameters', async () => {
		await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId
			});
    const res = await request(app)
      .patch('/userbooks/progress')
      .set('Authorization', `Bearer ${token}`)
      .send({
        usuarioId: mockUserId,
        libroId: mockBookId,
        paginasLeidas: null,
        totalPaginas: 300,
      });

    expect(res.statusCode).toEqual(400);
		expect(res.body).toEqual({ error: 'Missing required fields: usuarioId, libroId, paginasLeidas, or totalPaginas' });
    
		const res2 = await request(app)
      .patch('/userbooks/progress')
      .set('Authorization', `Bearer ${token}`)
      .send({
        usuarioId: mockUserId,
        libroId: mockBookId,
        paginasLeidas: 500,
        totalPaginas: 300,
      });
		expect(res2.statusCode).toEqual(400);
		expect(res2.body).toEqual({ error: 'Pages read must be between 0 and the total number of pages' });

		const fakeId = new mongoose.Types.ObjectId();
		const res3 = await request(app)
			.patch('/userbooks/progress')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: fakeId,
				paginasLeidas: 150,
				totalPaginas: 300,
			});
		expect(res3.statusCode).toEqual(404);
		expect(res3.body).toEqual({ error: 'Book not found in user library' });
  });

	it('should return 500 Internal Server Error when an exception occurs updating the pages read and progress', async () => {
    // Mock para forzar un error al interactuar con la base de datos
    jest.spyOn(mongoose.Model, 'findOneAndUpdate').mockImplementationOnce(() => {
      throw new Error('Forced database error');
    });

    const res = await request(app)
      .patch('/userbooks/progress')
			.set('Authorization', `Bearer ${token}`)
      .send({
        usuarioId: 'mockUserId',
        libroId: 'mockBookId',
        paginasLeidas: 50,
        totalPaginas: 100,
      });

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({ error: 'Internal Server Error' });

    // Restaurar implementación original
    mongoose.Model.findOneAndUpdate.mockRestore();
  });

  it('should update the reading status', async () => {
		await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId
			});
    const res = await request(app)
      .patch('/userbooks/status')
      .set('Authorization', `Bearer ${token}`)
      .send({
        usuarioId: mockUserId,
        libroId: mockBookId,
        estadoLectura: 'Completed',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Reading status updated');
    expect(res.body.userBook).toHaveProperty('estadoLectura', 'Completed');
  });

	it('should not update the reading status when book is not found', async () => {
		await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId
			});
		const fakeId = new mongoose.Types.ObjectId();
		const res = await request(app)
			.patch('/userbooks/status')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: fakeId,
				estadoLectura: 'Completed',
			});
		expect(res.statusCode).toEqual(404);
		expect(res.body).toEqual({ error: 'Book not found in user library' });
	});


	it('should return 500 Internal Server Error when an exception occurs updating the reading status', async () => {
    // Mock para forzar un error al interactuar con la base de datos
    jest.spyOn(mongoose.Model, 'findOneAndUpdate').mockImplementationOnce(() => {
      throw new Error('Forced database error');
    });

    const res = await request(app)
      .patch('/userbooks/status')
			.set('Authorization', `Bearer ${token}`)
      .send({
        usuarioId: 'mockUserId',
        libroId: 'mockBookId',
        estadoLectura: 'Completed',
      });

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({ error: 'Forced database error' });

    // Restaurar implementación original
    mongoose.Model.findOneAndUpdate.mockRestore();
  });

  it('should add a note to a book', async () => {
		await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId
			});
    const res = await request(app)
      .post('/userbooks/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        usuarioId: mockUserId,
        libroId: mockBookId,
        content: 'Great book!',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Note added');
    expect(res.body.userBook.notas).toHaveLength(1);
    expect(res.body.userBook.notas[0]).toHaveProperty('content', 'Great book!');
  });

	it('should not add an empty note to a book', async () => {
		await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId
			});
		const res = await request(app)
			.post('/userbooks/notes')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId,
				content: '',
			});

		expect(res.statusCode).toEqual(400);
		expect(res.body).toEqual({ error: 'Note content cannot be empty' });
	});

	it('should not add a note to a book that does not exist', async () => {
		await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId
			});
		const fakeId = new mongoose.Types.ObjectId();
		const res = await request(app)
			.post('/userbooks/notes')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: fakeId,
				content: 'Great book!',
			});
		expect(res.statusCode).toEqual(404);
		expect(res.body).toEqual({ error: 'Book not found in user library' });
	});

	it('should return 500 Internal Server Error when an exception occurs adding a note', async () => {
		// Mock para forzar un error al interactuar con la base de datos
		jest.spyOn(mongoose.Model, 'findOneAndUpdate').mockImplementationOnce(() => {
			throw new Error('Forced database error');
		});

		const res = await request(app)
			.post('/userbooks/notes')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: 'mockUserId',
				libroId: 'mockBookId',
				content: 'Great book!',
			});
		
		expect(res.statusCode).toEqual(500);
		expect(res.body).toEqual({ error: 'Forced database error' });
	});

  it('should remove a note from a book', async () => {
		await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId
			});
    const noteRes = await request(app)
      .post('/userbooks/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        usuarioId: mockUserId,
        libroId: mockBookId,
        content: 'Great book!',
      });

    const noteId = noteRes.body.userBook.notas[0]._id;

    const res = await request(app)
      .delete('/userbooks/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        usuarioId: mockUserId,
        libroId: mockBookId,
        notaId: noteId,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Note removed');
    expect(res.body.userBook.notas).toHaveLength(0);
  });

	it('should not remove a note from a book that does not exist', async () => {
		await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId
			});
		const fakeId = new mongoose.Types.ObjectId();
		const res = await request(app)
			.delete('/userbooks/notes')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: fakeId,
				notaId: fakeId,
			});
		expect(res.statusCode).toEqual(404);
		expect(res.body).toEqual({ error: 'Book not found in user library' });
	});

	it('should return 500 Internal Server Error when an exception occurs removing a note', async () => {
		// Mock para forzar un error al interactuar con la base de datos
		jest.spyOn(mongoose.Model, 'findOneAndUpdate').mockImplementationOnce(() => {
			throw new Error('Forced database error');
		});

		const res = await request(app)
			.delete('/userbooks/notes')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: 'mockUserId',
				libroId: 'mockBookId',
				notaId: 'noteId',
			});

		expect(res.statusCode).toEqual(500);
		expect(res.body).toEqual({ error: 'Forced database error' });
	});

	it('should update a note from a book', async () => {
		await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId
			});
		const noteRes = await request(app)
			.post('/userbooks/notes')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId,
				content: 'Great book!',
			});
	
		const noteId = noteRes.body.userBook.notas[0]._id;

		const res = await request(app)
			.patch('/userbooks/notes')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId,
				notaId: noteId,
				content: 'Updated note',
			});

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('message', 'Note updated');
		expect(res.body.userBook.notas).toHaveLength(1);
		expect(res.body.userBook.notas[0]).toHaveProperty('content', 'Updated note');
	});

	it('should not update a note to an empty note from a book', async () => {
		await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId
			});
		const noteRes = await request(app)
			.post('/userbooks/notes')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId,
				content: 'Great book!',
			});
	
		const noteId = noteRes.body.userBook.notas[0]._id;

		const res = await request(app)
			.patch('/userbooks/notes')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId,
				notaId: noteId,
				content: '',
			});

		expect(res.statusCode).toEqual(400);
		expect(res.body).toEqual({ error: 'Note content cannot be empty' });
	});

	it('should not update a note from a book or note that does not exist', async () => {
		await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId
			});
		const noteRes = await request(app)
			.post('/userbooks/notes')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId,
				content: 'Great book!',
			});
	
		const noteId = noteRes.body.userBook.notas[0]._id;
		const fakeId = new mongoose.Types.ObjectId();
		const res = await request(app)
			.patch('/userbooks/notes')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: fakeId,
				notaId: noteId,
				content: 'Updated note',
			});
		expect(res.statusCode).toEqual(404);
		expect(res.body).toEqual({ error: 'Book or note not found in user library' });
	});

	it('should return 500 Internal Server Error when an exception occurs updating a note', async () => {
		// Mock para forzar un error al interactuar con la base de datos
		jest.spyOn(mongoose.Model, 'findOneAndUpdate').mockImplementationOnce(() => {
			throw new Error('Forced database error');
		});

		const res = await request(app)
			.patch('/userbooks/notes')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: 'mockUserId',
				libroId: 'mockBookId',
				notaId: 'noteId',
				content: 'Updated note',
			});

		expect(res.statusCode).toEqual(500);
		expect(res.body).toEqual({ error: 'Forced database error' });
	});

	it('should remove a book from a user\'s library', async () => {
    await request(app)
			.post('/userbooks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				usuarioId: mockUserId,
				libroId: mockBookId
			});
		const res = await request(app)
      .delete('/userbooks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        usuarioId: mockUserId,
        libroId: mockBookId,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Book removed from library');
  });
});
