import express from 'express';
import {getFeedPosts, getUserPosts, likePost} from '../controllers/postController.js'
import { verifyToken } from '../middleware/authMiddleware.js';

const postRouter = express.Router();

//read- verify token to get that the user is logged in before showing any posts
postRouter.get('/', verifyToken, getFeedPosts);
postRouter.get('/:userId', verifyToken, getUserPosts);

//update
postRouter.patch('/:id/:userId/like', verifyToken, likePost);

export default postRouter;
