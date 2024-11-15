import connectDB from './db.js';
import Libro from './models/book.js';
import Usuario from './models/user.js';
import Progreso from './models/progress.js';

const main = async () => {
    await connectDB();

    // Crear un nuevo libro
    const libro = new Libro({
        titulo: 'Cien Años de Soledad',
        autor: 'Gabriel García Márquez',
        genero: 'Realismo Mágico',
        fechaPublicacion: new Date('1967-05-30'),
        paginas: 417,
    });
    await libro.save();

    // Crear un nuevo usuario
    const usuario = new Usuario({
        nombre: 'Marco Napierski',
        correo: 'marco@example.com',
        preferenciasLectura: ['Ciencia Ficción', 'Realismo Mágico'],
    });
    await usuario.save();

    // Crear un nuevo progreso de lectura
    const progreso = new Progreso({
        usuarioId: usuario._id,
        libroId: libro._id,
        estadoLectura: 'en progreso',
        porcentajeLeido: 45,
        notas: 'Interesante desarrollo de personajes.',
    });
    await progreso.save();

    console.log('Datos insertados correctamente');
    process.exit();
};

main().catch((error) => console.error('Error en la aplicación:', error));
