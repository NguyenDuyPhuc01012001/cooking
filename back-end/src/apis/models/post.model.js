const mongoose = require('mongoose')
const { RecipeSchema } = require('./recipe.model')
const { UserSchema } = require('./user.model')
const { CategorySchema } = require('./category.model')
const Schema = mongoose.Schema

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: CategorySchema,
            required: true,
        },
        description: {
            type: String,
            default: 'Đây là một món ngon',
        },
        recipe: {
            type: RecipeSchema,
            required: true,
        },
        author: {
            //type: mongoose.Schema.Types.ObjectId,
            //ref: 'user',
            type: UserSchema,
        },
        dateUpload: {
            type: Date,
            default: Date.now(),
        },
        pictures: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
)
const Post = mongoose.model('RealEstate', PostSchema)

module.exports = {
    PostSchema,
    Post,
}
