import express from 'express'
import { login } from '../controllers/authController.js';
import { loginValidate } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/login', loginValidate, login)

export default authRouter   