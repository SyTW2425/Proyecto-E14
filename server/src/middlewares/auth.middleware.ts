import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Leer el token del encabezado Authorization

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    req.userId = decoded.id; // Guardar el ID del usuario en la request
    next();
  } catch {
    res.status(403).json({ error: 'The token is not valid or has expired.' });
  }
};
