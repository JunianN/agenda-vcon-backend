import express from 'express';
import * as controller from '../controllers/agendaController.js';
import * as auth from '../middlewares/auth.js';

const router = express.Router();

//Melihat semua agenda
router.get('/', controller.findAll);

//melihat agenda dengan id tertentu
router.get('/:id', controller.findById);

//Membuat agenda baru.
router.post('/', controller.create);

//Menghapus agenda dengan id tertentu
router.delete('/:id', controller.deleteById);

//mengubah agenda dengan id tertentu
router.put('/:id', controller.updateById);

export default router;