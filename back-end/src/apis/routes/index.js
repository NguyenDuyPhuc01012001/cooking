const express = require('express')
const router = express.Router()

//Client
const authRoute = require('./v1/auth.route')
const userRoute = require('./v1/user.route')
const cateRoute = require('./v1/category.route')
const newsRoute = require('./v2/news.route')
const companyRoute = require('./v1/company.route')
const recipeRoute = require('./v1/recipe.route')

//Admin
const userAdminRoute = require('./v2/user.admin.route')

router.use('/v1/auth', authRoute)
router.use('/v1/user', userRoute)
router.use('/v1/categories', cateRoute)
router.use('/v2/news', newsRoute)
router.use('/v1/company', companyRoute)
router.use('/v1/recipe', recipeRoute)
router.use('/admin/users', userAdminRoute)

module.exports = router
