import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateJWTtoken = (res,userId) => {
    const token =  jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '7d'
    })

    res.cookie('token', token, {
        httpOnly: true, // cookie cannot be accessed by client side scripts
        secure:true, // cookie wiill only be set on https
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'none', 
    })

    return token;
}

export default generateJWTtoken