import express from 'express';
import { authUser, requireUser } from '../middleware/auth.ts';
import { signup, signin, logout } from '../controllers/authController.ts';

const authRoutes = express.Router();

authRoutes.post('/signup', signup);
authRoutes.post('/signin', signin);
authRoutes.get('/logut', logout);


// router.use(deserializeUser, requireUser); // route protected

export default authRoutes;