const loginRouter = require('express').Router()
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)
    
    if(!(user && passwordCorrect)){
        return res.status(401).json({error: 'invalid username or password'})
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userForToken, config.JWT_SECRET)

    res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter