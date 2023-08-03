import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js";
//---------------------------------------------------------------------

//funciones que se ejecutan antes de llegar a una ruta
//next = continuar a la ruta real 
export const authRequired = (req, res, next) => {
    const {token} = req.cookies;
    
    if(!token) return res.status(401).json({message: "No token, authorization denied"});
    jwt.verify(token, TOKEN_SECRET, (error, user) => {
        if(error) return res.status(403).json({message: 'Invalid token'});

        req.user = user;
        
        next();
    })
    
}