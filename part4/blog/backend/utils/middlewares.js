const User = require('../models/user.model.js')
const jwt = require('jsonwebtoken')
const config = require('./config.js')

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name ===  'JsonWebTokenError') {
    return res.status(401).json({ error: 'token invalid' })
  }

  next(error)
}

const addTokenToTheRequest = (req, res, next) => {
  const authorization = req.get('authorization')
  if(!authorization) {
    req.token = null;
    return next() 
  }
  const auth = authorization.trim()
  if (auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (req, res, next) => {
  if(!req.token) {
    req.user = null;
    return next()
  }
  const decodedToken = jwt.verify(req.token, config.JWT_SECRET)
  if (!decodedToken || !decodedToken.id) {
    req.user = null
    return next()
  }
  const foundUser = await User.findById(decodedToken.id)
  if(!foundUser) {
    req.user = null
    return next()
  }
  req.user = foundUser
  next()
}


module.exports = {
    errorHandler,
    addTokenToTheRequest,
    userExtractor
}