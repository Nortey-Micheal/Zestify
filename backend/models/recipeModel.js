import mongoose from 'mongoose'

const recipeSchema = new mongoose.Schema(
    {
        author: {
            type: String,
            immutable: true
        },
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        ingredients: {
            type: Array(
                {id: {
                    type: String,
                    required: true
                },
                value: {
                    type: String,
                    required: true
                }}
            ),
        },
        instructions: {
            type: Array(
                {id: {
                    type: String,
                    required: true
                },
                value: {
                    type: String,
                    required: true
                }}
            ),
        },
        cookTime: {
            type: String,
            required: true,
        },
        servings: {
            type: Number,
        },
        category: {
            type: String,
            required: true,
        }
    },
    {timeStamps: true}
)

recipeSchema.statics.addRecipe = async function ({title, description, ingredients, image, author, instructions, cookTime, category}) {
    
    if (!title || !description || !ingredients || !author || !instructions || !cookTime || !category) {
        // console.log({title, description, ingredients, image, author, instructions, cookTime, category})
        throw new Error('All field must be filled')
    }
    
    try {
        const recipe = await this.create({title, description, ingredients, image, author, instructions, cookTime, category})

        return recipe

    } catch (error) {
        throw new Error(error.message);
    }
}

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe