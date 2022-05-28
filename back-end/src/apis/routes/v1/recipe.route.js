const express = require('express')
const validate = require('../../../middlewares/validate')
const checkUserLogged = require('../../../middlewares/check-user-logged')

const { recipeValidation } = require('../../validations')
const { recipeController } = require('../../controllers')

const router = express.Router()

router.get('/search/:search', recipeController.getRecipeBySearch)
router.get('/tag/:tag', recipeController.getRecipeByTag)
router.get('/random/:number', recipeController.getRecipeRandom)
router.get('/category/:category', recipeController.getRecipesByCategory)
router.get('/getAll/admin', recipeController.getRecipesAdmin)
router.get('/getAll/user', recipeController.getRecipesUser)
router.get('/:recipeID', validate(recipeValidation.getRecipeInfoByID), recipeController.getRecipeInfo)

router.delete('/:recipeID', checkUserLogged, validate(recipeValidation.getRecipeInfoByID), recipeController.deleteRecipe)
router.post('/', validate(recipeValidation.createRecipeSchema), recipeController.createRecipe)

module.exports = router
