import connectDB from './db.js';
import Libro from './models/book.js';
import Usuario from './models/user.js';
import Progreso from './models/progress.js';
import express from 'express';
import book_router from './routers/book.routes.js';
import user_router from './routers/user.routes.js';

const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Conectar a la base de datos 

connectDB()
  .then(() => console.log('Conexión a MongoDB en script exitosa'))
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  });
 
// Configuración de rutas
app.use('/libros', book_router);
app.use('/usuarios', user_router);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
