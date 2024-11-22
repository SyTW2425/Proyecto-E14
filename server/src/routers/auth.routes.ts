import { Router } from 'express';
import { signup, signin } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest.middleware.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  [
    body('username')
      .notEmpty()
      .withMessage('El nombre de usuario es obligatorio'),
    body('correo').isEmail().withMessage('Correo electrónico inválido'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('preferenciasLectura')
      .isArray()
      .withMessage('Las preferencias de lectura deben ser un array'),
  ],
  validateRequest,
  signup,
);

//authRouter.post('/signup', signup); // Ruta para registro
authRouter.post('/signin', signin); // Ruta para inicio de sesión

export default authRouter;
