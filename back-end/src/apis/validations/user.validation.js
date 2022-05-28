const Joi = require('joi')

const { password, cardNumber, objectId } = require('./customize.validation')

const createUserSchema = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required().custom(password),
        fullName: Joi.string().required(),
        image: Joi.string(),
        isVerifyEmail: Joi.boolean(),
    }),
}

const changePassword = {
    params: Joi.object().keys({
        userID: Joi.string().custom(objectId),
    }),
    body: Joi.object().required({
        oldPassword: Joi.string().required().custom(password),
        newPassword: Joi.string().required().custom(password),
    }),
}

const deleteUserSchema = {
    params: Joi.object().keys({
        userID: Joi.string().custom(objectId),
    }),
}
const getUserByID = {
    params: Joi.object().keys({
        userID: Joi.string().required().custom(objectId),
    }),
}

const getUsersByAdmin = {
    query: Joi.object().keys({
        name: Joi.string(),
        page: Joi.string(),
        sort: Joi.string(),
    }),
}

const authorization = {
    body: Joi.object().keys({
        userID: Joi.string().required().custom(objectId),
        role: Joi.string().required(),
    }),
}

const deletePostsByUser = {
    params: Joi.object().keys({
        postID: Joi.string().required().custom(objectId),
    }),
}

module.exports = {
    createUserSchema,
    deleteUserSchema,
    changePassword,
    getUserByID,
    getUsersByAdmin,
    authorization,
    deletePostsByUser,
}
