const Joi = require('joi')

const { objectId } = require('./customize.validation')

const getPostInfoByID = {
    params: Joi.object().keys({
        postID: Joi.string().required().custom(objectId),
    }),
}

const getNewestPostBydateUploaded = {
    params: Joi.object().keys({
        date: Joi.date().required(),
    }),
}

const createPostSchema = {
    body: Joi.object().keys({
        title: Joi.string().required().min(30).max(99),
        category: Joi.object()
            .required()
            .keys({
                _id: Joi.string().required().custom(objectId),
                name: Joi.string().required(),
                code: Joi.string(),
            }),
        description: Joi.string(),
        recipe: Joi.object()
            .required()
            .keys({
                cook: Joi.string().required(),
                prep: Joi.string(),
                serving: Joi.string(),
                ingredients: Joi.array().items(Joi.string()).required(),
                directions: Joi.array().items(Joi.string()).required(),
            }),
        author: Joi.object().keys({
            _id: Joi.string(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            fullName: Joi.string(),
            image: Joi.string(),
            isVerifyEmail: Joi.boolean(),
        }),
        dateUpload: Joi.date(),
    }),
}

const getPost = {
    params: Joi.object().keys({
        page: Joi.string(),
        sort: Joi.string(),
    }),
}

module.exports = {
    getPostInfoByID,
    createPostSchema,
    getNewestPostBydateUploaded,
    getPost,
}
