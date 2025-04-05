import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './routes/userRoutes.js'
import recipeRouter from './routes/recipeRoutes.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(cors({origin: `${process.env.FRONTEND_URL}`, credentials: true}));
app.use(cookieParser())
app.use(express.json())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))

app.use('/api/user',userRouter)
app.use('/api/recipe',recipeRouter)

try {

    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected successfully to the MongoDB database')
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port: ${process.env.PORT}`)
    })
    
} catch (error) {
    console.log(error)
}