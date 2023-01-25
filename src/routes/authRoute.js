import express from "express";
import * as controller from '../controllers/authController.js';
import * as auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup/admin', controller.signupAdmin);

export default router;