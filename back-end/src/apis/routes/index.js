const express = require('express')
const router = express.Router()

//Client
const authRoute = require('./v1/auth.route')
const userRoute = require('./v1/user.route')
const postRoute = require('./v1/post.route')
const cateRoute = require('./v1/category.route')
const newsRoute = require('./v1/news.route')
const companyRoute = require('./v1/company.route')

//Admin
const userAdminRoute = require('./v2/user.admin.route')

router.use('/v1/auth', authRoute)
router.use('/v1/user', userRoute)
router.use('/v1/post', postRoute)
router.use('/v1/categories', cateRoute)
router.use('/v1/news', newsRoute)
router.use('/v1/company', companyRoute)

router.use('/admin/users', userAdminRoute)

module.exports = router
