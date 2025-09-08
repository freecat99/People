import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

//register

export const register = async(req, res)=>{
    try {
        const {firstName, lastName, email, password, picturePath, friends, location, occupation} = req.body;
        if(!firstName || !lastName || !email|| !password){
            return res.json({"message":"fields necessary"});
        }

        const user = await User.findOne({email});
        if(user){
            return res.json({"message":"email already registered"});
        }

        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, email, password:hashedPass, picturePath, friends, location, occupation
        });
        const savedUser = await newUser.save();
        res.status(201).json({
            "message": "user registered",
            savedUser
        })

    } catch (error) {
        res.status(500).json({"message":error.message})
    }
}

//login

export const login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email|| !password){
            return res.json({"message":"all fields necessary"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({"message":"email not registered"});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.status(401).json({"message":"wrong password"});
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
        delete user.password;

        res.status(200).json({
            "message": "user logged",
            token
        })

    } catch (error) {
        res.status(500).json({"message":error.message})
    }
}