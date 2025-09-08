import jwt from "jsonwebtoken";

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

