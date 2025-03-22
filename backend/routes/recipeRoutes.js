import express from 'express'
import { addRecipe } from '../controllers/recipeController.js'

const recipeRouter = express.Router()

recipeRouter.post('/add-recipe',addRecipe)

export default recipeRouter