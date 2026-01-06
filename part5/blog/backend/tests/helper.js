const Blog = require('../models/blog.model.js')
const User = require('../models/user.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config.js')

const initialBlogs = [
    {
        title: "Blog test",
        author: "Sydney Wauk",
        url: "http://localhost:3002/api/blogs",
        likes: 2,
    },
    {
        title: "Test test",
        author: "Sydney Wauk",
        url: "http://localhost:3002/api/blogs",
        likes: 3,
    }
]

const initialUsers = [
    {
        username: 'root 1',
        name: 'Test one',
        password: 'test'
    },
    {
        username: 'root 2',
        name: 'Test two',
        password: 'test'
    },
    {
        username: 'root 3',
        name: 'Test three',
        password: 'test'
    },
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const setupTestUser = async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({username: 'root', name: 'root', passwordHash})
    return user.save()
}

const getUserFromToken = async (token) => {
    const onlyToken = token.replace('Bearer ', '')
    const decodedToken = jwt.verify(onlyToken, config.JWT_SECRET)
    const user = await User.findById(decodedToken.id)

    return user
}

const setupTestBlogs = async (user) => {
    await Blog.deleteMany({})
    const blogsWithUser = initialBlogs.map(b => ({
        ...b, user: user._id
    }))

    const promiseArray = blogsWithUser.map(b => new Blog(b).save())
    const blogs = await Promise.all(promiseArray)

    user.blogs = blogs.map(b => b._id)
    await user.save()

    return blogs
}

const tokenForTestUser = async () => {
    const user = await setupTestUser()

    const userForToken = {
        username: user.username,
        id: user._id.toString()
    }

    const token = jwt.sign(userForToken, config.JWT_SECRET)
    return `Bearer ${token}`
}

module.exports = {
    initialBlogs,
    blogsInDB,
    initialUsers,
    usersInDB,
    tokenForTestUser,
    setupTestUser,
    setupTestBlogs,
    getUserFromToken
}