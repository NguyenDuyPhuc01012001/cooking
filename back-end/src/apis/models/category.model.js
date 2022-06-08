const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema(
    {
        title: {
            type: String,
        },
        image: {
            type: String,
        },
        short_title: {
            type: String,
        },
    },
    {
        timestamps: false,
        versionKey: false,
    }
)

const Category = mongoose.model('category', CategorySchema)

module.exports = {
    CategorySchema,
    Category,
}
