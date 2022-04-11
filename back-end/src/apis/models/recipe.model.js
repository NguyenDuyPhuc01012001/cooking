const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RecipeSchema = new Schema(
    {
        cook: {
            //in minutes
            type: String,
            required: true,
        },
        prep: {
            //in minutes
            type: String,
            required: true,
        },
        serving: {
            //number of people serving
            type: String,
            required: true,
        },
        ingredients: {
            type: [String],
            required: true,
        },
        directions: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: false,
        versionKey: false,
    }
)

const Recipe = mongoose.model('details', RecipeSchema)

module.exports = {
    RecipeSchema,
    Recipe,
}
