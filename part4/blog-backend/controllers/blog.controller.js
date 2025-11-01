const blogRouter = require('express').Router()
const Blog = require('../models/blog.model.js')
const User = require('../models/user.model.js')
const jwt = require('jsonwebtoken')
const config = require('../utils/config.js')
const middlewares = require('../utils/middlewares.js')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const uniqueBlog = await Blog.findById(id);

  res.json(uniqueBlog);
})


blogRouter.post('/', middlewares.userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body;

  const user = req.user

  if (!title || !author || !url) {
    res.status(400).json({ error: 'Bad request' })
    return;
  }
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogRouter.delete('/:id', middlewares.userExtractor, async (req, res) => {
  const idBlog = req.params.id;
  const user = req.user
  const blog = await Blog.findById(idBlog)

  if(!blog) {
    return res.status(404).json({ error: "blog not found" })
  }

  if(!user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  if (!(blog.user._id.toString() === user.id)) {
    console.log("No esta autorizado")
    res.status(401).json({ error: 'unauthorized user' })
  }
  await Blog.findByIdAndDelete(idBlog);
  res.status(200).json({ message: 'blog deleted' })
})

blogRouter.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body;
  const id = req.params.id;

  if (!title || !url) {
    res.status(400).json({ error: 'Bad request' })
    return;
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
  res.json(updatedBlog);
})

module.exports = blogRouter;