const jwt = require('jsonwebtoken')
const moment = require('moment')
const httpStatus = require('http-status')
const CustomError = require('../../utils/custom-error')
const env = require('../../configs/env')

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */

const generateToken = (user) => {
    const payload = {
        id: user.id,
        name: user.fullName,
        email: user.email,
        isVerifyEmail: user.isVerifyEmail,
    }
    if (user.isVerifyEmail == false) {
        throw new CustomError(httpStatus.FORBIDDEN, 'User not verify email')
    }
    return jwt.sign(payload, env.passport.jwtToken, {
        expiresIn: env.passport.jwtAccessExpired,
    })
}

const generateVerifyEmailToken = (email) => {
    const verifyEmailToken = jwt.sign(
        {
            email,
        },
        process.env.PASSPORT_JWT_ACCOUNT_ACTIVATION,
        {
            expiresIn: '24h',
        }
    )
    return verifyEmailToken
}

const generateResetPasswordToken = (email) => {
    const resetPasswordToken = jwt.sign(
        {
            email,
        },
        process.env.PASSPORT_JWT_RESET_PASSWORD,
        {
            expiresIn: '5m',
        }
    )
    return resetPasswordToken
}

module.exports = {
    generateToken,
    generateVerifyEmailToken,
    generateResetPasswordToken,
}
