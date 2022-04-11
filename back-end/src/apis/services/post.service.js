const { Post } = require('../models')
const CustomError = require('../../utils/custom-error')
const httpStatus = require('http-status')
const env = require('../../configs/env')

const getPosts = async (page) => {
    let posts = await Post.find({ 'type.category.code': env.categories.rent })
        .populate({
            path: 'detail.address',
            populate: ['province_Id', 'district_Id', 'ward_Id'],
        })
        .limit(env.pageLimit)
        .skip(env.pageLimit * page)

    return posts
}

const createPost = async (realestate) => {
    return Post.create(realestate)
}

const getPostInfo = async (postID, user) => {
    const post = await Post.find({ _id: postID }).populate({
        path: 'detail.address',
        populate: ['province_Id', 'district_Id', 'ward_Id'],
    })
    return post
}

const getPostBySearch = async (form, user) => {
    // console.log(form);
    // const project = form.project ? form.project : null;
    const obj = {}
    // if (project != null) {
    //     obj['project'] = project
    // }
    let posts = await Post.find(obj)
        .populate({
            path: 'detail.address',
            populate: ['province_Id', 'district_Id', 'ward_Id'],
        })
        .limit(env.pageLimit)
        .skip(env.pageLimit * form.page)

    const countPost = await Post.countDocuments(obj)

    return { posts, lengthDocuments: countPost }
}

const getNewestPostBydateUploaded = async (date) => Post.find({ dateUpload: date }).sort({ dateUpload: -1 }).limit(8)

const getNewestPost = async (user) => Post.find({}).sort({ dateUpload: -1 }).limit(16)

const countDocuments = async (categoryCode) => Post.countDocuments({ 'type.category.code': categoryCode })

const countDocumentsByTypeID = async (typeID) => Post.countDocuments({ 'type._id': typeID })

const getPostsByUser = async (querySearch, user) => {
    // const formSearch = { 'author._id': user._id }

    let formSearch = {}
    if (user.role === 'USER') formSearch = { 'author._id': user._id }

    if (querySearch.dateStart) {
        formSearch['dateUpload'] = { $gt: querySearch.dateStart }
    }
    if (querySearch.postID) {
        formSearch['_id'] = querySearch.postID
    }
    const posts = await Post.find(formSearch)
        .limit(env.pageLimit)
        .skip(env.pageLimit * querySearch.page)

    const countPosts = await Post.countDocuments(formSearch)

    return {
        posts,
        lengthDocuments: countPosts,
    }
}

const deletePost = async (postID) => {
    const foundPost = await Post.findById(postID)
    if (!foundPost) {
        throw new CustomError(httpStatus.BAD_REQUEST, `Post ${postID} not found`)
    }
    return Post.findByIdAndDelete(foundPost)
}

module.exports = {
    countDocuments,
    getPostInfo,
    createPost,
    getNewestPostBydateUploaded,
    getNewestPost,
    getPostBySearch,
    getPosts,
    getPostsByUser,
    countDocumentsByTypeID,
    deletePost,
}
