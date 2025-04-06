import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateJWTtoken = (res,userId) => {
    const token =  jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '7d'
    })

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
        httpOnly: true, // cookie cannot be accessed by client side scripts
        secure:  isProduction,// cookie will only be set on https
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: isProduction ? 'none' : 'lax', // cookie will be sent in cross-site requests
        
    })

    return token;
}

export default generateJWTtoken