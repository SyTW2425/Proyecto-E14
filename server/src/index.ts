import connectDB from './db.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import book_router from './routers/book.routes.js';
import user_router from './routers/user.routes.js';
import authRouter from './routers/auth.routes.js';
import genresRouter from './routers/genres.routes.js';
import userBookRouter from './routers/userBooks.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
export const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS -- Permite solicitudes desde cualquier origen
app.use(cors());

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
app.use('/userbooks', userBookRouter);
// Ruta para autenticación
app.use('/auth', authRouter);

// Handler para errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' });
});

// Middleware para manejo de errores
app.use(errorHandler);

// Iniciar el servidor
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
