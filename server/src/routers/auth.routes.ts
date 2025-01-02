import { Router } from 'express';
import { signup, signin } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest.middleware.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  [
    body('username').notEmpty().withMessage('The username is required'),
    body('correo').isEmail().withMessage('The email is not valid'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('The password must be at least 6 characters long'),
    body('preferenciasLectura')
      .isArray()
      .withMessage('The reading preferences must be an array'),
  ],
  validateRequest,
  signup,
);

//authRouter.post('/signup', signup); // Ruta para registro
authRouter.post('/signin', signin); // Ruta para inicio de sesión

export default authRouter;
