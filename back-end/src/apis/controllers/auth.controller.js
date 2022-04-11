const httpStatus = require('http-status')
const CustomError = require('../../utils/custom-error')

const catchAsync = require('../../utils/catch-async')
const { tokenService, userService, authService } = require('../services')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

const login = catchAsync(async (req, res) => {
    const { user } = req
    const token = await tokenService.generateToken(user)
    res.setHeader('Authorization', `Bearer ${token}`)
    res.status(httpStatus.OK).send({ user })
})

const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body)
    const token = await tokenService.generateToken(user)

    res.setHeader('Authorization', `Bearer ${token}`)
    res.status(httpStatus.CREATED).send({
        user: user,
        message: 'Send email verification',
    })
})

const sendVerificationEmail = catchAsync(async (req, res) => {
    const { email } = req.user
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(email)
    await authService.sendVerificationEmail(verifyEmailToken, email)
    res.status(httpStatus.OK).send({
        message: 'Send email verification',
    })
})

const activateEmailToken = catchAsync(async (req, res) => {
    const { token } = req.body
    await authService.activateEmailToken(token)
    res.status(httpStatus.OK).send({
        message: 'Your token has been activated',
    })
})

const updateEmail = catchAsync(async (req, res) => {
    const { email, new_email } = req.body
    const user = await userService.updateEmail(email, new_email)

    const token = await tokenService.generateToken(user)
    res.setHeader('Authorization', `Bearer ${token}`)
    res.status(httpStatus.OK).send({ user })
})

const forgotPassword = catchAsync(async (req, res) => {
    const { email } = req.body
    const user = await userService.getUserByEmail(email)
    if (user == null) throw new CustomError('400', 'User not found')

    const resetPasswordToken = await tokenService.generateResetPasswordToken(email)
    await authService.sendResetPasswordEmail(resetPasswordToken, email)
    res.status(httpStatus.OK).send({
        message: 'Send email to reset password',
        token: resetPasswordToken,
    })
})

const resetPassword = catchAsync(async (req, res) => {
    const { token, password } = req.body
    await authService.resetPassword(token, password)
    res.status(httpStatus.OK).send({
        message: 'Change your password successfully',
    })
})

module.exports = {
    login,
    register,
    sendVerificationEmail,
    activateEmailToken,
    updateEmail,
    forgotPassword,
    resetPassword,
}
