import connectDB from './db.js';
//import Libro from './models/book.js';
//import Usuario from './models/user.js';
//import Progreso from './models/progress.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import book_router from './routers/book.routes.js';
import user_router from './routers/user.routes.js';
import authRouter from './routers/auth.routes.js';
import genresRouter from './routers/genres.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
export const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS
app.use(cors()); // Permite solicitudes desde cualquier origen

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
app.use('/genres', genresRouter);
app.use('/auth', authRouter); // Ruta para autenticación

// Middleware para manejo de errores
app.use(errorHandler);

// Iniciar el servidor
// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en http://localhost:${PORT}`);
// });
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

export const startServer = () => {
  return app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
};

export default app;
