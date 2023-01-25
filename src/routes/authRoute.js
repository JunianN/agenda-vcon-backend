import express from "express";
import * as controller from '../controllers/authController.js';
import * as auth from '../middlewares/auth.js';

const router = express.Router();

// untuk sign up admin
router.post('/signup/admin', auth.authenticate, auth.authorizeAdmin, controller.signupAdmin);

export default router;