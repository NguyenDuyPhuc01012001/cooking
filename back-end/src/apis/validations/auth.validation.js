const Joi = require('joi')

const { email, password, cardNumber, objectId } = require('./customize.validation')

const loginSchema = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
}

const registerSchema = {
    body: Joi.object().keys({
        email: Joi.string().required().custom(email),
        password: Joi.string().required().custom(password),
        fullName: Joi.string().required(),
        image: Joi.string(),
        birthday: Joi.string(),
        sex: Joi.string(),
        isVerifyEmail: Joi.boolean(),
    }),
}

const activateEmailTokenSchema = {
    body: Joi.object().keys({
        token: Joi.string(),
    }),
}

const validateResetPasswordTokenSchema = {
    body: Joi.object().keys({
        token: Joi.string(),
    }),
}

const resetPasswordTokenSchema = {
    body: Joi.object().keys({
        token: Joi.string(),
        password: Joi.string().required().custom(password),
    }),
}

module.exports = {
    loginSchema,
    registerSchema,
    activateEmailTokenSchema,
    resetPasswordTokenSchema,
}
