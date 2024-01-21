import express from 'express';
import { authUser, requireUser } from '../middleware/auth.ts';
import { signup, login, logout, loginForm } from '../controllers/authController.ts';

const authRoutes = express.Router();

authRoutes.get('/login', loginForm);

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/logout', logout);


// router.use(deserializeUser, requireUser); // route protected

export default authRoutes;