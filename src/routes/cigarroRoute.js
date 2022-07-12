import { Router } from 'express';
const cigarro = require('../controllers/cigarros.controller');
const router = Router();

router.get('/:id', cigarro.getCigarro);

router.post('/create', cigarro.createCigarro);

router.post('/delete', cigarro.deleteCigarro);

router.post('/update/:id', cigarro.updateCigarro);

export default router;
