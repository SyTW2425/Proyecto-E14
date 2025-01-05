import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const MONGODB_URI =
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_MONGODB_URI
      : process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      'La variable de entorno para la URI de MongoDB no está definida.',
    );
  }

  try {
    console.log('Iniciando conexión a MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      dbName: process.env.NODE_ENV === 'test' ? 'tests' : 'production-db',
    });
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    //process.exit(1);
  }
};

export default connectDB;
