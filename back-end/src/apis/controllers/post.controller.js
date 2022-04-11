const httpStatus = require('http-status')
const { postService } = require('../services')
const catchAsync = require('../../utils/catch-async')
const env = require('../../configs/env')

const getPosts = catchAsync(async (req, res) => {
    const user = req.user ? req.user : false
    const { sort, page } = req.query
    const posts = await postService.getPostsSale(page, sort, user)
    const lengthDocuments = await postService.countDocuments(env.pageLimit)
    res.status(httpStatus.OK).send({
        lengthDocuments,
        posts,
    })
})

const getPostInfo = catchAsync(async (req, res, next) => {
    const user = req.user ? req.user : false
    const post = await postService.getPostInfo(req.params.postID, user)
    return res.status(httpStatus.OK).send(post)
})

const getPostBySearch = catchAsync(async (req, res, next) => {
    const user = req.user ? req.user : false
    const { sort, page } = req.query
    const realestate = await postService.getPostBySearch(req.query, user)
    return res.status(httpStatus.OK).send(realestate)
})

const createPost = catchAsync(async (req, res) => {
    const realeState = await postService.createPost(req.body)
    res.status(httpStatus.CREATED).send({ realeState })
})

const getNewestPostBydateUploaded = catchAsync(async (req, res, next) => {
    const newest = await postService.getNewestPostBydateUploaded(req.params.date)
    return res.status(httpStatus.OK).send(newest)
})

const getNewestPost = catchAsync(async (req, res, next) => {
    const user = req.user ? req.user : false
    const newest = await postService.getNewestPost(user)
    return res.status(httpStatus.OK).send(newest)
})

module.exports = {
    getPosts,
    getPostInfo,
    createPost,
    getNewestPostBydateUploaded,
    getNewestPost,
    getPostBySearch,
}
