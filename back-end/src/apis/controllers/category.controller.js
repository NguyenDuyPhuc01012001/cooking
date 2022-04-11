const catchAsync = require('../../utils/catch-async')
const { cateService } = require('../services')
const httpStatus = require('http-status')

const getCategories = catchAsync(async (req, res, next) => {
    const cates = await cateService.getCategories()
    return res.status(httpStatus.OK).send(cates)
})

module.exports = {
    getCategories,
}
