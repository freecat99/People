import express from 'express';
import{ getUser, getFriends, toggleFriend } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const userRouter = express.Router();


//read request
userRouter.get('/:id', verifyToken, getUser);
userRouter.get('/:id', verifyToken, getFriends);


//update
userRouter.patch('/:id/:friendId', verifyToken, toggleFriend); 

export default userRouter;