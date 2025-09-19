import express from 'express';
import User from '../models/userModel.js';
import Post from '../models/postModel.js';

//create
export const createPost = async(req, res) =>{
    try {

        const {userId, description} = req.body;
        const picturePath = req.file ? req.file.filename : 'default.jpeg';

        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes:{},
            comments:[]
        });

        const post = await newPost.save();
        res.status(201).json({"message":"posted successfully", post, success:true});

        
    } catch (error) {
        res.status(409).json({"message":error.message, success:false});
    }
};

//read

export const getFeedPosts = async(req, res) =>{
    try {
        const post = await Post.find();
        res.status(200).json(post);
        
    } catch (error) {
        res.status(409).json({"message":error.message});
    }
}

export const getUserPosts = async(req, res)=>{
    try {
        const {userId} = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);

    } catch (error) {
        res.status(409).json({"message":error.message});
    }
}

//update

export const likePost = async(req, res)=>{
    try {
        const {id, userId} = req.params;
        console.log("as",id, userId);
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);

        }else{
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes:post.likes},
            {new:true}
            
        );

        res.status(200).json({"message":`toggled like`,'liked':isLiked, updatedPost});

    } catch (error) {
        res.status(409).json({"message":error.message});
    }
}