import { Router, json } from 'express';
import { generosPermitidos } from '../config/generos.js';

const genresRouter = Router();

genresRouter.use(json());

genresRouter.get('/', (req, res) => {
  res.json({ genres: generosPermitidos });
});

export default genresRouter;
