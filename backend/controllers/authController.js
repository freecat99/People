import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import joi from 'joi'
import { loginValidate } from '../middleware/authMiddleware.js';

//register

export const register = async(req, res)=>{
    try {
        const {firstName, lastName, email, password, friends, location, occupation} = req.body;
        const picturePath = req.file ? req.file.filename : 'default.jpeg';
        if(!firstName || !lastName || !email|| !password){
            return res.json({message:"fields necessary", success:false});
        }

        const user = await User.findOne({email});
        if(user){
            return res.json({"message":"email already registered", success:false});
        }

        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, email, password:hashedPass, picturePath, friends, location, occupation
        });
        const savedUser = await newUser.save();
        res.status(201).json({
            "message": "user registered",
            savedUser, success:true
        })

    } catch (error) {
        res.status(500).json({"message":error.message, success:false})
    }
}

//login

export const login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email|| !password){
            return res.json({"message":"all fields necessary", success:false});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({"message":"email not registered", success:false});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.status(401).json({"message":"wrong password", success:false});
        }

        const token = jwt.sign({id:user._id, name:user.firstName, email: user.email, photo: user.picturePath}, process.env.JWT_SECRET, {expiresIn:'24h'});
        delete user.password;

        res.status(200).json({
            message: "logged in successfully",
            token, success:true
        })

    } catch (error) {
        console.log("err",error)
        res.status(500).json({"message":error.message, success:false})
    }
}