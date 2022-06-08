const express = require('express')
const router = express.Router()

const { cateController } = require('../../controllers')

router.get('/', cateController.getCategoriesAdmin)
router.get('/getAll', cateController.getCategories)

module.exports = router
