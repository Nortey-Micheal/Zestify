import express from 'express'
import { login, signup, verifyEmail } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/signup',signup)
userRouter.post('/verify-email',verifyEmail)
userRouter.post('/login',login)

export default userRouter