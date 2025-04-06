import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateJWTtoken = (res,userId) => {
    const token =  jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '7d'
    })

    const isProduction = process.env.NODE_ENV === 'production';

    if (isProduction) {
        res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Secure; SameSite=None; Partitioned; Max-Age=604800`);
    } else {
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
    }

    return token;
}

export default generateJWTtoken