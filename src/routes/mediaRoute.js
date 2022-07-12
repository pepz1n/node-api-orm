import { Router } from 'express';
import { isAuthenticated } from '../utils/isAuthenticated';
const media = require('../controllers/media.controller');
const router = Router();



router.post('/pegar', isAuthenticated, media.Media);


export default router;
