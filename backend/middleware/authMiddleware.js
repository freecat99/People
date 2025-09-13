import jwt from 'jsonwebtoken'
import joi from 'joi'

export const verifyToken = async(req, res, next) =>{
    try {
        let token = req.header('Authorization');
        if(!token){
            return res.status(403).json({"message":"unauthorized user"});
        }
        
        if(token.startsWith('Bearer ')||token.startsWith('bearer')){
            token = token.slice(7, token.length).trimLeft(); 
        }
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res.status(403).json({"message":"login again"});
        }

        req.user = verified;
        next();

    } catch (error) {
        res.status(500).json({"error": error.message})
    }
}

export const registerValidate = (req, res, next)=>{
    const schema = joi.object({
        firstName:joi.string().min(3).max(10).required(),
        lastName:joi.string().min(3).max(10).required(),
        email:joi.string().email().required(),
        password:joi.string().min(8).max(50).required(),
    });
    
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message: 'Bad Request:', error})
    }
    next();
}

export const loginValidate = (req, res, next)=>{
    const schema = joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(8).max(50).required(),
    });
    
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message: 'Bad Request:', error})
    }
    next();
}