const mongoose = require('mongoose')
const { UserSchema } = require('./user.model')
const Schema = mongoose.Schema

const RecipeSchema = new Schema(
    {
        category: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
        },
        pictures: {
            type: [String],
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        cookTime: {
            //in minutes
            type: String,
            required: true,
        },
        prepTime: {
            //in minutes
            type: String,
            required: true,
        },
        people: {
            //number of people serving
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: 'Đây là một món ngon',
        },
        ingredients: {
            type: [String],
            required: true,
        },
        instructions: {
            type: [String],
            required: true,
        },
        author: {
            //type: mongoose.Schema.Types.ObjectId,
            //ref: 'user',
            type: UserSchema,
        },
        tags: {
            type: Object,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const Recipe = mongoose.model('recipe', RecipeSchema)

module.exports = {
    RecipeSchema,
    Recipe,
}
