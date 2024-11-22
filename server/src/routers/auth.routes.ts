import { Router } from 'express';
import { signup, signin } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/signup', signup); // Ruta para registro
authRouter.post('/signin', signin); // Ruta para inicio de sesión

export default authRouter;
