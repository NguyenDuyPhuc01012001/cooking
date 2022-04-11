const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const CustomError = require('../../utils/custom-error')
const { User, Liked, RealEstate } = require('../models')
const env = require('../../configs/env')

const getUsers = async (querySearch) => {
    console.log(querySearch)
    const { sort, page, userID, role } = querySearch
    // Filter
    let formSearch = {}
    if (userID && userID != 'all') {
        formSearch['_id'] = userID
    }
    if (role != 'all' && role) {
        formSearch['role'] = role
    }
    console.log(formSearch)
    // Sort
    let sortProperty
    let ascOrDesc
    switch (sort) {
        case '0': // Ten tai khoan tu A -> Z
            sortProperty = 'fullName'
            ascOrDesc = 1
            break
        case '1': // Ten tai khoan tu Z -> A
            sortProperty = 'fullName'
            ascOrDesc = -1
            break
        case '2': // Ngay tao tai khoan tu cu  -> moi
            sortProperty = 'createdAt'
            ascOrDesc = 1
            break
        case '3': // Ngay tao tai khoan tu moi -> cu
            sortProperty = 'createdAt'
            ascOrDesc = -1
            break
        default:
            // Ten tai khoan tu A -> Z
            sortProperty = 'fullName'
            ascOrDesc = -1
            break
    }
    const countUsers = await User.countDocuments(formSearch)
    const users = await User.find(formSearch)
        .sort({ [sortProperty]: ascOrDesc })
        .limit(env.pageLimit)
        .skip(env.pageLimit * page)
    return {
        users,
        lengthDocuments: countUsers,
    }
}

const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new CustomError('401', 'Email already taken')
    }
    return User.create(userBody)
}

const updateUser = async (userID, userBody) => {
    const foundUser = await User.findById(userID)
    if (!foundUser) {
        throw new CustomError(httpStatus.BAD_REQUEST, 'User not found')
    }
    return User.findByIdAndUpdate(userID, userBody, {
        new: true,
    })
}

const updateEmail = async (email, new_email) => {
    const user = await User.findOne({ email })

    if (await User.isEmailTaken(new_email)) {
        throw new CustomError('401', 'Email already taken')
    }

    user.email = new_email

    user.save((err, data) => {
        if (err) {
            throw new CustomError('406', 'Update successfully')
        }
    })
    return user
}

const changePassword = async (userID, oldPassword, newPassword) => {
    const foundUser = await User.findById(userID)
    if (!foundUser) throw new CustomError('404', 'User not found')

    const match = await bcrypt.compare(oldPassword, foundUser.password)
    if (match) {
        foundUser.password = newPassword
        foundUser.save()
        return 'Change successfull'
    }
    throw new CustomError('409', 'Wrong password')
}

const deleteUser = async (userID) => {
    const foundUser = await User.findById(userID)
    if (!foundUser) throw new CustomError(httpStatus.NOT_FOUND, 'User not found')
    if (foundUser.role === 'ADMIN') throw new CustomError(httpStatus.BAD_REQUEST, 'Can not delete user as role ADMIN')
    return User.findByIdAndDelete(userID)
}

const getUserByEmail = async (email) => {
    return User.findOne({ email })
}

const getUserByID = async (userID) => {
    return User.find({ _id: userID })
}

const authorization = async (userID, role) => {
    const foundUser = await User.findById(userID)
    if (!foundUser) {
        throw new CustomError(httpStatus.BAD_GATEWAY, 'User not found')
    }
    if (['ADMIN', 'USER'].indexOf(role) === -1) {
        throw new CustomError(httpStatus.BAD_GATEWAY, `Not authorized ${role}`)
    }
    foundUser.role = role
    return foundUser.save()
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
    getUserByEmail,
    getUserByID,
    updateEmail,
    authorization,
}
