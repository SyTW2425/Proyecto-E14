import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/signup', signup); // Ruta para registro
authRouter.post('/login', login); // Ruta para inicio de sesión

export default authRouter;
