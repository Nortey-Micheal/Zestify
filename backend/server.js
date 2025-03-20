import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './routes/userRoutes.js'

dotenv.config()

const app = express()

app.use(cors());
app.use(express.json())
app.use('/api/user',userRouter)

try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected successfully to the MongoDB database')
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port: ${process.env.PORT}`)
    })
} catch (error) {
    console.log(error)
}