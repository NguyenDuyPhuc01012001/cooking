const { Recipe } = require('../models')
const CustomError = require('../../utils/custom-error')
const httpStatus = require('http-status')
const env = require('../../configs/env')

const getAdminRecipes = async (query) => {
    const { title, category, difficulty, page } = query
    const obj = {}
    if (title != null && title != 'undefined') obj['title'] = { $regex: title, $options: 'i' }
    if (category != null && category != 'undefined') obj['category'] = { $regex: category, $options: 'i' }
    if (difficulty != null && difficulty != 'undefined') obj['difficulty'] = { $regex: difficulty, $options: 'i' }

    let recipes = await Recipe.find(obj)
        .limit(env.pageAdminLimit)
        .skip(env.pageAdminLimit * page)
    const countRecipe = await Recipe.countDocuments(obj)
    return { recipes, lengthDocuments: countRecipe }
}

const getUserRecipes = async (query) => {
    const { page } = query
    let recipes = await Recipe.find({})
        .limit(env.pageLimit)
        .skip(env.pageLimit * page)
    const countRecipe = await Recipe.countDocuments({})
    return { recipes, lengthDocuments: countRecipe }
}

const createRecipe = async (recipe) => {
    return Recipe.create(recipe)
}

const getRecipeInfo = async (recipeID, user) => {
    const recipe = await Recipe.find({ _id: recipeID })
    return recipe
}

const getRecipeRandom = async (numberRandom, user) => {
    const recipes = await Recipe.aggregate([{ $sample: { size: Number(numberRandom) } }])
    return recipes
}

const getRecipeBySearch = async (title, page) => {
    const obj = {}
    if (title != null) {
        obj['title'] = { $regex: title, $options: 'i' }
    }
    let recipes = await Recipe.find(obj)
        .limit(env.pageLimit)
        .skip(env.pageLimit * page)

    const countRecipe = await Recipe.countDocuments(obj)

    return { recipes, lengthDocuments: countRecipe }
}

const getRecipeByTag = async (tag, page) => {
    const obj = {}
    if (tag != null) {
        obj['tags'] = { $elemMatch: { tag: { $regex: tag, $options: 'i' } } }
    }
    let recipes = await Recipe.find(obj)
        .limit(env.pageLimit)
        .skip(env.pageLimit * page)

    const countRecipe = await Recipe.countDocuments(obj)

    return { recipes, lengthDocuments: countRecipe }
}

const getRecipesByCategory = async (category, page) => {
    const obj = {}
    if (category != null) {
        obj['category'] = { $regex: category, $options: 'i' }
    }

    let recipes = await Recipe.find(obj)
        .limit(env.pageLimit)
        .skip(env.pageLimit * page)
    const countRecipe = await Recipe.countDocuments(obj)

    return { recipes, lengthDocuments: countRecipe }
}

const deleteRecipe = async (recipeID) => {
    const foundRecipe = await Recipe.findById(recipeID)
    if (!foundRecipe) {
        throw new CustomError(httpStatus.BAD_REQUEST, `Recipe ${recipeID} not found`)
    }
    return Recipe.findByIdAndDelete(foundRecipe)
}

module.exports = {
    getRecipeInfo,
    getRecipeBySearch,
    getAdminRecipes,
    getUserRecipes,
    getRecipesByCategory,
    getRecipeRandom,
    getRecipeByTag,
    deleteRecipe,
    createRecipe,
}
