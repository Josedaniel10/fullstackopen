const testingRouter = require('express').Router()
const User = require('../models/user.model')
const Blog = require('../models/blog.model')


testingRouter.post('/reset', async (req, res)=> {
    await User.deleteMany({})
    await Blog.deleteMany({})

    res.status(204).end()
})


module.exports = testingRouter