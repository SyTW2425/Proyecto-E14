import dotenv from 'dotenv';
import express from 'express';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Middleware que transforma el cuerpo de las peticiones a JSON
app.use(express.json());
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  console.error(
    'La URI de conexión a MongoDB no está definida en el archivo .env',
  );
} else {
  console.log('Conectando a MongoDB...');
}

app.get('/ping', (_, res) => {
  console.log('Pong!');
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on puerto ${PORT}`);
});
