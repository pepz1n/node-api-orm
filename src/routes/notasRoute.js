import { Router } from 'express';
const Notas = require('../controllers/notas.controller');
const router = Router();

router.get('/:id', Notas.getNotas);

router.post('/create', Notas.createNotas);

router.post('/delete', Notas.deleteNotas);

router.post('/update/:id', Notas.updateNotas);

export default router;
