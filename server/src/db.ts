import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/biblioteca';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI); // Simplificado sin opciones adicionales
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1); // Detener la aplicación en caso de error
    }
};

export default connectDB;
