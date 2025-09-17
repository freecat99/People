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
        firstName:z.string().min(3,{message:"first name must be atleast 3 characters"}).max(20),
        lastName:z.string().min(3,{message:"last name must be atleast 3 characters"}).max(20),
        email:z.string().email(),
        password:z.string().min(8,{message:"password must be atleast 8 characters"}).max(50),
        occupation:z.string().min(4,{message:"occupation must be atleast 4 characters"}).max(20),
        location:z.string().min(4,{message:"location must be atleast 4 characters"}).max(20),
        picturePath: z.string().optional()
    });
    
    const result = schema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({message: 'Bad Request:', error:result})
    }
    next();
}

export const loginValidate = (req, res, next)=>{
    const schema = z.object({
        email:z.string().email(),
        password:z.string().min(8).max(50),
    });
    
    const result = schema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({message: 'Bad Request:', error:result.error.errors})
    }
    next();
}