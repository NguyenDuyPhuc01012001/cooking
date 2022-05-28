const catchAsync = require('../../utils/catch-async')
const { userService, realEstateService } = require('../services')
const httpStatus = require('http-status')

const getUsers = catchAsync(async (req, res, next) => {
    const result = await userService.getUsers(req.query)
    res.status(httpStatus.OK).send(result)
})

const getUserByID = catchAsync(async (req, res, next) => {
    const users = await userService.getUserByID(req.params.userID)
    res.status(httpStatus.OK).send(users)
})

const createUser = catchAsync(async (req, res, next) => {
    const user = await userService.createUser(req.body)
    res.status(httpStatus.CREATED).send({ user })
})

const updateUser = catchAsync(async (req, res, next) => {
    const newUser = await userService.updateUser(req.params.userID, req.body)
    res.status(httpStatus.OK).send({ newUser })
})

const changePassword = catchAsync(async (req, res, next) => {
    const result = await userService.changePassword(req.params.userID, req.body.oldPassword, req.body.newPassword)
    res.status(httpStatus.OK).send(result)
})

const deleteUser = catchAsync(async (req, res, next) => {
    const deletedUser = await userService.deleteUser(req.params.userID)
    res.status(httpStatus.OK).send({ deletedUser })
})

const checkCardNumber = catchAsync(async (req, res, next) => {
    const { userID, cardNumber } = req.params
    const userWithCardNumbers = await userService.checkCardNumber(cardNumber)

    let isMatched

    if (userWithCardNumbers.length >= 2) {
        isMatched = true
    } else {
        let { _id } = userWithCardNumbers[0]._id

        // the user update another field except the user's cardNumber
        if (userID == _id) {
            isMatched = false
        }
        // the user update cardNumber and cardNumber can be matched another
        else {
            isMatched = true
        }
    }

    res.status(httpStatus.OK).send({ isMatched: isMatched })
})

const likePost = catchAsync(async (req, res, next) => {
    const value = await userService.likePost(req.user._id, req.body.realEstate)
    res.status(httpStatus.OK).send({
        list: value.likeds,
        id: req.body.realEstate,
    })
})

const getPostsByUser = catchAsync(async (req, res, next) => {
    const result = await realEstateService.getPostsByUser(req.query, req.user)
    res.send(result)
})

const getTypeUsers = catchAsync(async (req, res, next) => {
    const type = ['USER', 'ADMIN']
    res.status(httpStatus.OK).send({ type })
})

const authorization = catchAsync(async (req, res, next) => {
    const user = await userService.authorization(req.body.userID, req.body.role)
    return res.status(httpStatus.OK).send({ user })
})

const deletePostsByUser = catchAsync(async (req, res, next) => {
    const realEstate = await realEstateService.deletePost(req.params.realEstateID)
    return res.status(httpStatus.OK).send(realEstate)
})

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
    getUserByID,
    checkCardNumber,
    likePost,
    getPostsByUser,
    getTypeUsers,
    authorization,
    deletePostsByUser,
}
