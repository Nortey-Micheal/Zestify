import express from 'express'
import { signup, verifyEmail } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/signup',signup)
userRouter.post('/verify-email',verifyEmail)

export default userRouter