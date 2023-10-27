const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response) => {
  const blog = await Blog.find({})
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const body = new Blog(request.body)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog){
    response.json(blog)
  }
  else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url
  }

  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updateBlog)

})

module.exports = blogsRouter
