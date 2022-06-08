const { Category } = require('../models')
const env = require('../../configs/env')

const getCategories = async (page) => {
    let categories = await Category.find({})
        .limit(env.pageAdminLimit)
        .skip(env.pageAdminLimit * page)
    const countCategory = await Category.countDocuments({})
    return { categories, lengthDocuments: countCategory }
}

const getAllCategories = async () => {
    return Category.find({})
}
module.exports = {
    getCategories,
    getAllCategories,
}
