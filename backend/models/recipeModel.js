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
        likes: {
            value: {
                type: Number,
                default: 0
            },
            by: {
                type: Array
            }
        },
        image: {
            type: String,
        },
        authorPic: {
            type: String
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
    {timestamps: true}
)

recipeSchema.statics.addRecipe = async function ({title, description, ingredients, image, author, instructions, cookTime, authorPic, category}) {
    
    if (!title || !description || !ingredients || !author || !instructions || !cookTime || !category || !authorPic) {
        throw new Error('All field must be filled')
    }
    
    try {
        const recipe = await this.create({title, description, ingredients, image, author, instructions, cookTime, authorPic, category})

        return recipe

    } catch (error) {
        throw new Error(error.message);
    }
}

recipeSchema.statics.getAllRecipes = async function (limit,page) {
    try {
        const recipes = await this.find()
                                  .skip((page - 1) * limit)
                                  .limit(limit)
        return recipes
    } catch (error) {
        throw new Error(error)
    }
}

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe