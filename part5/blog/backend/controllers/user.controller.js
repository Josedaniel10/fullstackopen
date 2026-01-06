const userRouter = require('express').Router()
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
    res.json(users)
})


userRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body

    const userExists = await User.findOne({ username })

    if (userExists !== null) {
        return res.status(400).json({ error: 'The username already exists' })
    }

    if (username.length < 3 || password.length < 3) {
        return res.status(400).json({ error: 'The username and password must have at least 3 characters' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await newUser.save()
    return res.status(201).json(savedUser)
})

module.exports = userRouter