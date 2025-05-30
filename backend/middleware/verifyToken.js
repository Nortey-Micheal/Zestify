import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const verifyJWTToken = async (req,res,next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({message: "Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({message: "Unauthorized"})
        }
        req.userId = decoded.userId
        next()
    } catch (error) {
        res.status(401).json({message: "Unauthorized"})
    }
}

export default verifyJWTToken; 