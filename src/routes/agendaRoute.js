import express from 'express';
import * as controller from '../controllers/agendaController.js';
import * as auth from '../middlewares/auth.js';

const router = express.Router();

//Membuat agenda baru.
router.post('/', controller.create);

export default router;