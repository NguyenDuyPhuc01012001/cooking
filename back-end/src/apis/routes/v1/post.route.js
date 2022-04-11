const express = require('express')
const validate = require('../../../middlewares/validate')
const checkUserLogged = require('../../../middlewares/check-user-logged')

const { postValidation } = require('../../validations')
const { postController } = require('../../controllers')

const router = express.Router()

router.get(
    '/',
    // checkUserLogged,
    validate(postValidation.getPost),
    postController.getPosts
)
router.get('/search', postController.getPostBySearch)
router.get('/:postID', validate(postValidation.getPostInfoByID), postController.getPostInfo)

router.get(
    '/all/newest/:date',
    // checkUserLogged,
    validate(postValidation.getNewestPostBydateUploaded),
    postController.getNewestPostBydateUploaded
)

router.get('/newest/dateupload/', postController.getNewestPost)

router.post('/', validate(postValidation.createPostSchema), postController.createPost)

module.exports = router
