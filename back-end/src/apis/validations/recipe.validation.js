const Joi = require('joi')

const { objectId } = require('./customize.validation')

const getRecipeInfoByID = {
    params: Joi.object().keys({
        recipeID: Joi.string().required().custom(objectId),
    }),
}

const createRecipeSchema = {
    body: Joi.object().keys({
        title: Joi.string().required().min(5).max(99),
        category: Joi.string().required(),
        description: Joi.string(),
        cookTime: Joi.string(),
        prepTime: Joi.string(),
        people: Joi.string(),
        difficulty: Joi.string(),
        pictures: Joi.array().items(Joi.string()),
        ingredients: Joi.array().items(Joi.string()),
        instructions: Joi.array().items(Joi.string()),
        tags: Joi.array().items(Joi.object()),
        author: Joi.object().keys({
            _id: Joi.string(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            fullName: Joi.string(),
            image: Joi.string(),
            birthday: Joi.date(),
            sex: Joi.string(),
            isVerifyEmail: Joi.boolean(),
        }),
        dateUpload: Joi.date(),
    }),
}

const getRecipe = {
    params: Joi.object().keys({
        page: Joi.string(),
        sort: Joi.string(),
    }),
}

module.exports = {
    getRecipeInfoByID,
    createRecipeSchema,
    getRecipe,
}
