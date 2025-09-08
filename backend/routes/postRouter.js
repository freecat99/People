import express from 'express';
import {getFeedPosts, getUserPosts, likePost} from '../controllers/postController.js'
import { verifyToken } from '../middleware/authMiddleware.js';

const postRouter = express.Router();

//read
postRouter.get('/', verifyToken, getFeedPosts);
postRouter.get('/:userId/posts', verifyToken, getUserPosts);

//update
postRouter.patch('/:id/like', verifyToken, likePost);

export default postRouter;
