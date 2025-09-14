import jwt from 'jsonwebtoken'
import z from 'zod';

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
    const schema = z.object({
        firstName:z.string().min(3).max(10),
        lastName:z.string().min(3).max(10),
        email:z.string().email(),
        password:z.string().min(8).max(50),
        occupation:z.string().min(4).max(20),
        location:z.string().min(4).max(20),
        picturePath: z.string().optional()
    });
    
    const result = schema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({message: 'Bad Request:', error:result.error.errors})
    }
    next();
}

export const loginValidate = (req, res, next)=>{
    const schema = z.object({
        email:z.string().email(),
        password:z.string().min(8).max(50)
    });
    
    const result = schema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({message: 'Bad Request:', error:result.error.errors})
    }
    next();
}