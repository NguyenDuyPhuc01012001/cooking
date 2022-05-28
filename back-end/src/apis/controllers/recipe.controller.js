const httpStatus = require('http-status')
const { recipeService } = require('../services')
const catchAsync = require('../../utils/catch-async')
const env = require('../../configs/env')

const getRecipesAdmin = catchAsync(async (req, res) => {
    const recipes = await recipeService.getAdminRecipes(req.query)
    res.status(httpStatus.OK).send(recipes)
})
const getRecipesUser = catchAsync(async (req, res) => {
    const recipes = await recipeService.getUserRecipes(req.query)
    res.status(httpStatus.OK).send(recipes)
})

const getRecipeInfo = catchAsync(async (req, res, next) => {
    const recipe = await recipeService.getRecipeInfo(req.params.recipeID)
    return res.status(httpStatus.OK).send(recipe)
})

const deleteRecipe = catchAsync(async (req, res, next) => {
    await recipeService.deleteRecipe(req.params.recipeID)
    return res.status(httpStatus.OK)
})

const getRecipeBySearch = catchAsync(async (req, res, next) => {
    const recipe = await recipeService.getRecipeBySearch(req.params.search, req.query.page)
    return res.status(httpStatus.OK).send(recipe)
})

const getRecipeByTag = catchAsync(async (req, res, next) => {
    const recipe = await recipeService.getRecipeByTag(req.params.tag, req.query.page)
    return res.status(httpStatus.OK).send(recipe)
})

const getRecipesByCategory = catchAsync(async (req, res, next) => {
    const recipes = await recipeService.getRecipesByCategory(req.params.category, req.query.page)
    return res.status(httpStatus.OK).send(recipes)
})

const createRecipe = catchAsync(async (req, res) => {
    const recipe = await recipeService.createRecipe(req.body)
    res.status(httpStatus.CREATED).send(recipe)
})

const getRecipeRandom = catchAsync(async (req, res, next) => {
    const recipes = await recipeService.getRecipeRandom(req.params.number)
    return res.status(httpStatus.OK).send(recipes)
})

module.exports = {
    createRecipe,
    getRecipesAdmin,
    getRecipesUser,
    getRecipeInfo,
    getRecipesByCategory,
    getRecipeBySearch,
    getRecipeRandom,
    getRecipeByTag,
    deleteRecipe,
}
