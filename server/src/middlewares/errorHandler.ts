import { Request, Response } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  //next: NextFunction,
) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Error interno del servidor' });
};
