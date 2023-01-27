import express from "express";
import * as controller from '../controllers/authController.js';
import * as auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/signin', controller.signin);

// untuk sign up admin
router.post('/signup',  controller.signup);

export default router;