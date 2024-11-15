import connectDB from './db.js';
import Libro from './models/book.js';
import Usuario from './models/user.js';
import Progreso from './models/progress.js';

const main = async () => {
  try {
    await connectDB();

    // Crear un nuevo libro
    const libro = new Libro({
      titulo: 'Cien Años de Soledad',
      autor: 'Gabriel García Márquez',
      genero: 'Realismo Mágico',
      fechaPublicacion: new Date('1967-05-30'),
      paginas: 417,
      sinopsis:
        'Una obra maestra del realismo mágico que sigue la historia de la familia Buendía en el pueblo ficticio de Macondo.',
      isbn: '978-84-376-0494-7',
    });

    await libro.save();
    console.log('Libro creado:', libro);

    // Crear un nuevo usuario
    const usuario = new Usuario({
      nombre: 'Marco',
      apellidos: 'Napierski',
      correo: 'marco@example.com',
      username: 'marco123',
      preferenciasLectura: ['Ciencia Ficción', 'Realismo Mágico'],
    });

    await usuario.save();
    console.log('Usuario creado:', usuario);

    // Crear un nuevo progreso de lectura
    const progreso = new Progreso({
      usuarioId: usuario._id,
      libroId: libro._id,
      estadoLectura: 'En progreso',
      porcentajeLeido: 45,
      notas: 'Interesante desarrollo de personajes.',
    });

    await progreso.save();
    console.log('Progreso de lectura creado:', progreso);

    console.log('Datos insertados correctamente');
  } catch (error) {
    console.error('Error en la aplicación:', error);
    process.exit(1);
  }
};

main().catch((error) => console.error('Error en la aplicación:', error));
